import React, { useState } from 'react';
import { Box } from '@material-ui/core';
import { useContacts } from '../../../../contexts/ContactsProvider';
import { useChat } from '../../../../contexts/ChatProvider';
import SidebarChats from './components/SidebarChats/SidebarChats';
import SidebarContacts from './components/SidebarContacts/SidebarContacts';
import SidebarSearchField from './components/SidebarSearchField/SidebarSearchField';
import SidebarStyles from './styles/SidebarStyles';

const Sidebar = () => {
  const classes = SidebarStyles();
  const { contacts } = useContacts();
  const { formattedChats } = useChat();
  const [filteredChats, setFilteredChats] = useState(formattedChats);
  const [filteredContacts, setFilteredContacts] = useState(contacts);
  const [search, setSearch] = useState('');

  return (
    <Box className={classes.root}>
      <Box className={classes.searchfield}>
        <SidebarSearchField
          valueString="chats"
          setFilteredChats={setFilteredChats}
          setFilteredContacts={setFilteredContacts}
          search={search}
          setSearch={setSearch}
        />
      </Box>
      <SidebarChats
        classes={classes}
        search={search}
        filteredChats={filteredChats}
        setSearch={setSearch}
      />
      {filteredContacts && (
        <SidebarContacts
          classes={classes}
          search={search}
          filteredContacts={filteredContacts}
          setSearch={setSearch}
        />
      )}
    </Box>
  );
};

export default Sidebar;
