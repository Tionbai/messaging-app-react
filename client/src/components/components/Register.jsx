import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

const Register = (props) => {
  const { history } = props;
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [errorMessage, setErrorMessage] = useState('');
  const [validationMessage, setValidationMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post('/user/register', {
        username: usernameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
      })
      .then((response) => {
        setValidationMessage(response.data.message);
        setErrorMessage('');
        history.push('/login');
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message);
      });
  };

  return (
    <Container className="align-items-center d-flex flex-column" style={{ height: '100vh' }}>
      <h2 className="py-2">Create new user</h2>
      <Form onSubmit={handleSubmit} className="w-100 my-auto">
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" autoComplete="on" ref={usernameRef} required />
          {errorMessage.includes('username') && <Alert variant="danger">{errorMessage}</Alert>}
        </Form.Group>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control type="text" autoComplete="on" ref={emailRef} required />
          {errorMessage.includes('email') && <Alert variant="danger">{errorMessage}</Alert>}
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="text"
            autoComplete="on"
            minLength={6}
            ref={passwordRef}
            required
          />
        </Form.Group>
        {/* TODO: Add validation message to screen before redirect to login, or on login screen after redirect */}
        {validationMessage && validationMessage}
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

Register.propTypes = {
  history: Object(PropTypes.object).isRequired,
};
