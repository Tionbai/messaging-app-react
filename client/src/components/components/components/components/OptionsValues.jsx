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
    chats: [
      {
        headerString: 'New chat',
        labelString: 'Chat name',
        submitFunc: newChat,
      },
      {
        headerString: 'Join chat',
        labelString: 'Chat name',
        submitFunc: joinChat,
      },
      {
        headerString: 'Leave chat',
        labelString: 'Chat name',
        submitFunc: leaveChat,
      },
      {
        headerString: 'Delete chat',
        labelString: 'Chat name',
        submitFunc: deleteChat,
      },
      {
        headerString: 'Clear chat',
        labelString: 'Chat name',
        submitFunc: clearChat,
      },
      {
        headerString: 'Add chat user',
        labelString: 'Chat name',
        labelString2: 'Username',
        submitFunc: addChatUser,
      },
      {
        headerString: 'Remove chat user',
        labelString: 'Chat name',
        labelString2: 'Username',
        submitFunc: removeChatUser,
      },
      {
        headerString: 'Transfer admin rights',
        labelString: 'Chat name',
        labelString2: 'Username',
        submitFunc: makeAdmin,
      },
    ],
    contacts: [
      {
        headerString: 'New contact',
        labelString: 'Username or email',
        submitFunc: newContact,
      },
      {
        headerString: 'Delete contact',
        labelString: 'Username or email',
        submitFunc: deleteContact,
      },
    ],
    messages: [
      {
        headerString: 'Delete message',
        labelString: 'Message Id',
        submitFunc: deleteMessage,
      },
    ],
    user: [
      {
        headerString: 'Delete account',
        labelString: 'Username or email',
        labelString2: 'Password',
        submitFunc: deleteUser,
      },
    ],
  };

  return values;
}
