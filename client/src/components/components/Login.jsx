import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

const Login = (props) => {
  const { history } = props;
  const usernameRef = useRef();
  const passwordRef = useRef();
  const [errorMessage, setErrorMessage] = useState('');
  const [validationMessage, setValidationMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post('/user/login', {
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      })
      .then((response) => {
        setErrorMessage('');
        if (response.data.message) setValidationMessage(response.data.message);
        localStorage.setItem('CHAT_Token', response.data.token);
        history.push('/dashboard');
      })
      .catch((err) => {
        setValidationMessage('');
        if (err.response.data.message) setErrorMessage(err.response.data.message);
      });
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
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        {validationMessage && <Alert variant="success">{validationMessage}</Alert>}
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

export default Login;

Login.propTypes = {
  history: Object(PropTypes.object).isRequired,
};
