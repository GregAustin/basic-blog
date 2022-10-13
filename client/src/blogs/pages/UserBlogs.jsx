import React, { useEffect, useState } from 'react';

import BlogList from '../components/BlogList';
import Container from 'react-bootstrap/Container';
import LoadingSpinner from '../../shared/components/ui/LoadingSpinner';
import ModalOverlay from '../../shared/components/ui/ModalOverlay';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { useParams } from 'react-router-dom';

const UserBlogs = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const { userId } = useParams();
  const [loadedBlogs, setLoadedBlogs] = useState();
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const responseData = await sendRequest(`/api/blogs/user/${userId}`);

        if (responseData && responseData.blogs) {
          setLoadedBlogs(responseData.blogs);
        }
      } catch (err) {
        setModalShow(true);
      }
    };
    fetchBlogs();
  }, [sendRequest, userId]);

  const handleModalClose = () => {
    clearError();
    setModalShow(false);
  };

  const blogDeletedhandler = (deletedBlogId) => {
    setLoadedBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== deletedBlogId));
  };

  return (
    <>
      <ModalOverlay show={modalShow} onHide={handleModalClose} text={error} title={'An error has occured.'} />
      <Container>
        {isLoading && <LoadingSpinner />}
        {!isLoading && loadedBlogs && <BlogList items={loadedBlogs} onDeleteBlog={blogDeletedhandler}></BlogList>}
      </Container>
    </>
  );
};

export default UserBlogs;
