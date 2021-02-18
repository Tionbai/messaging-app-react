import React from 'react';
import Sidebar from './components/Sidebar';
import Chatroom from './components/Chatroom';

const Dashboard = (props) => {
  return (
    <main className="d-flex" style={{ height: '100vh' }}>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Sidebar {...props} />
      <Chatroom />
    </main>
  );
};

export default Dashboard;
