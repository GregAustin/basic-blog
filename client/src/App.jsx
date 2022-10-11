import 'bootstrap/dist/css/bootstrap.min.css';

import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';

import Auth from './users/pages/Auth';
import { AuthContext } from './shared/context/auth-context';
import MainNavigation from './shared/components/navigation/MainNavigation';
import NewBlog from './blogs/pages/NewBlog';
import React from 'react';
import UpdateBlog from './blogs/pages/UpdateBlog';
import UserBlogs from './blogs/pages/UserBlogs';
import Users from './users/pages/Users';
import { useAuth } from './shared/hooks/auth-hook';

const App = () => {
  const { token, login, logout, userId } = useAuth();
  let routes;

  if (token) {
    routes = {
      path: '/',
      element: <MainNavigation />,
      errorElement: <p>Page not found</p>,
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
        {
          path: '/*',
          element: <Navigate to='/' />,
        },
      ],
    };
  } else {
    routes = {
      path: '/',
      element: <MainNavigation />,
      errorElement: <p>Page not found</p>,
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
          path: 'auth',
          element: <Auth />,
        },
        {
          path: '/*',
          element: <Navigate to='/auth' />,
        },
      ],
    };
  }

  const router = createBrowserRouter([routes]);

  return (
    <AuthContext.Provider value={{ isLoggedIn: !!token, login, logout, userId, token }}>
      <RouterProvider router={router} />
    </AuthContext.Provider>
  );
};

export default App;
