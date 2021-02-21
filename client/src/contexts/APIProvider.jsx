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
  const [chatrooms, setChatrooms] = useState([]);
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
      const response = await axios.get('/user/getcontacts', {
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
  const addContact = async (contactRef) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const response = await axios.post(
        '/user/addcontact',
        {
          ref: contactRef,
        },
        {
          headers,
        },
      );
      console.log(response.data);
      setContacts([...contacts, response.data.data]);
      return response.data;
    } catch (err) {
      console.log(err.response);
      return err.response;
    }
  };

  // Get all chatrooms user is added to.
  const getChatrooms = async () => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const response = await axios.get('/chatroom', { headers });
      return setChatrooms([...response.data]);
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

  // Create new chatroom.
  const createChatroom = async (chatroomName) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const response = await axios.post(
        '/chatroom',
        {
          name: chatroomName,
        },
        {
          headers,
        },
      );
      setChatrooms([...chatrooms, response.data.chatroom]);
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.log(err.response);
      return err.response;
    }
  };

  // Delete chatroom.
  const deleteChatroom = async (chatroomName) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const response = await axios.delete(
        '/chatroom',
        {
          name: chatroomName,
        },
        {
          headers,
        },
      );
      setChatrooms([...chatrooms.filter((chatroom) => chatroom.name !== chatroomName)]);
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.log(err.response);
      return err.response;
    }
  };

  // Join existing chatroom.
  const joinChatroom = async (chatroomName) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const response = await axios.post(
        '/chatroom/join',
        {
          name: chatroomName,
        },
        {
          headers,
        },
      );
      console.log(response.data);
      setChatrooms([...chatrooms, response.data.chatroom]);
      return response.data;
    } catch (err) {
      console.log(err.response);
      return err.response;
    }
  };

  useEffect(() => {
    getChatrooms();
    getContacts();
  }, []);

  useEffect(() => {
    getMessages();
  }, [chatrooms]);

  const value = {
    token,
    setToken,
    apiResponseMessage,
    typeError,
    registerUser,
    loginUser,
    getChatrooms,
    createChatroom,
    joinChatroom,
    chatrooms,
    setChatrooms,
    messages,
    setMessages,
    getMessages,
    addContact,
    contacts,
    deleteChatroom,
  };

  return <APIContext.Provider value={value}>{children}</APIContext.Provider>;
};

export { useAPI, APIProvider };

APIProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};
