import './NewBlog.css';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import Container from 'react-bootstrap/Container';

const NewBlog = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log('data', data);
  };

  return (
    <Container>
      <h2>Add a new blog entry.</h2>
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
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default NewBlog;
