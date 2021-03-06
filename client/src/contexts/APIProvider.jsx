import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const APIContext = React.createContext();

// Shorthand for using context in other parts of the application.
const useAPI = () => {
  return useContext(APIContext);
};

const APIProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('CHAT_Token'));

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const APIget = (route) => {
    return axios.get(route, { headers });
  };

  const APIpost = (route, body) => {
    return axios.post(route, body, { headers });
  };

  const APIput = (route, body) => {
    return axios.put(route, body, { headers });
  };

  const APIdelete = (route) => {
    return axios.delete(route, { headers });
  };

  const APIDeleteConfig = (route, config) => {
    return axios.delete(route, config);
  };

  const value = { token, setToken, APIget, APIpost, APIput, APIdelete, APIDeleteConfig };

  return <APIContext.Provider value={value}>{children}</APIContext.Provider>;
};

export { useAPI, APIProvider };

APIProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

APIProvider.defaultProps = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};
