import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useAPI } from './APIProvider';
import { useSocket } from './SocketProvider';

// Handle socket.io between client and server.

const ChatroomContext = React.createContext();

// Shorthand for using context in other parts of the application.
const useChatroom = () => {
  return useContext(ChatroomContext);
};

const ChatroomProvider = ({ children }) => {
  const { chatrooms } = useAPI();
  const [selectedChatroom, setSelectedChatroom] = useState(chatrooms[0]);
  const socket = useSocket();
  const token = localStorage.getItem('CHAT_Token');

  const selectChatroom = (chatroomId) => {
    const chatroom = chatrooms.filter((room) => {
      return chatroomId === room._id;
    });
    chatrooms.map((room) => {
      const newRoom = room;
      newRoom.selected = false;
      if (chatroomId === room._id) {
        newRoom.selected = true;
      }
      return newRoom;
    });
    setSelectedChatroom([...chatroom]);
  };

  useEffect(() => {
    if (chatrooms.length) selectChatroom(chatrooms[0]._id);
  }, [chatrooms]);

  const addMessageToChatroom = ({ userToken, chatroom, text }) => {
    console.log({ userToken, chatroom, text });
  };

  useEffect(() => {
    if (!socket) return null;

    socket.on('receive-message', addMessageToChatroom);

    return () => socket.off('receive-message', addMessageToChatroom);
  }, []);

  const sendMessage = (chatroom, text) => {
    socket.emit('send-message', { token, chatroom, text });
    addMessageToChatroom({ token, chatroom, text });
  };

  const value = {
    selectedChatroom,
    selectChatroom,
    sendMessage,
  };
  return <ChatroomContext.Provider value={value}>{children}</ChatroomContext.Provider>;
};

export { ChatroomProvider, useChatroom };

ChatroomProvider.propTypes = {
  // token: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  children: Object(PropTypes.array).isRequired,
};

// ChatroomProvider.defaultProps = {
//   token: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
// };
