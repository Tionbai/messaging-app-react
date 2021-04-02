import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useUser } from './UserProvider';
import { useSocket } from './SocketProvider';
import { useChat } from './ChatProvider';
import { useAPI } from './APIProvider';

const MessagesContext = React.createContext();

// Shorthand for using context in other parts of the application.
const useMessages = () => {
  return useContext(MessagesContext);
};

const MessagesProvider = ({ children }) => {
  const [filteredMessages, setFilteredMessages] = useState();
  const socket = useSocket();
  const { user } = useUser();
  const { chats, selectedChat, setSelectedChat, newPrivateChat } = useChat();
  const { APIdelete, setAPIError } = useAPI();

  // Delete a single message.
  const deleteMessage = async (messageId) => {
    const route = `/message/${messageId}`;
    try {
      const response = await APIdelete(route);
      // TODO: Delete message from chat.
      console.log(response.data);
      return response.data;
      // return setMessages([...response.data]);
    } catch (err) {
      setAPIError([err.response.data]);
      console.log(err.response);
      return err.response;
    }
  };

  // Filter messages to display given a chat ID (from dashboard/sidebar).
  const filterMessages = (chatId) => {
    const chat = chats.filter((c) => chatId === c._id);
    const filtered = chat.messages.filter((message) => {
      return message.chat === chatId;
    });
    return setFilteredMessages([...filtered]);
  };

  const addMessageToChat = ({ chat, sender, message }) => {
    setSelectedChat({
      ...selectedChat,
      // Todo: Maybe change selected chat to chats.
      messages: [...selectedChat.messages, { chat, sender, message }],
    });
  };

  const newMessage = (contactName, contactId) => {
    const filteredChat = chats.find((chat) => {
      return (
        chat.private === true &&
        chat.users.length === 2 &&
        chat.name.toLowerCase().includes(contactName.toLowerCase())
      );
    });
    if (filteredChat) setSelectedChat(filteredChat[0]);
    if (!filteredChat) newPrivateChat(`${contactName} ${user.username}`, contactId);
  };

  useEffect(() => {
    if (!socket) return null;

    socket.on('receive-message', addMessageToChat);

    return () => socket.off('receive-message', addMessageToChat);
  }, [socket, addMessageToChat]);

  const sendMessage = (text) => {
    socket.emit('send-message', { chatId: selectedChat._id, message: text });
  };

  const value = { newMessage, sendMessage, filterMessages, filteredMessages, deleteMessage };

  return <MessagesContext.Provider value={value}>{children}</MessagesContext.Provider>;
};

export { useMessages, MessagesProvider };

MessagesProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

MessagesProvider.defaultProps = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};
