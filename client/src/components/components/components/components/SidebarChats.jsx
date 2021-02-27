import React, { useState } from 'react';
import {
  List,
  Box,
  Grid,
  makeStyles,
  IconButton,
  ListItem,
  Typography,
} from '@material-ui/core';
import { ForumOutlined } from '@material-ui/icons';
import { v4 as uuidv4 } from 'uuid';
import { useAPI } from '../../../../contexts/APIProvider';
import { useChat } from '../../../../contexts/ChatProvider';
import Searchfield from './components/Searchfield';
import OptionsValues from './OptionsValues';
import Options from './components/Options';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    padding: (0, 10),
  },
  chat: {
    display: 'flex',
    flexDrection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    textTransform: 'none',
    padding: 10,
    width: '100%',
    height: 75,
  },
  chatIcon: {
    backgroundColor: 'white',
    border: '1px solid darkgrey',
  },
  chatTitle: {
    fontWeight: 'bold',
  },
  chatPreview: {
    textTransform: 'none',
  },
  selected: { backgroundColor: '#e8f4fd' },
}));

const SidebarChats = () => {
  const classes = useStyles();
  const { chats } = useAPI();
  const { selectedChat, selectChat } = useChat();
  const [filteredChats, setFilteredChats] = useState();
  const values = OptionsValues();

  return (
    <List>
      <Box className={classes.root}>
        <Searchfield
          valueString="chats"
          value={chats}
          setFilteredValue={setFilteredChats}
          values={values.chats0}
        />
      </Box>
      {filteredChats &&
        filteredChats.map((chat, index) => {
          return (
            <ListItem
              className={`${classes.chat} ${
                filteredChats.indexOf(selectedChat) === index && classes.selected
              }`}
              onClick={() => selectChat(chat._id)}
              key={uuidv4()}
            >
              <Grid container justify="space-between" alignItems="center" align="center">
                <Grid item alignSelf="center">
                  <IconButton className={classes.chatIcon}>
                    <ForumOutlined />
                  </IconButton>
                </Grid>
                <Grid container item xs={6} direction="column" alignItems="flex-start">
                  <Typography className={classes.chatTitle} variant="subtitle1">
                    {` ${chat.name}`}
                  </Typography>
                  <Typography variant="body1" className={classes.chatPreview}>
                    {` ${chat.messages[chat.messages.length - 1].message}`}
                  </Typography>
                </Grid>
                <Grid item>
                  <Options values={values.chats1} />
                </Grid>
              </Grid>
            </ListItem>
          );
        })}
    </List>
  );
};

export default SidebarChats;
