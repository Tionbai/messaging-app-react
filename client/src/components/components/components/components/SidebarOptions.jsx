import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useAPI } from '../../../../contexts/APIProvider';
import ModalTemplate from './ModalTemplate';

const SidebarOptions = () => {
  const [activeModal, setActiveModal] = useState(false);
  const { createChatroom, joinChatroom, addContact } = useAPI();

  const modalOptions = {
    createChatroom: {
      headerString: 'Create chatroom',
      labelString: 'Chatroom name',
      buttonString: 'Create',
      submitFunc: createChatroom,
    },
    joinChatroom: {
      headerString: 'Join chatroom',
      labelString: 'Chatroom name',
      buttonString: 'Join',
      submitFunc: joinChatroom,
    },
    addContact: {
      headerString: 'Add contact',
      labelString: 'Contact username or email',
      buttonString: 'Add',
      submitFunc: addContact,
    },
  };

  return (
    <>
      <Button
        className="p-2 border-top rounded-0"
        onClick={() => setActiveModal(modalOptions.joinChatroom)}
      >
        Join chatroom
      </Button>
      <Button
        className="p-2 border-top rounded-0"
        onClick={() => setActiveModal(modalOptions.createChatroom)}
      >
        Create chatroom
      </Button>
      <Button
        className="p-2 border-top rounded-0"
        onClick={() => setActiveModal(modalOptions.addContact)}
      >
        Add contact
      </Button>
      <Modal show={activeModal !== false} onHide={() => setActiveModal(false)}>
        <ModalTemplate modalOptions={activeModal} />
      </Modal>
    </>
  );
};

export default SidebarOptions;
