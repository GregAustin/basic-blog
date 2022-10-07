import './BlogItem.css';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import React from 'react';

const BlogItem = (props) => {
  return (
    <div className='blog-item mb-5'>
      <Card className='blog-item__content'>
        <Card.Body>
          <Card.Title className='blog-item__title'>{props.title}</Card.Title>
          <Card.Text className='blog-item__text'>{props.text}</Card.Text>
          <div className='blog-item__actions'>
            <Button variant='warning'>EDIT</Button>
            <Button variant='danger'>DELETE</Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default BlogItem;
