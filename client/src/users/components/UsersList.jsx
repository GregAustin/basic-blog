import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import React from 'react';
import UserItem from './UserItem';

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
        return <UserItem key={user.id} id={user.id} name={user.name} numBlogs={user.blogs.length} />;
      })}
    </Col>
  );
};

export default UsersList;
