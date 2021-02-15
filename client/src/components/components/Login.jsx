import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Container, Form, Button } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import '../../index.css';

const Login = (props) => {
  const { setId } = props;
  const idRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    setId(idRef.current.value);
  };

  const createNewId = () => {
    setId(uuidv4());
  };

  return (
    <Container className="align-items-center d-flex flex-column" style={{ height: '100vh' }}>
      <h1 className="py-2">Messaging App</h1>
      <Form onSubmit={handleSubmit} className="w-100 my-auto">
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" ref={idRef} required />
        </Form.Group>
        <Button type="submit" className="mr-2">
          Login
        </Button>
        <Button variant="secondary" onClick={createNewId}>
          Create a new user
        </Button>
      </Form>
    </Container>
  );
};

export default Login;

Login.propTypes = {
  setId: PropTypes.func,
};

Login.defaultProps = {
  setId: PropTypes.func,
};
