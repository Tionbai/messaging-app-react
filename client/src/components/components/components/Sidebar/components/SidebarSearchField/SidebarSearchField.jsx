import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, IconButton, InputBase, Divider, makeStyles } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { useAPI } from '../../../../../../contexts/APIProvider';
import { useChat } from '../../../../../../contexts/ChatProvider';
import SidebarSearchFieldMenu from './components/SidebarSearchFieldMenu';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '10px 10px 0px 10px',
    padding: '2px 10px',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'white',
    border: '1px solid lightgrey',
    borderRadius: '30px',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function SidebarSearchField({
  valueString,
  setFilteredChats,
  setFilteredContacts,
  search,
  setSearch,
}) {
  const classes = useStyles();
  const { contacts } = useAPI();
  const { formattedChats } = useChat();

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const filterSidebar = (searchValue) => {
    const filteredChats = formattedChats.filter((chat) =>
      chat.name.toLowerCase().includes(searchValue.toLowerCase()),
    );
    const filteredContacts = contacts.filter((contact) =>
      contact.username.toLowerCase().includes(search.toLowerCase()),
    );
    setFilteredChats(filteredChats);
    setFilteredContacts(filteredContacts);
  };

  useEffect(() => {
    if (search) {
      filterSidebar(search);
    } else {
      setFilteredChats(formattedChats);
      setFilteredContacts(null);
    }
  }, [search]);
  return (
    <Box component="form" className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder={`Search ${valueString}`}
        value={search || ''}
        onChange={handleSearch}
      />
      <IconButton type="submit" className={classes.iconButton} aria-label="search">
        <Search />
      </IconButton>
      <Divider className={classes.divider} orientation="vertical" />
      <SidebarSearchFieldMenu />
    </Box>
  );
}

SidebarSearchField.propTypes = {
  valueString: PropTypes.string.isRequired,
  setFilteredChats: PropTypes.func.isRequired,
  setFilteredContacts: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,
};
