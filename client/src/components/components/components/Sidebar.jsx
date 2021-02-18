import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { useSocket } from '../../../contexts/SocketProvider';

const Sidebar = () => {
  const [chatrooms, setChatrooms] = useState([]);
  // const [messages, setMessages] = useState([]);

  const getChatrooms = () => {
    axios
      .get('/chatroom', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('CHAT_Token')}`,
        },
      })
      .then((response) => {
        setChatrooms(response.data);
      })
      .catch(() => {
        setTimeout(getChatrooms, 3000);
      });
  };

  useEffect(() => {
    getChatrooms();
  }, []);

  const socket = useSocket();

  useEffect(() => {
    if (!socket) return null;

    if (chatrooms.length) {
      socket.emit('join', {
        chatroomId: chatrooms[0]._id,
      });

      //   socket.on('newMessage', ({ message, userId, username }) => {
      //     setMessages([...messages, { message, userId, username }]);
      //   });

      //   return () => {
      //     socket.emit('leave', {
      //       chatroomId: chatrooms[0]._id,
      //     });
      //   };
    }
    return socket;
  }, [socket, chatrooms]);

  return (
    <nav
      style={{ width: '250px', height: '100vh' }}
      className="d-flex flex-column border justify-content-end"
    >
      <section className="d-flex flex-column flex-grow-1">
        <h3 className="mx-auto">Chatrooms</h3>
        {chatrooms.map((chatroom) => {
          return (
            <div className="p-2 border-top border-bottom" key={uuidv4()}>
              Room:
              {` ${chatroom.name}`}
            </div>
          );
        })}
      </section>
      <Button className="p-2 border-top rounded-0">New chatroom</Button>
      <Button variant="outline" className="p-2 border-top rounded-0">
        Logout
      </Button>
    </nav>
  );
};

export default Sidebar;
