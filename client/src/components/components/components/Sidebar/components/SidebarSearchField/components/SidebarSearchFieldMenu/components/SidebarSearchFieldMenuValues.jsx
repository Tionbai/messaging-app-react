import { useChat } from '../../../../../../../../../contexts/ChatProvider';
import { useContacts } from '../../../../../../../../../contexts/ContactsProvider';

const SidebarChatsMenuValues = () => {
  const { newChat, joinChat } = useChat();
  const { newContact, deleteContact } = useContacts();
  const values = {
    newChat: {
      title: 'Create new chat',
      placeholder: 'Type in chat name',
      submitFunc: newChat,
    },
    joinChat: {
      title: 'Join existing chat',
      placeholder: 'Type in chat name',
      submitFunc: joinChat,
    },
    newContact: {
      title: 'Add new contact',
      placeholder: "Type in the user's username or email",
      submitFunc: newContact,
    },
    deleteContact: {
      title: 'Delete contact',
      submitFunc: deleteContact,
    },
  };
  return values;
};

export default SidebarChatsMenuValues;
