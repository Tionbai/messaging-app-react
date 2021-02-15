import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Button, Alert } from 'react-bootstrap';
import { useUsers } from '../../contexts/UsersProvider';

const NewUserModal = (props) => {
  const { closeModal } = props;
  const [usernameIsTaken, setUsernameIsTaken] = useState(false);
  const { checkIfUsernameExists, createUser } = useUsers();
  const usernameRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (checkIfUsernameExists(usernameRef.current.value) === true) {
      return setUsernameIsTaken(true);
    }
    createUser(usernameRef.current.value, passwordRef.current.value);
    setUsernameIsTaken(false);
    return closeModal();
  };

  return (
    <div>
      <Modal.Header closeButton>Create new user</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" ref={usernameRef} required />
            {usernameIsTaken && <Alert variant="danger">The username is taken.</Alert>}
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control type="text" ref={passwordRef} required />
          </Form.Group>
          <Button type="submit">Create</Button>
        </Form>
      </Modal.Body>
    </div>
  );
};

NewUserModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default NewUserModal;
