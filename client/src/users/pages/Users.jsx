import Container from 'react-bootstrap/Container';
import React from 'react';
import UsersList from '../components/UsersList';

const Users = () => {
  const USERS = [
    {
      id: 'u1',
      name: 'User 1',
      description: 'Description for this user.',
    },
    {
      id: 'u2',
      name: 'User 2 ',
      description: 'Description for this user.',
    },
    {
      id: 'u3',
      name: 'User 3',
      description: 'Description for this user.',
    },
    {
      id: 'u4',
      name: 'User 4 ',
      description: 'Description for this user.',
    },
  ];
  return (
    <Container>
      <UsersList items={USERS} />
    </Container>
  );
};

export default Users;
