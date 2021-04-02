import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useAPI } from './APIProvider';
import { useUser } from './UserProvider';

const ChatContext = React.createContext();

// Shorthand for using context in other parts of the application.
const useChat = () => {
  return useContext(ChatContext);
};

const ChatProvider = ({ children }) => {
  const { APIget, APIpost, APIput, APIdelete, setAPIError } = useAPI();
  const [chats, setChats] = useState([]);
  const { user } = useUser();
  const [selectedChat, setSelectedChat] = useState(chats[0]);

  // Get all chats user is added to.
  const getChats = async () => {
    const route = '/chat';
    try {
      const response = await APIget(route);
      return setChats(response.data);
    } catch (err) {
      setAPIError([err.response.data]);
      return err.response;
    }
  };

  // Create new public chat.
  const newChat = async (chatName) => {
    const route = '/chat';
    const body = {
      name: chatName,
    };
    try {
      const response = await APIpost(route, body);
      setChats([...chats, response.data]);
      return response.data;
    } catch (err) {
      setAPIError([err.response.data]);
      return err.response;
    }
  };

  // Create new private chat.
  const newPrivateChat = async (chatName, contactId) => {
    const route = '/chat/private';
    const body = {
      name: chatName,
      contactId,
    };
    try {
      const response = await APIpost(route, body);
      setChats([...chats, response.data]);
      return response.data;
    } catch (err) {
      setAPIError([err.response.data]);
      return err.response;
    }
  };

  // Delete chat.
  const deleteChat = async (chatName) => {
    const route = `/chat/${chatName}`;
    try {
      const response = await APIdelete(route);
      setChats([...chats.filter((chat) => chat.name !== chatName)]);
      return response.data;
    } catch (err) {
      setAPIError([err.response.data]);
      return err.response;
    }
  };

  // Clear chat messages.
  const clearChat = async (chatName) => {
    const route = `/chat/messages/${chatName}`;
    try {
      const response = await APIdelete(route);
      return response.data;
    } catch (err) {
      setAPIError([err.response.data]);
      return err.response;
    }
  };

  // Add chat user.
  const addChatUser = async (chatName, username) => {
    const route = '/chat/addChatUser';
    const body = {
      name: chatName,
      reqUser: username,
    };
    try {
      const response = await APIput(route, body);
      return response.data;
    } catch (err) {
      setAPIError([err.response.data]);
      return err.response;
    }
  };

  // Remove chat user.
  const removeChatUser = async (chatName, username) => {
    const route = '/chat/removeChatUser';
    const body = {
      name: chatName,
      reqUser: username,
    };
    try {
      const response = await APIput(route, body);
      return response.data;
    } catch (err) {
      setAPIError([err.response.data]);
      return err.response;
    }
  };

  // Transfer admin rights to user.
  const makeAdmin = async (chatName, username) => {
    const route = '/chat/makeAdmin';
    const body = {
      name: chatName,
      reqUser: username,
    };
    try {
      const response = await APIput(route, body);
      return response.data;
    } catch (err) {
      setAPIError([err.response.data]);
      return err.response;
    }
  };

  // Join existing chat.
  const joinChat = async (chatName) => {
    const route = '/chat/join';
    const body = {
      name: chatName,
    };
    try {
      const response = await APIput(route, body);
      setChats([...chats, response.data]);
      return response.data;
    } catch (err) {
      setAPIError([err.response.data]);
      return err.response;
    }
  };

  // Leave existing chat.
  const leaveChat = async (chatName) => {
    const route = '/chat/leave';
    const body = {
      name: chatName,
    };
    try {
      const response = await APIput(route, body);
      setChats([...chats.filter((chat) => chat.name !== response.data)]);
      return response.data;
    } catch (err) {
      setAPIError([err.response.data]);
      return err.response;
    }
  };

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
      const privateChat = chat.private === true;

      if (privateChat) {
        const chatUserNames = chat.name.split(' ');
        const privateChatName = chatUserNames.filter((chatUserName) => {
          return chatUserName.toLowerCase() !== user.username.toLowerCase();
        });
        return { ...chat, messages: newMessages, privateChatName: privateChatName[0] };
      }
      return { ...chat, messages: newMessages };
    }
    return chat;
  };

  const formattedChats = (chatsToFormat) => {
    if (chatsToFormat) {
      const newChats = chatsToFormat.map((chat) => {
        return formattedChat(chat);
      });
      return newChats;
    }
    return null;
  };

  useEffect(async () => {
    if (user) {
      await getChats();
    }
  }, [user]);

  const value = {
    selectedChat,
    chats,
    getChats,
    setChats,
    formattedChat: formattedChat(selectedChat),
    formattedChats: formattedChats(chats),
    setSelectedChat,
    newChat,
    newPrivateChat,
    joinChat,
    leaveChat,
    clearChat,
    deleteChat,
    addChatUser,
    removeChatUser,
    makeAdmin,
  };

  if (user) return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
  return null;
};

export { ChatProvider, useChat };

ChatProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

ChatProvider.defaultProps = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
