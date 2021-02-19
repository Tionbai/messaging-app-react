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
  const [apiResponseMessage, setApiResponseMessage] = useState('');
  const [chatrooms, setChatrooms] = useState([]);
  const [messages, setMessages] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('CHAT_Token'));

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
      return setApiResponseMessage(response.data);
    } catch (err) {
      return setApiResponseMessage(err.response.data);
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
      return setApiResponseMessage({ type: 'success', message: response.data.message });
    } catch (err) {
      return setApiResponseMessage({ type: 'error', message: err.response.data.message });
    }
  };

  // Get token after user logs in.
  useEffect(() => {
    setToken(localStorage.getItem('CHAT_Token'));
  }, [loginUser]);

  // TODO: User should only get chatrooms they are involved with.

  // Get all chatrooms.
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
      setChatrooms([...getChatrooms()]);
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.log(err.reponse);
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
      return response.data;
    } catch (err) {
      console.log(err.reponse);
      return err.response;
    }
  };

  useEffect(() => {
    getChatrooms();
  }, []);

  useEffect(() => {
    getMessages();
  }, [chatrooms]);

  const value = {
    token,
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
  };

  return <APIContext.Provider value={value}>{children}</APIContext.Provider>;
};

export { useAPI, APIProvider };

APIProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};
