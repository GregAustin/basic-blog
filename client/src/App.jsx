import 'bootstrap/dist/css/bootstrap.min.css';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import MainNavigation from './shared/components/navigation/MainNavigation';
import NewBlog from './blogs/pages/NewBlog';
import UpdateBlog from './blogs/pages/UpdateBlog';
import UserBlogs from './blogs/pages/UserBlogs';
import Users from './users/pages/Users';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainNavigation />,
    errorElement: <>Page not found.</>,
    children: [
      {
        path: '',
        element: <Users />,
      },
      {
        path: ':userId/blogs',
        element: <UserBlogs />,
      },
      {
        path: 'blogs/new',
        element: <NewBlog />,
      },
      {
        path: 'blogs/:blogId',
        element: <UpdateBlog />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
