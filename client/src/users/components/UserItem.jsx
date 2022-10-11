import './UserItem.css';

import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import React from 'react';

const UserItem = (props) => {
  const { name, id, numBlogs } = props;

  return (
    <div className='user-item mb-3'>
      <Card className='user-item__content'>
        <Link to={`/${id}/blogs`}>
          <Card.Body className='user-item__info'>
            <Card.Title>{name}</Card.Title>
            <Card.Text>Blogs: {numBlogs}</Card.Text>
          </Card.Body>
        </Link>
      </Card>
    </div>
  );
};

export default UserItem;
