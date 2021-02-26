import React from 'react';
import {
  Add,
  EmojiPeople,
  Remove,
  DeleteForever,
  ClearAll,
  PersonAdd,
  PersonAddDisabled,
  TransferWithinAStation,
} from '@material-ui/icons/';
import { useAPI } from '../../../../contexts/APIProvider';

export default function OptionsValues() {
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

  const values = {
    chats0: [
      {
        icon: <Add />,
        headerString: 'New chat',
        labelString: 'Chat name',
        submitFunc: newChat,
      },
      {
        icon: <EmojiPeople />,
        headerString: 'Join chat',
        labelString: 'Chat name',
        submitFunc: joinChat,
      },
    ],
    chats1: [
      {
        icon: <Remove />,
        headerString: 'Leave chat',
        labelString: 'Chat name',
        submitFunc: leaveChat,
      },
      {
        icon: <DeleteForever />,
        headerString: 'Delete chat',
        labelString: 'Chat name',
        submitFunc: deleteChat,
      },
      {
        icon: <ClearAll />,
        headerString: 'Clear chat',
        labelString: 'Chat name',
        submitFunc: clearChat,
      },
      {
        icon: <PersonAdd />,
        headerString: 'Add chat user',
        labelString: 'Chat name',
        labelString2: 'Username',
        submitFunc: addChatUser,
      },
      {
        icon: <PersonAddDisabled />,
        headerString: 'Remove chat user',
        labelString: 'Chat name',
        labelString2: 'Username',
        submitFunc: removeChatUser,
      },
      {
        icon: <TransferWithinAStation />,
        headerString: 'Transfer admin rights',
        labelString: 'Chat name',
        labelString2: 'Username',
        submitFunc: makeAdmin,
      },
    ],
    contacts: [
      {
        icon: <Add />,
        headerString: 'New contact',
        labelString: 'Username or email',
        submitFunc: newContact,
      },
      {
        icon: <Remove />,
        headerString: 'Delete contact',
        labelString: 'Username or email',
        submitFunc: deleteContact,
      },
    ],
    messages: [
      {
        icon: <DeleteForever />,
        headerString: 'Delete message',
        labelString: 'Message Id',
        submitFunc: deleteMessage,
      },
    ],
    user: [
      {
        icon: <DeleteForever />,
        headerString: 'Delete account',
        labelString: 'Username or email',
        labelString2: 'Password',
        submitFunc: deleteUser,
      },
    ],
  };

  return values;
}
