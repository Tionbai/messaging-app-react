import { useChat } from '../../../../../../../../../contexts/ChatProvider';

const SidebarChatsMenuValues = () => {
  const {
    leaveChat,
    deleteChat,
    clearChat,
    addChatUser,
    removeChatUser,
    makeAdmin,
  } = useChat();
  const values = {
    leaveChat: {
      title: 'Leave chat',
      content: 'Are you sure you want to leave chat?',
      submitFunc: leaveChat,
    },
    deleteChat: {
      title: 'Delete chat',
      content: 'Are you sure you want to delete chat? This action is irreversible.',
      submitFunc: deleteChat,
    },
    clearChat: {
      title: 'Clear chat',
      content: 'Are you sure you want to delete all messages? This action is irreversible.',
      submitFunc: clearChat,
    },
    addChatUser: {
      title: 'Invite user',
      content: 'Choose contact to add to the chat.',
      submitFunc: addChatUser,
    },
    removeChatUser: {
      title: 'Remove user',
      content: 'Choose contact to remove from the chat.',
      submitFunc: removeChatUser,
    },
    makeAdmin: {
      title: 'Give admin rights',
      content: 'Choose contact to make admin.',
      submitFunc: makeAdmin,
    },
  };
  return values;
};

export default SidebarChatsMenuValues;
