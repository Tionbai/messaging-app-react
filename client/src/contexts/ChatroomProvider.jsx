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
  const { chatrooms, messages, setMessages } = useAPI();
  const [selectedChatroom, setSelectedChatroom] = useState(chatrooms[0]);
  const [filteredMessages, setFilteredMessages] = useState(messages);
  const socket = useSocket();

  // Select a chatroom to display given a chatroom ID (from dashboard/sidebar).
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

  // Filter messages to display given a chatroom ID (from dashboard/sidebar).
  const filterMessages = (chatroomId) => {
    const filtered = messages.filter((message) => {
      return message.chatroom === chatroomId;
    });
    return setFilteredMessages([...filtered]);
  };

  const addMessageToChatroom = ({ chatroom, sender, message }) => {
    setMessages([...messages, { chatroom, sender, message }]);
  };

  useEffect(() => {
    if (!socket) return null;

    socket.on('receive-message', addMessageToChatroom);

    return () => socket.off('receive-message', addMessageToChatroom);
  }, [socket, addMessageToChatroom]);

  const sendMessage = (text) => {
    socket.emit('send-message', { chatroomId: selectedChatroom[0]._id, message: text });
  };

  const value = {
    selectedChatroom,
    selectChatroom,
    sendMessage,
    messages,
    filterMessages,
    filteredMessages,
  };
  return <ChatroomContext.Provider value={value}>{children}</ChatroomContext.Provider>;
};

export { ChatroomProvider, useChatroom };

ChatroomProvider.propTypes = {
  // token: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
};

// ChatroomProvider.defaultProps = {
//   token: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
// };
