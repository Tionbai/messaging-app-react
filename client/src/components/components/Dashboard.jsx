import React from 'react';
import PropTypes from 'prop-types';
import Sidebar from './components/Sidebar';
import OpenConversation from './components/OpenConversation';
import { useConversations } from '../../contexts/ConversationsProvider';

const Dashboard = (props) => {
  const { id } = props;
  const { selectedConversation } = useConversations();

  return (
    <main className="d-flex" style={{ height: '100vh' }}>
      <Sidebar id={id} />
      {/* Show conversation panel if selected */}
      {selectedConversation && <OpenConversation />}
    </main>
  );
};

export default Dashboard;

Dashboard.propTypes = {
  id: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
};

Dashboard.defaultProps = {
  id: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
};
