import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useAPI } from '../../../../contexts/APIProvider';
import ModalTemplate from './ModalTemplate';

const SidebarOptions = () => {
  const [activeModal, setActiveModal] = useState(false);
  const {
    newChat,
    joinChat,
    leaveChat,
    deleteChat,
    clearChat,
    addChatUser,
    removeChatUser,
    newContact,
    deleteMessage,
  } = useAPI();

  const modalOptions = {
    newChat: {
      headerString: 'New chat',
      labelString: 'Chat name',
      buttonString: 'Create',
      submitFunc: newChat,
    },
    joinChat: {
      headerString: 'Join chat',
      labelString: 'Chat name',
      buttonString: 'Join',
      submitFunc: joinChat,
    },
    leaveChat: {
      headerString: 'Leave chat',
      labelString: 'Chat name',
      buttonString: 'Leave',
      submitFunc: leaveChat,
    },
    deleteChat: {
      headerString: 'Delete chat',
      labelString: 'Chat name',
      buttonString: 'Delete',
      submitFunc: deleteChat,
    },
    clearChat: {
      headerString: 'Clear chat',
      labelString: 'Chat name',
      buttonString: 'Clear',
      submitFunc: clearChat,
    },
    addChatUser: {
      headerString: 'Add chat user',
      labelString: 'Chat name',
      labelString2: 'User username',
      buttonString: 'Add',
      submitFunc: addChatUser,
    },
    removeChatUser: {
      headerString: 'Remove chat user',
      labelString: 'Chat name',
      labelString2: 'User username',
      buttonString: 'Remove',
      submitFunc: removeChatUser,
    },
    newContact: {
      headerString: 'New contact',
      labelString: 'Contact username or email',
      buttonString: 'Add',
      submitFunc: newContact,
    },
    deleteMessage: {
      headerString: 'Delete message',
      labelString: 'Message Id',
      buttonString: 'Delete',
      submitFunc: deleteMessage,
    },
  };

  return (
    <>
      <Button
        className="p-2 border-top rounded-0"
        onClick={() => setActiveModal(modalOptions.newChat)}
      >
        New chat
      </Button>
      <Button
        className="p-2 border-top rounded-0"
        onClick={() => setActiveModal(modalOptions.joinChat)}
      >
        Join chat
      </Button>
      <Button
        className="p-2 border-top rounded-0"
        onClick={() => setActiveModal(modalOptions.leaveChat)}
      >
        Leave chat
      </Button>
      <Button
        className="p-2 border-top rounded-0"
        onClick={() => setActiveModal(modalOptions.deleteChat)}
      >
        Delete chat
      </Button>
      <Button
        className="p-2 border-top rounded-0"
        onClick={() => setActiveModal(modalOptions.clearChat)}
      >
        Clear chat
      </Button>
      <Button
        className="p-2 border-top rounded-0"
        onClick={() => setActiveModal(modalOptions.addChatUser)}
      >
        Add chat user
      </Button>
      <Button
        className="p-2 border-top rounded-0"
        onClick={() => setActiveModal(modalOptions.removeChatUser)}
      >
        Remove chat user
      </Button>
      <Button
        className="p-2 border-top rounded-0"
        onClick={() => setActiveModal(modalOptions.newContact)}
      >
        New contact
      </Button>
      <Button
        className="p-2 border-top rounded-0"
        onClick={() => setActiveModal(modalOptions.deleteMessage)}
      >
        Delete message
      </Button>
      <Modal show={activeModal !== false} onHide={() => setActiveModal(false)}>
        <ModalTemplate modalOptions={activeModal} setActiveModal={setActiveModal} />
      </Modal>
    </>
  );
};

export default SidebarOptions;
