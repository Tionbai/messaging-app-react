import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Button } from 'react-bootstrap';
import { useAPI } from '../../../contexts/APIProvider';

const CreateChatroomModal = (props) => {
  const { closeModal } = props;
  const chatroomRef = useRef();
  const usersRef = useRef();
  const { createChatroom } = useAPI();

  const handleSubmit = (e) => {
    e.preventDefault();

    createChatroom(chatroomRef.current.value, [usersRef.current.value]);
    closeModal();
  };

  return (
    <div>
      <Modal.Header closeButton>New chatroom</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" ref={chatroomRef} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Users</Form.Label>
            <Form.Control type="text" ref={usersRef} required />
          </Form.Group>
          <Button type="submit">Create</Button>
        </Form>
      </Modal.Body>
    </div>
  );
};

CreateChatroomModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default CreateChatroomModal;
