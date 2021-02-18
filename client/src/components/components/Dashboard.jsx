import React from 'react';
import { withRouter } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Chatroom from './components/Chatroom';

const Dashboard = (props) => {
  return (
    <main className="d-flex vh-100 vw-100">
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Sidebar {...props} />
      <Chatroom />
    </main>
  );
};

export default withRouter(Dashboard);
