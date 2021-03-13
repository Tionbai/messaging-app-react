import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, IconButton, InputBase, Divider } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { useContacts } from '../../../../../../contexts/ContactsProvider';
import { useChat } from '../../../../../../contexts/ChatProvider';
import SidebarSearchFieldMenu from './components/SidebarSearchFieldMenu/SidebarSearchFieldMenu';
import SidebarSearchFieldStyles from './styles/SidebarSearchFieldStyles';

const SidebarSearchField = ({
  valueString,
  setFilteredChats,
  setFilteredContacts,
  search,
  setSearch,
}) => {
  const classes = SidebarSearchFieldStyles();
  const { contacts } = useContacts();
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
};

export default SidebarSearchField;

SidebarSearchField.propTypes = {
  valueString: PropTypes.string.isRequired,
  setFilteredChats: PropTypes.func.isRequired,
  setFilteredContacts: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,
};
