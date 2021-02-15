import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Tab, Nav, Button, Modal } from 'react-bootstrap';
import Conversations from './components/Conversations';
import Contacts from './components/Contacts';
import NewConversationModal from './components/NewConversationModal';
import NewContactModal from './components/NewContactModal';

const CONVERSATIONS_KEY = 'conversations';
const CONTACTS_KEY = 'contacts';

const Sidebar = (props) => {
  const { id } = props;
  const [activeKey, setActiveKey] = useState(CONVERSATIONS_KEY);
  const [modalOpen, setModalOpen] = useState(false);
  const conversationsOpen = activeKey === CONVERSATIONS_KEY;

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <nav style={{ width: '250px' }} className="d-flex flex-column">
      <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
        <Nav variant="tabs" className="justify-content-center">
          <Nav.Item>
            <Nav.Link eventKey={CONVERSATIONS_KEY}>Conversations</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey={CONTACTS_KEY}>Contacts</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content className="border-right overflow-auto flex-grow-1">
          <Tab.Pane eventKey={CONVERSATIONS_KEY}>
            <Conversations id={id} />
          </Tab.Pane>
          <Tab.Pane eventKey={CONTACTS_KEY}>
            <Contacts id={id} />
          </Tab.Pane>
        </Tab.Content>
        <div className="p-2 border-top border-right small">
          Your id:
          <span className="text-muted">{` ${id}`}</span>
        </div>
        <Button onClick={() => setModalOpen(true)} className="rounded-0">
          New
          {conversationsOpen ? ' Conversation' : ' Contact'}
        </Button>
      </Tab.Container>
      <Modal show={modalOpen} onHide={closeModal}>
        {conversationsOpen ? (
          <NewConversationModal closeModal={closeModal} />
        ) : (
          <NewContactModal closeModal={closeModal} />
        )}
      </Modal>
    </nav>
  );
};

export default Sidebar;

Sidebar.propTypes = {
  id: PropTypes.string,
};

Sidebar.defaultProps = {
  id: PropTypes.string,
};
