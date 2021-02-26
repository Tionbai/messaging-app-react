import React, { useState } from 'react';
import { List, Box, Grid, makeStyles, Button, Typography } from '@material-ui/core';
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
    flexDrection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    textTransform: 'none',
    padding: 10,
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
      <Box style={{ display: 'flex', padding: (0, 10) }}>
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
            <Button
              className={`${classes.root} ${
                filteredChats.indexOf(selectedChat) === index && classes.selected
              }`}
              style={{ width: '100%', height: 75 }}
              onClick={() => selectChat(chat._id)}
              key={uuidv4()}
            >
              <Grid container alignItems="center" align="center" style={{ width: '100%' }}>
                <Grid item alignSelf="center">
                  <ForumOutlined style={{ marginRight: '1.5rem' }} />
                </Grid>
                <Grid container item xs={7} direction="column" alignItems="flex-start">
                  <Typography
                    style={{ color: '#2979ff', fontWeight: 'bold' }}
                    variant="subtitle1"
                  >
                    {` ${chat.name}`}
                  </Typography>
                  <Typography variant="body1" style={{ textTransform: 'lowercase' }}>
                    {` ${chat.messages[chat.messages.length - 1].message}`}
                  </Typography>
                </Grid>
                <Grid item>
                  <Options values={values.chats1} />
                </Grid>
              </Grid>
            </Button>
          );
        })}
    </List>
  );
};

export default SidebarChats;
