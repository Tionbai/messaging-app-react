import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Chat from './components/components/Chat';
import { useAPI } from '../../contexts/APIProvider';
import { useChat } from '../../contexts/ChatProvider';
import history from '../../history';

const Dashboard = () => {
  const { token, chats } = useAPI();
  const { selectChat, selectedChat } = useChat();

  useEffect(() => {
    if (!token) history.push('/login');
  }, [token]);

  // Select first Chat in the list on initial render.
  useEffect(() => {
    if (chats.length) selectChat(chats[0]._id);
  }, [chats]);

  return (
    <main style={{ display: 'flex', height: '100vh', width: '100vw' }}>
      <Sidebar />
      {selectedChat && <Chat />}
    </main>
  );
};

export default withRouter(Dashboard);
