import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useUsers } from '../../contexts/UsersProvider';

const Login = (props) => {
  const { setUsername } = props;
  const usernameRef = useRef();
  const passwordRef = useRef();
  const [invalidLogin, setInvalidLogin] = useState(false);
  const { checkIfValidLogin } = useUsers();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (checkIfValidLogin(usernameRef.current.value, passwordRef.current.value)) {
      setInvalidLogin(false);
      return setUsername(usernameRef.current.value);
    }
    return setInvalidLogin(true);
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
        {invalidLogin && <Alert variant="danger">Wrong username or password.</Alert>}
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
  setUsername: PropTypes.func,
};

Login.defaultProps = {
  setUsername: PropTypes.func,
};
