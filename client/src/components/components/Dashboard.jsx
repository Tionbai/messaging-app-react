import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Chatroom from './components/Chatroom';
import { useAPI } from '../../contexts/APIProvider';
import { useChatroom } from '../../contexts/ChatroomProvider';
import history from '../../history';

const Dashboard = () => {
  const { token, chatrooms, messages } = useAPI();
  const { selectChatroom, selectedChatroom, filterMessages } = useChatroom();

  useEffect(() => {
    if (!token) history.push('/login');
  }, [token]);

  // Select first chatroom in the list on initial render.
  useEffect(() => {
    if (chatrooms.length) selectChatroom(chatrooms[0]._id);
  }, [chatrooms]);

  // Filter messages when chatroom is selected and when message state updates.
  useEffect(() => {
    if (selectedChatroom) filterMessages(selectedChatroom[0]._id);
  }, [messages, selectedChatroom]);

  return (
    <main className="d-flex vh-100 vw-100">
      <Sidebar />
      {selectedChatroom && <Chatroom />}
    </main>
  );
};

export default withRouter(Dashboard);
