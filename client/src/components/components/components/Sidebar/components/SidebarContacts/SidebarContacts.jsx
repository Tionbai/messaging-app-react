import React from 'react';
import PropTypes from 'prop-types';
import { List, Grid, Typography, ListItem, IconButton } from '@material-ui/core';
import { Person } from '@material-ui/icons/';
import { v4 as uuidv4 } from 'uuid';
import SidebarContactsMenu from './components/SidebarContactsMenu';
import { useChat } from '../../../../../../contexts/ChatProvider';

const Contacts = ({ classes, filteredContacts, search, setSearch }) => {
  const { newMessage, formattedChats, setSelectedChat } = useChat();

  const handleClick = (e) => {
    e.preventDefault();

    filteredContacts.map((contact) => {
      const chatWithContact = formattedChats.find((chat) => {
        return chat.privateChatName === contact.username;
      });
      if (chatWithContact) setSelectedChat(chatWithContact);
      return newMessage(contact.username, contact._id);
    });
    setSearch('');
  };

  return (
    <List>
      {search && (
        <Typography variant="h6" className={classes.title}>
          CONTACTS
        </Typography>
      )}
      {filteredContacts.map((contact, index) => (
        <ListItem
          className={`${classes.common} ${index === 0 && classes.first}`}
          key={uuidv4()}
          onClick={(e) => handleClick(e)}
        >
          <Grid container spacing={1} alignItems="center" align="center">
            <Grid item>
              <IconButton className={classes.icon}>
                <Person />
              </IconButton>
            </Grid>
            <Grid item>
              <Typography className={classes.subtitle} variant="subtitle1">
                {` ${contact.username}`}
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <SidebarContactsMenu
              newMessage={() => newMessage(contact.username, contact._id)}
            />
          </Grid>
        </ListItem>
      ))}
    </List>
  );
};

export default Contacts;

Contacts.propTypes = {
  classes: Object(PropTypes.object).isRequired,
  filteredContacts: Object(PropTypes.array).isRequired,
  search: PropTypes.string,
  setSearch: PropTypes.func.isRequired,
};

Contacts.defaultProps = {
  search: PropTypes.string,
};
