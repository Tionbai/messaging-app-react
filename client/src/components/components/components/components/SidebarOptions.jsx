import React, { useState } from 'react';
import { Menu, MenuItem, Modal, Button } from '@material-ui/core';
import { useAPI } from '../../../../contexts/APIProvider';
import ModalTemplate from './ModalTemplate';

const SidebarOptions = () => {
  const [activeModal, setActiveModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const {
    newChat,
    joinChat,
    leaveChat,
    deleteChat,
    clearChat,
    addChatUser,
    removeChatUser,
    makeAdmin,
    newContact,
    deleteContact,
    deleteMessage,
    deleteUser,
  } = useAPI();

  const modalOptions = {
    newChat: {
      headerString: 'New chat',
      labelString: 'Chat name',
      submitFunc: newChat,
    },
    joinChat: {
      headerString: 'Join chat',
      labelString: 'Chat name',
      submitFunc: joinChat,
    },
    leaveChat: {
      headerString: 'Leave chat',
      labelString: 'Chat name',
      submitFunc: leaveChat,
    },
    deleteChat: {
      headerString: 'Delete chat',
      labelString: 'Chat name',
      submitFunc: deleteChat,
    },
    clearChat: {
      headerString: 'Clear chat',
      labelString: 'Chat name',
      submitFunc: clearChat,
    },
    addChatUser: {
      headerString: 'Add chat user',
      labelString: 'Chat name',
      labelString2: 'Username',
      submitFunc: addChatUser,
    },
    removeChatUser: {
      headerString: 'Remove chat user',
      labelString: 'Chat name',
      labelString2: 'Username',
      submitFunc: removeChatUser,
    },
    makeAdmin: {
      headerString: 'Transfer admin rights',
      labelString: 'Chat name',
      labelString2: 'Username',
      submitFunc: makeAdmin,
    },
    newContact: {
      headerString: 'New contact',
      labelString: 'Username or email',
      submitFunc: newContact,
    },
    deleteContact: {
      headerString: 'Delete contact',
      labelString: 'Username or email',
      submitFunc: deleteContact,
    },
    deleteMessage: {
      headerString: 'Delete message',
      labelString: 'Message Id',
      submitFunc: deleteMessage,
    },
    deleteUser: {
      headerString: 'Delete account',
      labelString: 'Username or email',
      labelString2: 'Password',
      submitFunc: deleteUser,
    },
  };

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setAnchorEl(e.currentTarget);
  };

  const handleClose = (e) => {
    e.preventDefault();

    setAnchorEl(null);
  };

  const handleMenuClick = (e, menuItem) => {
    e.preventDefault();
    e.stopPropagation();

    setActiveModal(menuItem);
    setAnchorEl(null);
  };

  return (
    <>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        Options
      </Button>
      <Menu keepMounted anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={(e) => handleMenuClick(e, modalOptions.newChat)}>New chat</MenuItem>
        <MenuItem onClick={(e) => handleMenuClick(e, modalOptions.joinChat)}>
          Join chat
        </MenuItem>
        <MenuItem onClick={(e) => handleMenuClick(e, modalOptions.leaveChat)}>
          Leave chat
        </MenuItem>
        <MenuItem onClick={(e) => handleMenuClick(e, modalOptions.deleteChat)}>
          Delete chat
        </MenuItem>
        <MenuItem onClick={(e) => handleMenuClick(e, modalOptions.clearChat)}>
          Clear chat
        </MenuItem>
        <MenuItem onClick={(e) => handleMenuClick(e, modalOptions.addChatUser)}>
          Add chat user
        </MenuItem>
        <MenuItem onClick={(e) => handleMenuClick(e, modalOptions.removeChatUser)}>
          Remove chat user
        </MenuItem>
        <MenuItem onClick={(e) => handleMenuClick(e, modalOptions.makeAdmin)}>
          Transfer admin rights
        </MenuItem>
        <MenuItem onClick={(e) => handleMenuClick(e, modalOptions.newContact)}>
          New contact
        </MenuItem>
        <MenuItem onClick={(e) => handleMenuClick(e, modalOptions.deleteContact)}>
          Delete contact
        </MenuItem>
        <MenuItem onClick={(e) => handleMenuClick(e, modalOptions.deleteMessage)}>
          Delete message
        </MenuItem>
        <MenuItem onClick={(e) => handleMenuClick(e, modalOptions.deleteUser)}>
          Delete account
        </MenuItem>
        <Modal open={activeModal !== false} onClose={() => setActiveModal(false)}>
          <ModalTemplate modalOptions={activeModal} setActiveModal={setActiveModal} />
        </Modal>
      </Menu>
    </>
  );
};

export default SidebarOptions;
