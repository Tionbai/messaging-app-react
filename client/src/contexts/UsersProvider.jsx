import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import useLocalStorage from '../hooks/useLocalStorage';

const UsersContext = React.createContext();

// Shorthand for using context in other parts of the application.
const useUsers = () => {
  return useContext(UsersContext);
};

const UsersProvider = ({ children }) => {
  const [users, setUsers] = useLocalStorage('users', []);

  const checkIfUsernameExists = (username) => {
    const usernameExists = users.find((user) => user.username === username);
    if (usernameExists) return true;
    return false;
  };

  const checkIfEmailExists = (email) => {
    const emailExists = users.find((user) => user.email === email);
    if (emailExists) return true;
    return false;
  };

  const createUser = (username, email, password) => {
    setUsers((prevUsers) => {
      return [...prevUsers, { username, email, password }];
    });
  };

  const checkIfValidLogin = (username, password) => {
    const validLogin = users.find(
      (user) => user.username === username && user.password === password,
    );
    if (validLogin) return true;
    return false;
  };

  const value = {
    users,
    createUser,
    checkIfUsernameExists,
    checkIfEmailExists,
    checkIfValidLogin,
  };

  return <UsersContext.Provider value={value}>{children}</UsersContext.Provider>;
};

export { useUsers, UsersProvider };

UsersProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};
