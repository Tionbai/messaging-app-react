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
  const { chats, user, messages } = useAPI();
  const [selectedChat, setSelectedChat] = useState(null);
  const [filteredMessages, setFilteredMessages] = useState(messages);
  const socket = useSocket();

  const formattedChat = (chat) => {
    if (chat && user) {
      const newMessages = chat.messages.map((message) => {
        const fromMe = message.sender === user._id;
        const messageSender = chat.users.map((chatuser) => {
          if (message.sender === chatuser._id) return chatuser.username;
          return '';
        });

        return { ...message, fromMe, senderName: messageSender };
      });
      return { ...chat, messages: newMessages };
    }
    return null;
  };

  // Select a chat to display given a chat ID (from dashboard/sidebar).
  const selectChat = (chatId) => {
    const chat = chats.filter((c) => {
      return chatId === c._id;
    });
    chat.selected = true;
    setSelectedChat(chat[0]);
  };

  // Filter messages to display given a chat ID (from dashboard/sidebar).
  const filterMessages = (chatId) => {
    const filtered = messages.filter((message) => {
      return message.chat === chatId;
    });
    return setFilteredMessages([...filtered]);
  };

  const addMessageToChat = ({ chat, sender, message }) => {
    setSelectedChat({ ...selectedChat, messages: [...messages, { chat, sender, message }] });
  };

  useEffect(() => {
    if (!socket) return null;

    socket.on('receive-message', addMessageToChat);

    return () => socket.off('receive-message', addMessageToChat);
  }, [socket, addMessageToChat]);

  const sendMessage = (text) => {
    socket.emit('send-message', { chatId: selectedChat._id, message: text });
  };

  const value = {
    selectedChat,
    formattedChat: formattedChat(selectedChat),
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
