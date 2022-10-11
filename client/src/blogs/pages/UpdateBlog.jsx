import { Controller, useForm } from 'react-hook-form';
import React, { useContext, useState } from 'react';

import { AuthContext } from '../../shared/context/auth-context';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import LoadingSpinner from '../../shared/components/ui/LoadingSpinner';
import ModalOverlay from '../../shared/components/ui/ModalOverlay';
import { useEffect } from 'react';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const UpdateBlog = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const { blogId } = useParams();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm();

  const [loadedBlog, setLoadedBlog] = useState();
  const [modalShow, setModalShow] = useState(false);

  // Get blog data to show to user.
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const responseData = await sendRequest(process.env.REACT_APP_SERVER_URL + `/blogs/${blogId}`);

        if (responseData && responseData.blog) {
          setLoadedBlog(responseData.blog);
          setValue('titlefield', responseData.blog.title);
          setValue('textfield', responseData.blog.text);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchBlog();
  }, [sendRequest, blogId]);

  // Send update request
  const onSubmit = async (data) => {
    try {
      await sendRequest(
        process.env.REACT_APP_SERVER_URL + `/blogs/${blogId}`,
        'PATCH',
        JSON.stringify({
          title: data.titlefield,
          text: data.textfield,
        }),
        { 'Content-Type': 'application/json', Authorization: `Bearer ${auth.token}` }
      );
      navigate(`/${auth.userId}/blogs`);
    } catch (err) {
      setModalShow(true);
    }
  };

  const handleModalClose = () => {
    clearError();
    setModalShow(false);
  };

  if (!loadedBlog) {
    return (
      <>
        {isLoading && <LoadingSpinner />}
        <div>Could not find blog.</div>
      </>
    );
  }
  return (
    <>
      <ModalOverlay show={modalShow} onHide={handleModalClose} text={error} title={'An error has occured.'} />
      <Container>
        {isLoading && <LoadingSpinner />}
        <h2>Update your blog.</h2>
        <Form onSubmit={handleSubmit(onSubmit)} className='blog-form'>
          <Form.Group className='mb-3' controlId='formBlogTitle'>
            <Form.Label>Blog title</Form.Label>
            <Controller
              name='titlefield'
              defaultValue=''
              control={control}
              rules={{ required: 'Blog must have a title.' }}
              render={({ field }) => (
                <Form.Control {...field} type='text' isInvalid={errors.titlefield} placeholder='Enter blog title.' />
              )}
            />
            <Form.Control.Feedback type='invalid'>{errors.titlefield?.message}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBlogtext'>
            <Form.Label>Blog Content</Form.Label>
            <Controller
              name='textfield'
              defaultValue=''
              control={control}
              rules={{ required: 'Blog has no content.' }}
              render={({ field }) => (
                <Form.Control
                  {...field}
                  as='textarea'
                  rows={8}
                  isInvalid={errors.textfield}
                  placeholder='Enter blog content.'
                />
              )}
            />
            <Form.Control.Feedback type='invalid'>{errors.textfield?.message}</Form.Control.Feedback>
          </Form.Group>
          <Button variant='primary' type='submit'>
            Save
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default UpdateBlog;
