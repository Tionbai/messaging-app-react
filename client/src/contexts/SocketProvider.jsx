import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';

// Handle socket.io between client and server.

const SocketContext = React.createContext();

// Shorthand for using context in other parts of the application.
const useSocket = () => {
  return useContext(SocketContext);
};

const SocketProvider = ({ id, children }) => {
  const [socket, setSocket] = useState();

  useEffect(() => {
    if (!id) return null;
    // Make request to server and pass in id for the request. In this case the sender of a message in the chat.
    const newSocket = io('http://localhost:5000', { query: { id } });
    setSocket(newSocket);

    // Close socket to prevent reruns of same request.
    return () => newSocket.disconnect();
  }, [id]);
  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};

export { SocketProvider, useSocket };

SocketProvider.propTypes = {
  id: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  children: Object(PropTypes.object).isRequired,
};

SocketProvider.defaultProps = {
  id: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
};
