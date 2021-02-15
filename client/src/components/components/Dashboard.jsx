import React from 'react';
import PropTypes from 'prop-types';
import Sidebar from './components/Sidebar';
import OpenConversation from './components/OpenConversation';
import { useConversations } from '../../contexts/ConversationsProvider';

const Dashboard = (props) => {
  const { username, setUsername } = props;
  const { selectedConversation } = useConversations();

  return (
    <main className="d-flex" style={{ height: '100vh' }}>
      <Sidebar username={username} setUsername={setUsername} />
      {/* Show conversation panel if selected */}
      {selectedConversation && <OpenConversation />}
    </main>
  );
};

export default Dashboard;

Dashboard.propTypes = {
  username: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  setUsername: PropTypes.func.isRequired,
};

Dashboard.defaultProps = {
  username: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
};
