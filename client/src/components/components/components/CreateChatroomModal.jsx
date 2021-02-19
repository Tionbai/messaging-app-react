import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Button } from 'react-bootstrap';
import { useAPI } from '../../../contexts/APIProvider';

const CreateChatroomModal = (props) => {
  const { closeModal } = props;
  const chatroomRef = useRef();
  const { createChatroom } = useAPI();

  const handleSubmit = (e) => {
    e.preventDefault();

    createChatroom(chatroomRef.current.value);
    closeModal();
  };

  return (
    <div>
      <Modal.Header closeButton>Create chatroom</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Chatroom name</Form.Label>
            <Form.Control type="text" ref={chatroomRef} required />
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
