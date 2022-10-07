// import './UsersList.css';

import Col from 'react-bootstrap/Col';
import React from 'react';
import UserItem from './UserItem';
import Card from 'react-bootstrap/Card';

const UsersList = (props) => {
  const { items } = props;

  if (items.length === 0) {
    return (
      <Col>
        <Card className='p-4'>
          <Card.Body>
            <Card.Title className='text-center'>No users found.</Card.Title>
          </Card.Body>
        </Card>
      </Col>
    );
  }
  return (
    <Col>
      {items.map((user) => {
        return <UserItem key={user.id} id={user.id} name={user.name} description={user.description} />;
      })}
    </Col>
  );
};

export default UsersList;
