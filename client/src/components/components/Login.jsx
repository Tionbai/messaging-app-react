import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Container, Form, Button } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

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
    <Container className="align-items-center d-flex" style={{ height: '100vh' }}>
      <Form onSubmit={handleSubmit} className="w-100">
        <Form.Group>
          <Form.Label>Enter Your Id</Form.Label>
          <Form.Control type="text" ref={idRef} required />
        </Form.Group>
        <Button type="submit" className="mr-2">
          Login
        </Button>
        <Button variant="secondary" onClick={createNewId}>
          Create a new Id
        </Button>
      </Form>
    </Container>
  );
};

export default Login;

Login.propTypes = {
  setId: PropTypes.func.isRequired,
};
