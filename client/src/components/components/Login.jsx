import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Container, Form, Button, Modal, Alert } from 'react-bootstrap';
import NewUserModal from './NewUserModal';
import { useUsers } from '../../contexts/UsersProvider';

const Login = (props) => {
  const { setUsername } = props;
  const usernameRef = useRef();
  const passwordRef = useRef();
  const [modalOpen, setModalOpen] = useState(false);
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

  const createNewUser = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <Container className="align-items-center d-flex flex-column" style={{ height: '100vh' }}>
      <h1 className="py-2">Messaging App</h1>
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
        <Button variant="secondary" onClick={createNewUser}>
          Create a new user
        </Button>
      </Form>
      <Modal show={modalOpen} onHide={closeModal}>
        {modalOpen && <NewUserModal closeModal={closeModal} />}
      </Modal>
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
