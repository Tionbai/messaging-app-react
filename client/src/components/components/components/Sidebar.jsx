import React, { useState } from 'react';
import { Tabs, Tab, Button } from 'react-bootstrap';
import { useAPI } from '../../../contexts/APIProvider';
import SidebarOptions from './components/SidebarOptions';
import SidebarChatrooms from './components/SidebarChats';
import SidebarContacts from './components/SidebarContacts';

const chatroomsKey = 'chatrooms';
const contactsKey = 'contacts';

const Sidebar = () => {
  const [key, setKey] = useState(chatroomsKey);
  const { setToken } = useAPI();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('CHAT_Token');
    setToken(null);
  };

  return (
    <nav style={{ width: '250px' }} className="d-flex flex-column border justify-content-end">
      <section className="d-flex flex-column flex-grow-1">
        <Tabs activeKey={key} onSelect={(k) => setKey(k)}>
          <Tab eventKey={chatroomsKey} title="Chatrooms">
            <SidebarChatrooms />
          </Tab>
          <Tab eventKey={contactsKey} title="Contacts">
            <SidebarContacts />
          </Tab>
        </Tabs>
      </section>
      <SidebarOptions />
      <Button variant="outline" className="p-2 border-top rounded-0" onClick={handleLogout}>
        Logout
      </Button>
    </nav>
  );
};

export default Sidebar;
