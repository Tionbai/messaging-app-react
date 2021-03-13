import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import history from '../history';
import { useAPI } from './APIProvider';

const UserContext = React.createContext();

// Shorthand for using context in other parts of the application.
const useUser = () => {
  return useContext(UserContext);
};

const UserProvider = ({ children }) => {
  const { token, setToken, APIpost, APIget, APIDeleteConfig, setAPIError } = useAPI();
  const [user, setUser] = useState(null);

  // // Return specific error message based on given type parameter.
  // const typeError = (type) => {
  //   if (apiResponseMessage.length) {
  //     const error = apiResponseMessage.find((message) => {
  //       return message.type === type;
  //     });
  //     if (error) return error.message;
  //   }
  //   return false;
  // };

  // Register user and redirect user to login page.
  const registerUser = async (username, email, password) => {
    const route = '/user/register';
    const body = {
      username,
      email,
      password,
    };
    try {
      const response = await APIpost(route, body);
      history.push('/login');
      return response.data;
    } catch (err) {
      setAPIError([...err.response.data]);
      return err.response.data;
    }
  };

  // Login user, set token and redirect user to dashboard page.
  const loginUser = async (username, password) => {
    const route = '/user/login';
    const body = {
      username,
      password,
    };
    try {
      const response = await APIpost(route, body);
      const loggedInUser = await response.data.user;
      history.push('/dashboard');
      localStorage.setItem('CHAT_Token', response.data.token);
      return setUser(loggedInUser);
    } catch (err) {
      setAPIError([err.response.data]);
      return err.response;
    }
  };

  const getUser = async () => {
    const route = '/user/';
    try {
      const response = await APIget(route);
      return setUser(await response.data);
    } catch (err) {
      return err.response;
    }
  };

  // Delete user account and redirect to register page.
  const deleteUser = async (userRef, userPassword) => {
    const route = `/user/${userRef}`;
    const config = {
      data: { password: userPassword },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await APIDeleteConfig(route, config);
      history.push('/register');
      localStorage.removeItem('CHAT_Token');
      return response.data.message;
    } catch (err) {
      return err.response.data.message;
    }
  };

  // Get token after user logs in.
  useEffect(() => {
    setToken(localStorage.getItem('CHAT_Token'));
  }, [loginUser]);

  useEffect(async () => {
    await getUser();
  }, []);

  const value = { registerUser, loginUser, deleteUser, user, token };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { useUser, UserProvider };

UserProvider.propTypes = {
  children: Object(PropTypes.object),
};

UserProvider.defaultProps = {
  children: Object(PropTypes.object),
};
