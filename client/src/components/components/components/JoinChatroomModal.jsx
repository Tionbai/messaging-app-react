import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Button } from 'react-bootstrap';
import { useAPI } from '../../../contexts/APIProvider';

const JoinChatroomModal = (props) => {
  const { closeModal } = props;
  const chatroomRef = useRef();
  const { joinChatroom } = useAPI();

  const handleSubmit = (e) => {
    e.preventDefault();

    joinChatroom(chatroomRef.current.value);
    closeModal();
  };

  return (
    <div>
      <Modal.Header closeButton>Join chatroom</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Chatroom Name</Form.Label>
            <Form.Control type="text" ref={chatroomRef} required />
          </Form.Group>
          <Button type="submit">Join</Button>
        </Form>
      </Modal.Body>
    </div>
  );
};

JoinChatroomModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default JoinChatroomModal;
