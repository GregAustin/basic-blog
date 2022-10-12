import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Suspense } from 'react';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';

import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';
import MainNavigation from './shared/components/navigation/MainNavigation';
import LoadingSpinner from './shared/components/ui/LoadingSpinner';

const Users = React.lazy(() => import('./users/pages/Users'));
const UserBlogs = React.lazy(() => import('./blogs/pages/UserBlogs'));
const UpdateBlog = React.lazy(() => import('./blogs/pages/UpdateBlog'));
const NewBlog = React.lazy(() => import('./blogs/pages/NewBlog'));
const Auth = React.lazy(() => import('./users/pages/Auth'));

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
      <Suspense
        fallback={
          <div className='center'>
            <LoadingSpinner />
          </div>
        }
      >
        <RouterProvider router={router} />
      </Suspense>
    </AuthContext.Provider>
  );
};

export default App;
