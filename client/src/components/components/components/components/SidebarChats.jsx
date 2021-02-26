import React, { useState } from 'react';
import { Box, List, Button, makeStyles } from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';
import { useAPI } from '../../../../contexts/APIProvider';
import { useChat } from '../../../../contexts/ChatProvider';
import Search from './components/Search';
import Options from './components/Options';
import OptionsValues from './OptionsValues';

const useStyles = makeStyles((theme) => ({
  selected: { color: theme.palette.primary.main },
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
        <Search valueString="chats" value={chats} setFilteredValue={setFilteredChats} />
        <Options values={values.chats} />
      </Box>
      {filteredChats &&
        filteredChats.map((chat, index) => {
          return (
            <Button
              className={filteredChats.indexOf(selectedChat) === index && classes.selected}
              style={{ width: '100%', height: 50, marginTop: 10 }}
              variant="outlined"
              // variant={
              //   filteredChats.indexOf(selectedChat[0]) === index ? 'contained' : 'outlined'
              // }
              key={uuidv4()}
              onClick={() => selectChat(chat._id)}
            >
              {` ${chat.name}`}
            </Button>
          );
        })}
    </List>
  );
};

export default SidebarChats;
