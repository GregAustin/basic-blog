//import './BlogList.css';

import BlogItem from './BlogItem';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import React from 'react';
import { Col } from 'react-bootstrap';

const BlogList = (props) => {
  const { items } = props;
  if (items.length === 0) {
    return (
      <Col className='blog-list'>
        <Card className='p-4'>
          <Card.Body>
            <Card.Title className='text-center'>No blogs found.</Card.Title>
            <Button>Share Blog</Button>
          </Card.Body>
        </Card>
      </Col>
    );
  }

  return (
    <Col className='blog-list'>
      {items.map((blog) => {
        return <BlogItem key={blog.id} id={blog.id} title={blog.title} text={blog.text} creatorId={blog.creator} />;
      })}
    </Col>
  );
};

export default BlogList;
