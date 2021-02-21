import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import history from '../history';

const APIContext = React.createContext();

// Shorthand for using context in other parts of the application.
const useAPI = () => {
  return useContext(APIContext);
};

const APIProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('CHAT_Token'));
  const [apiResponseMessage, setApiResponseMessage] = useState('');
  const [chats, setChats] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [messages, setMessages] = useState([]);

  // Set and remove API response message after a short time.
  const setApiResponseMessageFunc = (value) => {
    setApiResponseMessage(value);
    setTimeout(() => {
      setApiResponseMessage('');
    }, 5000);
  };

  // Return specific error message based on given type parameter.
  const typeError = (type) => {
    if (apiResponseMessage.length) {
      const error = apiResponseMessage.find((message) => {
        return message.type === type;
      });
      if (error) return error.message;
    }
    return false;
  };

  // Register user and redirect user to login page.
  const registerUser = async (username, email, password) => {
    try {
      const response = await axios.post('/user/register', {
        username,
        email,
        password,
      });
      history.push('/login');
      return setApiResponseMessageFunc(response.data);
    } catch (err) {
      return setApiResponseMessageFunc(err.response.data);
    }
  };

  // Login user, set token and redirect user to dashboard page.
  const loginUser = async (username, password) => {
    try {
      const response = await axios.post('/user/login', {
        username,
        password,
      });
      history.push('/dashboard');
      localStorage.setItem('CHAT_Token', response.data.token);
      return setApiResponseMessageFunc({ type: 'success', message: response.data.message });
    } catch (err) {
      return setApiResponseMessageFunc({ type: 'error', message: err.response.data.message });
    }
  };

  // Get token after user logs in.
  useEffect(() => {
    setToken(localStorage.getItem('CHAT_Token'));
  }, [loginUser]);

  // Add new contact given a contact ref (username or email).
  const getContacts = async () => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const response = await axios.get('/user/getContacts', {
        headers,
      });
      setContacts([...response.data]);
      return response.data;
    } catch (err) {
      console.log(err.reponse);
      return err.response;
    }
  };

  // Add new contact given a contact ref (username or email).
  const newContact = async (contactRef) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const response = await axios.post(
        '/user/newContact',
        {
          ref: contactRef,
        },
        {
          headers,
        },
      );
      console.log(response.data);
      setContacts([...contacts, response.data]);
      return response.data;
    } catch (err) {
      console.log(err.response);
      return err.response;
    }
  };

  // Get all chats user is added to.
  const getChats = async () => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const response = await axios.get('/chat', { headers });
      return setChats([...response.data]);
    } catch (err) {
      return err.response;
    }
  };

  // Get all messages.
  const getMessages = async () => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const response = await axios.get('/message', { headers });
      return setMessages([...response.data]);
    } catch (err) {
      console.log(err.response);
      return err.response;
    }
  };

  // Create new chat.
  const newChat = async (chatName) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const response = await axios.post(
        '/chat',
        {
          name: chatName,
        },
        {
          headers,
        },
      );
      setChats([...chats, response.data]);
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.log(err.response);
      return err.response;
    }
  };

  // Delete chat.
  const deleteChat = async (chatName) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const response = await axios.delete(`/chat/${chatName}`, {
        headers,
      });
      setChats([...chats.filter((chat) => chat.name !== chatName)]);
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.log(err.response);
      return err.response;
    }
  };

  // Join existing chat.
  const joinChat = async (chatName) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const response = await axios.post(
        '/chat/join',
        {
          name: chatName,
        },
        {
          headers,
        },
      );
      console.log(response.data);
      setChats([...chats, response.data]);
      return response.data;
    } catch (err) {
      console.log(err.response);
      return err.response;
    }
  };

  useEffect(() => {
    getChats();
    getContacts();
  }, []);

  useEffect(() => {
    getMessages();
  }, [chats]);

  const value = {
    token,
    setToken,
    apiResponseMessage,
    typeError,
    registerUser,
    loginUser,
    getChats,
    newChat,
    joinChat,
    chats,
    setChats,
    messages,
    setMessages,
    getMessages,
    newContact,
    contacts,
    deleteChat,
  };

  return <APIContext.Provider value={value}>{children}</APIContext.Provider>;
};

export { useAPI, APIProvider };

APIProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};
