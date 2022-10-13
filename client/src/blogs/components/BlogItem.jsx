import './BlogItem.css';

import React, { useContext, useState } from 'react';

import { AuthContext } from '../../shared/context/auth-context';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import LoadingSpinner from '../../shared/components/ui/LoadingSpinner';
import ModalOverlay from '../../shared/components/ui/ModalOverlay';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { useNavigate } from 'react-router-dom';

const BlogItem = (props) => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const [confirmModalShow, setConfirmModalShow] = useState(false);
  const [errorModalShow, setErrorModalShow] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const onSubmit = async (data) => {
    try {
      await sendRequest(`/api/blogs/${props.id}`, 'DELETE', null, {
        Authorization: `Bearer ${auth.token}`,
      });
      props.onDelete(props.id);
    } catch (err) {
      setErrorModalShow(true);
    }
  };

  // Navigate to update blog page.
  const handleEditClick = () => {
    navigate(`/blogs/${props.id}`);
  };

  // Show warning modal to delete a blog
  const handleDeleteClick = () => {
    setConfirmModalShow(true);
  };

  const handleModalConfirm = () => {
    onSubmit();
    setConfirmModalShow(false);
  };

  const handleConfirmModalClose = () => {
    setConfirmModalShow(false);
  };

  const handleErrorModalClose = () => {
    clearError();
    setErrorModalShow(false);
  };

  return (
    <>
      <ModalOverlay
        show={confirmModalShow}
        onHide={handleConfirmModalClose}
        text={'Are you sure you want to delete this blog?'}
        title={'WARNING'}
        onConfirm={handleModalConfirm}
      />
      <ModalOverlay show={errorModalShow} onHide={handleErrorModalClose} text={error} title={'An error has occured.'} />
      <div className='blog-item mb-5'>
        <Card className='blog-item__content'>
          {isLoading && <LoadingSpinner />}
          <Card.Body>
            <Card.Title className='blog-item__title'>{props.title}</Card.Title>
            <Card.Text className='blog-item__text'>{props.text}</Card.Text>
            {auth.userId === props.creatorId && (
              <div className='blog-item__actions'>
                <Button onClick={handleEditClick} variant='warning'>
                  EDIT
                </Button>
                <Button onClick={handleDeleteClick} variant='danger'>
                  DELETE
                </Button>
              </div>
            )}
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default BlogItem;
