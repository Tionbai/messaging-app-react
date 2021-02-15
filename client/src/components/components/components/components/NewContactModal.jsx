import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Button } from 'react-bootstrap';
import { useContacts } from '../../../../contexts/ContactsProvider';

const NewContactModal = (props) => {
  const { closeModal } = props;
  const usernameRef = useRef();
  const { createContact } = useContacts();

  const handleSubmit = (e) => {
    e.preventDefault();

    createContact(usernameRef.current.value);
    closeModal();
  };

  return (
    <div>
      <Modal.Header closeButton>Create contact</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" ref={usernameRef} required />
          </Form.Group>
          <Button type="submit">Create</Button>
        </Form>
      </Modal.Body>
    </div>
  );
};

NewContactModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default NewContactModal;
