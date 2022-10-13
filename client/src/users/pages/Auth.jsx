import { Controller, useForm } from 'react-hook-form';
import React, { useContext, useState } from 'react';

import { AuthContext } from '../../shared/context/auth-context';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import LoadingSpinner from '../../shared/components/ui/LoadingSpinner';
import ModalOverlay from '../../shared/components/ui/ModalOverlay';
import { useHttpClient } from '../../shared/hooks/http-hook';

const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const switchHandler = () => {
    setIsLoginMode((prevMode) => !prevMode);
  };

  const handleModalClose = () => {
    clearError();
    setModalShow(false);
  };

  const onSubmit = async (data) => {
    if (isLoginMode) {
      // Login request
      try {
        const responseData = await sendRequest(
          '/api/users/login',
          'POST',
          JSON.stringify({
            email: data.emailfield,
            password: data.passwordfield,
          }),
          {
            'Content-Type': 'application/json',
          }
        );

        auth.login(responseData.userId, responseData.token);
      } catch (err) {
        setModalShow(true);
      }
    } else {
      // Sign up request
      try {
        const responseData = await sendRequest(
          '/api/users/signup',
          'POST',
          JSON.stringify({
            name: data.namefield,
            email: data.emailfield,
            password: data.passwordfield,
          }),
          {
            'Content-Type': 'application/json',
          }
        );

        auth.login(responseData.userId, responseData.token);
      } catch (err) {
        setModalShow(true);
      }
    }
  };

  return (
    <>
      <ModalOverlay show={modalShow} onHide={handleModalClose} text={error} title={'An error has occured.'} />
      <Container>
        {isLoading && <LoadingSpinner />}
        {isLoginMode ? <h2>Log in to your account.</h2> : <h2>Create an account.</h2>}
        <Form onSubmit={handleSubmit(onSubmit)} className='login-form'>
          {!isLoginMode && (
            <Form.Group className='mb-3' controlId='formName'>
              <Form.Label>Name</Form.Label>
              <Controller
                name='namefield'
                defaultValue=''
                control={control}
                rules={{
                  required: 'Please add a name.',
                }}
                render={({ field }) => <Form.Control {...field} type='text' isInvalid={errors.namefield} />}
              />
              <Form.Control.Feedback type='invalid'>{errors.namefield?.message}</Form.Control.Feedback>
            </Form.Group>
          )}

          <Form.Group className='mb-3' controlId='formEmail'>
            <Form.Label>Email</Form.Label>
            <Controller
              name='emailfield'
              defaultValue=''
              control={control}
              rules={{
                required: 'Please add a valid email.',
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: 'Please add a valid email.',
                },
              }}
              render={({ field }) => <Form.Control {...field} type='email' isInvalid={errors.emailfield} />}
            />
            <Form.Control.Feedback type='invalid'>{errors.emailfield?.message}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className='mb-3' controlId='formPassword'>
            <Form.Label>Password</Form.Label>
            <Controller
              name='passwordfield'
              defaultValue=''
              control={control}
              rules={{
                required: 'Please add a password.',
                minLength: {
                  value: 6,
                  message: 'min length is 6',
                },
              }}
              render={({ field }) => <Form.Control {...field} type='password' isInvalid={errors.passwordfield} />}
            />
            <Form.Control.Feedback type='invalid'>{errors.passwordfield?.message}</Form.Control.Feedback>
          </Form.Group>
          <Button variant='primary' type='submit'>
            {isLoginMode ? 'Login' : 'Sign Up'}
          </Button>
        </Form>
        <Button className='mt-3' variant='secondary' onClick={switchHandler}>
          Switch to {isLoginMode ? 'Sign Up' : 'Login'}
        </Button>
      </Container>
    </>
  );
};

export default Auth;
