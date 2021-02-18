import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Sidebar from './components/Sidebar';
import Chatroom from './components/Chatroom';

const Dashboard = (props) => {
  const { token } = props;
  return (
    <main className="d-flex" style={{ height: '100vh' }}>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Sidebar {...props} />
      <div>
        {token}
        <Chatroom />
      </div>
    </main>
  );
};

export default withRouter(Dashboard);

Dashboard.propTypes = {
  token: PropTypes.string.isRequired,
};
