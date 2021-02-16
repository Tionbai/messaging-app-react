import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';

// Handle socket.io between client and server.

const SocketContext = React.createContext();

// Shorthand for using context in other parts of the application.
const useSocket = () => {
  return useContext(SocketContext);
};

const SocketProvider = ({ username, children }) => {
  const [socket, setSocket] = useState();

  useEffect(() => {
    if (!username) return null;
    // Make request to server and pass in id for the request. In this case the sender of a message in the chat.
    const newSocket = io('http://localhost:5000', { query: { username } });
    setSocket(newSocket);

    // Close socket to prevent reruns of same request.
    return () => newSocket.close();
  }, [username]);
  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};

export { SocketProvider, useSocket };

SocketProvider.propTypes = {
  username: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  children: Object(PropTypes.object).isRequired,
};

SocketProvider.defaultProps = {
  username: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
};
