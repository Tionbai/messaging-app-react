import React, { useEffect, useRef } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useAPI } from '../../contexts/APIProvider';
import history from '../../history';

const Login = () => {
  const { loginUser, apiResponseMessage } = useAPI();
  const usernameRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    const token = localStorage.getItem('CHAT_Token');
    if (token) {
      history.push('/dashboard');
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    loginUser(usernameRef.current.value, passwordRef.current.value);
  };

  return (
    <Container className="align-items-center d-flex flex-column" style={{ height: '100vh' }}>
      <h2 className="py-2">Login</h2>
      <Form onSubmit={handleSubmit} className="w-100 my-auto">
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" autoComplete="on" ref={usernameRef} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" autoComplete="on" ref={passwordRef} required />
        </Form.Group>
        {apiResponseMessage.type === 'error' && (
          <Alert variant="danger">{apiResponseMessage.message}</Alert>
        )}
        {apiResponseMessage.type === 'success' && (
          <Alert variant="success">{apiResponseMessage.message}</Alert>
        )}
        <Button type="submit" className="mr-2">
          Login
        </Button>
        <Link to="register">
          <Button variant="secondary">Create a new user</Button>
        </Link>
      </Form>
    </Container>
  );
};

export default withRouter(Login);
