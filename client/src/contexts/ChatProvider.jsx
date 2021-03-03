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
  const { newPrivateChat, chats, user, messages } = useAPI();
  const [selectedChat, setSelectedChat] = useState(chats[0]);
  const [filteredMessages, setFilteredMessages] = useState(messages);
  const socket = useSocket();

  const formattedChat = (chat) => {
    if (chat && user) {
      const privateChat = chat.private === true;

      if (privateChat) {
        const chatUserNames = chat.name.split(' ');
        const privateChatName = chatUserNames.filter((chatUserName) => {
          return chatUserName.toLowerCase() !== user.username.toLowerCase();
        });
        return { ...chat, privateChatName: privateChatName[0] };
      }
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
    return chat;
  };

  const formattedChats = (chatsToFormat) => {
    const newChats = chatsToFormat.map((chat) => {
      return formattedChat(chat);
    });
    return newChats;
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

  const newMessage = (contactName, contactId) => {
    const filteredChat = chats.filter((chat) => {
      return chat.private === true && chat.users.length === 2;
    });
    if (filteredChat) setSelectedChat(formattedChat(filteredChat[0]));
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

  const value = {
    selectedChat,
    formattedChat: formattedChat(selectedChat),
    formattedChats: formattedChats(chats),
    setSelectedChat,
    newMessage,
    sendMessage,
    messages,
    filterMessages,
    filteredMessages,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export { ChatProvider, useChat };

ChatProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

ChatProvider.defaultProps = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
