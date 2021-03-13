import React from 'react';
import PropTypes from 'prop-types';
import { List, Grid, IconButton, ListItem, Typography } from '@material-ui/core';
import { ForumOutlined, Person } from '@material-ui/icons';
import { v4 as uuidv4 } from 'uuid';
import { useChat } from '../../../../../../contexts/ChatProvider';
import SidebarChatsMenu from './components/SidebarChatsMenu/SidebarChatsMenu';

const SidebarChats = ({ classes, filteredChats, search, setSearch }) => {
  const { selectedChat, setSelectedChat } = useChat();

  const handleClick = (e, chat) => {
    e.preventDefault();
    setSelectedChat(chat);
    setSearch('');
  };

  return (
    <List>
      {search && (
        <Typography variant="h6" className={classes.title}>
          CHATS
        </Typography>
      )}
      {filteredChats.map((chat, index) => {
        return (
          <ListItem
            className={`${classes.common} ${
              chat._id === selectedChat._id && classes.selected
            } ${index === 0 && classes.first}`}
            onClick={(e) => handleClick(e, chat)}
            key={uuidv4()}
          >
            <Grid container justify="space-between" alignItems="center" align="center">
              <Grid item>
                <IconButton className={classes.icon}>
                  {chat.private ? <Person /> : <ForumOutlined />}
                </IconButton>
              </Grid>
              <Grid container item xs={7} direction="column" alignItems="flex-start">
                <Typography className={classes.subtitle} variant="subtitle1">
                  {chat.privateChatName ? chat.privateChatName : chat.name}
                </Typography>
                {chat.messages.length ? (
                  <Typography variant="body1">
                    {chat.messages[chat.messages.length - 1].message}
                  </Typography>
                ) : null}
              </Grid>
              <Grid item>
                <SidebarChatsMenu chat={chat} />
              </Grid>
            </Grid>
          </ListItem>
        );
      })}
    </List>
  );
};

export default SidebarChats;

SidebarChats.propTypes = {
  classes: Object(PropTypes.object).isRequired,
  filteredChats: Object(PropTypes.array).isRequired,
  search: PropTypes.string,
  setSearch: PropTypes.func.isRequired,
};

SidebarChats.defaultProps = {
  search: PropTypes.string,
};
