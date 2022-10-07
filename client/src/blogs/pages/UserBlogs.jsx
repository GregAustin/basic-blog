import BlogList from '../components/BlogList';
import React from 'react';
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

const DUMMY_BLOGS = [
  {
    id: 'b1',
    title: 'Test blog 1',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consectetur condimentum malesuada. Nullam aliquam lacinia nunc, at ultrices massa cursus et. Curabitur vel gravida massa. Aliquam erat volutpat. Pellentesque in eros orci. Morbi gravida dictum dignissim. Curabitur molestie eros vitae quam porttitor, eu tincidunt nunc maximus. Duis non tincidunt erat, ut vulputate tellus.',
    creator: 'u1',
  },
  {
    id: 'b2',
    title: 'Test blog 2',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consectetur condimentum malesuada. Nullam aliquam lacinia nunc, at ultrices massa cursus et. Curabitur vel gravida massa. Aliquam erat volutpat. Pellentesque in eros orci. Morbi gravida dictum dignissim. Curabitur molestie eros vitae quam porttitor, eu tincidunt nunc maximus. Duis non tincidunt erat, ut vulputate tellus.',
    creator: 'u2',
  },
  {
    id: 'b3',
    title: 'Test blog 3',
    text: 'Proin ut luctus nulla. Sed sollicitudin eros id ligula vestibulum, et egestas felis tincidunt. Aenean enim lorem, tristique nec fringilla at, auctor id libero. Sed eget posuere nunc, non posuere nibh. Pellentesque viverra lacus odio, eget ornare nulla molestie quis. Nulla condimentum dictum orci, eget mattis leo semper eu. Vivamus lobortis magna ut nulla eleifend commodo. Fusce eget pellentesque est. Aliquam aliquam dolor in lacus vehicula, a interdum turpis tincidunt. Nunc aliquam odio mauris, eu pellentesque augue vehicula mattis. Sed luctus ipsum sed ornare rutrum. Phasellus et velit sit amet nisi lacinia euismod posuere quis quam. Fusce laoreet tortor lectus, eu hendrerit purus elementum eget. Praesent eget venenatis enim, nec convallis massa.',
    creator: 'u1',
  },
  {
    id: 'b4',
    title: 'Test blog 4',
    text: 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse a ligula fermentum lorem ullamcorper consectetur id vitae neque. Donec eu eros et urna accumsan dignissim et id purus. Proin eu vehicula sapien. Vivamus lacinia orci ut leo efficitur, eget auctor dolor dignissim. Praesent vulputate quam lectus, vitae varius nisi ornare sit amet. Sed dictum porta sem et gravida. Sed aliquam est eu molestie convallis. Praesent rutrum tellus ut accumsan interdum. Aliquam sed risus in sem rutrum sollicitudin. Integer vestibulum, orci nec fermentum interdum, dui ante finibus quam, non varius diam massa placerat sapien. Nullam ullamcorper aliquet dui, et sodales justo placerat ut. Nunc euismod nibh quis sapien tristique, quis varius enim luctus. Aliquam erat volutpat. Proin arcu lorem, interdum pretium elit eget, suscipit sodales ante. Nam convallis, nisi a rutrum lobortis, arcu massa sagittis lacus, sed suscipit arcu lectus id augue.',
    creator: 'u1',
  },
  {
    id: 'b5',
    title: 'Test blog 5',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consectetur condimentum malesuada. Nullam aliquam lacinia nunc, at ultrices massa cursus et. Curabitur vel gravida massa. Aliquam erat volutpat. Pellentesque in eros orci. Morbi gravida dictum dignissim. Curabitur molestie eros vitae quam porttitor, eu tincidunt nunc maximus. Duis non tincidunt erat, ut vulputate tellus.',
    creator: 'u1',
  },
];
const UserBlogs = () => {
  const { userId } = useParams();
  const loadedBlogs = DUMMY_BLOGS.filter((blog) => blog.creator === userId);
  return (
    <Container>
      <BlogList items={loadedBlogs}></BlogList>
    </Container>
  );
};

export default UserBlogs;
