import React, { useEffect, useState } from 'react';

import Container from 'react-bootstrap/Container';
import LoadingSpinner from '../../shared/components/ui/LoadingSpinner';
import ModalOverlay from '../../shared/components/ui/ModalOverlay';
import UsersList from '../components/UsersList';
import { useHttpClient } from '../../shared/hooks/http-hook';

const Users = () => {
  const [loadedUsers, setLoadedUsers] = useState();
  const [modalShow, setModalShow] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    // Async request as its own function so we can avoid making the whole useEffect function async.
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(process.env.REACT_APP_SERVER_URL + '/users');
        if (responseData) {
          setLoadedUsers(responseData.users);
        }
      } catch (err) {
        setModalShow(true);
      }
    };
    fetchUsers();
  }, [sendRequest]);

  const handleModalClose = () => {
    clearError();
    setModalShow(false);
  };

  return (
    <>
      <ModalOverlay show={modalShow} onHide={handleModalClose} text={error} title={'An error has occured.'} />
      <Container>
        {isLoading && <LoadingSpinner />}
        {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
      </Container>
    </>
  );
};

export default Users;
