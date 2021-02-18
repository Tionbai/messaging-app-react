import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useAPI } from '../../contexts/APIProvider';

const Register = () => {
  const { typeError, registerUser } = useAPI();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    registerUser(usernameRef.current.value, emailRef.current.value, passwordRef.current.value);
  };

  return (
    <Container className="align-items-center d-flex flex-column" style={{ height: '100vh' }}>
      <h2 className="py-2">Create new user</h2>
      <Form onSubmit={handleSubmit} className="w-100 my-auto">
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" autoComplete="on" ref={usernameRef} required />
          {typeError('error-username') && (
            <Alert variant="danger">{typeError('error-username')}</Alert>
          )}
        </Form.Group>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control type="text" autoComplete="on" ref={emailRef} required />
          {typeError('error-email') && (
            <Alert variant="danger">{typeError('error-email')}</Alert>
          )}
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type="text" autoComplete="on" ref={passwordRef} required />
          {typeError('error-password') && (
            <Alert variant="danger">{typeError('error-password')}</Alert>
          )}
        </Form.Group>
        {/* TODO: Add validation message to screen before redirect to login, or on login screen after redirect */}
        <Button type="submit" className="mr-2">
          Create
        </Button>
        <Link to="/login">
          <Button variant="secondary">Login</Button>
        </Link>
      </Form>
    </Container>
  );
};

export default Register;
