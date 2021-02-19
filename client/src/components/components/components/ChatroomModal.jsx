import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Button } from 'react-bootstrap';
import { useAPI } from '../../../contexts/APIProvider';

// 'openModal' is passed in as a string.
const ChatroomModal = (props) => {
  const { openModal, setOpenModal } = props;
  const chatroomNameRef = useRef();
  const { createChatroom, joinChatroom } = useAPI();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (openModal === 'Create') createChatroom(chatroomNameRef.current.value);
    if (openModal === 'Join') joinChatroom(chatroomNameRef.current.value);
    setOpenModal('');
  };

  return (
    <div>
      <Modal.Header closeButton>{`${openModal} chatroom`}</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Chatroom Name</Form.Label>
            <Form.Control type="text" ref={chatroomNameRef} required />
          </Form.Group>
          <Button type="submit">{openModal}</Button>
        </Form>
      </Modal.Body>
    </div>
  );
};

ChatroomModal.propTypes = {
  openModal: PropTypes.string.isRequired,
  setOpenModal: PropTypes.func.isRequired,
};

export default ChatroomModal;
