import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useAPI } from './APIProvider';
import { useSocket } from './SocketProvider';

// Handle socket.io between client and server.

const ChatContext = React.createContext();

// Shorthand for using context in other parts of the application.
const useChat = () => {
  return useContext(ChatContext);
};

const ChatProvider = ({ children }) => {
  const { chats, messages, setMessages } = useAPI();
  const [selectedChat, setSelectedChat] = useState(null);
  const [filteredMessages, setFilteredMessages] = useState(messages);
  const socket = useSocket();

  // Select a chat to display given a chat ID (from dashboard/sidebar).
  const selectChat = (chatId) => {
    const chat = chats.filter((room) => {
      return chatId === room._id;
    });
    chats.map((room) => {
      const newRoom = room;
      newRoom.selected = false;
      if (chatId === room._id) {
        newRoom.selected = true;
      }
      return newRoom;
    });
    setSelectedChat([...chat]);
  };

  // Filter messages to display given a chat ID (from dashboard/sidebar).
  const filterMessages = (chatId) => {
    const filtered = messages.filter((message) => {
      return message.chat === chatId;
    });
    return setFilteredMessages([...filtered]);
  };

  const addMessageToChat = ({ chat, sender, message }) => {
    setMessages([...messages, { chat, sender, message }]);
  };

  useEffect(() => {
    if (!socket) return null;

    socket.on('receive-message', addMessageToChat);

    return () => socket.off('receive-message', addMessageToChat);
  }, [socket, addMessageToChat]);

  const sendMessage = (text) => {
    socket.emit('send-message', { chatId: selectedChat[0]._id, message: text });
  };

  const value = {
    selectedChat,
    selectChat,
    sendMessage,
    messages,
    filterMessages,
    filteredMessages,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export { ChatProvider, useChat };

ChatProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
};
