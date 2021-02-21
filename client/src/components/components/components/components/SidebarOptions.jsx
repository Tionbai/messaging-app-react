import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useAPI } from '../../../../contexts/APIProvider';
import ModalTemplate from './ModalTemplate';

const SidebarOptions = () => {
  const [activeModal, setActiveModal] = useState(false);
  const { newChat, joinChat, deleteChat, newContact } = useAPI();

  const modalOptions = {
    newChat: {
      headerString: 'New Chat',
      labelString: 'Chat name',
      buttonString: 'New',
      submitFunc: newChat,
    },
    joinChat: {
      headerString: 'Join Chat',
      labelString: 'Chat name',
      buttonString: 'Join',
      submitFunc: joinChat,
    },
    deleteChat: {
      headerString: 'Delete Chat',
      labelString: 'Chat name',
      buttonString: 'Delete',
      submitFunc: deleteChat,
    },
    newContact: {
      headerString: 'New contact',
      labelString: 'Contact username or email',
      buttonString: 'New',
      submitFunc: newContact,
    },
  };

  return (
    <>
      <Button
        className="p-2 border-top rounded-0"
        onClick={() => setActiveModal(modalOptions.joinChat)}
      >
        Join Chat
      </Button>
      <Button
        className="p-2 border-top rounded-0"
        onClick={() => setActiveModal(modalOptions.newChat)}
      >
        New Chat
      </Button>
      <Button
        className="p-2 border-top rounded-0"
        onClick={() => setActiveModal(modalOptions.deleteChat)}
      >
        Delete Chat
      </Button>
      <Button
        className="p-2 border-top rounded-0"
        onClick={() => setActiveModal(modalOptions.addContact)}
      >
        New contact
      </Button>
      <Modal show={activeModal !== false} onHide={() => setActiveModal(false)}>
        <ModalTemplate modalOptions={activeModal} setActiveModal={setActiveModal} />
      </Modal>
    </>
  );
};

export default SidebarOptions;
