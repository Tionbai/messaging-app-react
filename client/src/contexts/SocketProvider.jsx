import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';

// Handle socket.io between client and server.

const SocketContext = React.createContext();

// Shorthand for using context in other parts of the application.
const useSocket = () => {
  return useContext(SocketContext);
};

const SocketProvider = ({ children }) => {
  const token = localStorage.getItem('CHAT_Token');
  const [socket, setSocket] = useState();

  useEffect(() => {
    if (!token) return null;
    // Make request to server and pass in id for the request. In this case the sender of a message in the chat.

    // const newSocket = io('http://localhost:8000', { query: { username } });
    const newSocket = io('http://localhost:8000', {
      query: {
        token,
      },
    });

    newSocket.on('connect', () => {
      console.log('Connected');
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected');
    });

    setSocket(newSocket);

    // Close socket to prevent reruns of same request.
    return () => newSocket.close();
  }, []);
  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};

export { SocketProvider, useSocket };

SocketProvider.propTypes = {
  // token: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  children: Object(PropTypes.array).isRequired,
};

// SocketProvider.defaultProps = {
//   token: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
// };
