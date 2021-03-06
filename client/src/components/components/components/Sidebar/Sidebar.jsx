import React, { useState } from 'react';
import { Box, makeStyles } from '@material-ui/core';
import { useContacts } from '../../../../contexts/ContactsProvider';
import { useChat } from '../../../../contexts/ChatProvider';
import SidebarChats from './components/SidebarChats/SidebarChats';
import SidebarContacts from './components/SidebarContacts/SidebarContacts';
import SidebarSearchField from './components/SidebarSearchField/SidebarSearchField';

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 350,
  },
  searchfield: {
    height: 75,
    display: 'flex',
    alignItems: 'center',
  },
  common: {
    textTransform: 'none',
    height: 90,
    borderBottom: '1px solid lightgrey',
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    color: 'dimgrey',
  },
  icon: {
    backgroundColor: 'white',
    border: '1px solid darkgrey',
  },
  subtitle: {
    fontWeight: 'bold',
  },
  selected: { backgroundColor: '#e8f4fd' },
  first: { borderTop: '1px solid lightgrey' },
}));

const Sidebar = () => {
  const classes = useStyles();
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
