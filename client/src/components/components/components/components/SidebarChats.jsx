import React, { useState } from 'react';
import { Box, List, Button } from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';
import { useAPI } from '../../../../contexts/APIProvider';
import { useChat } from '../../../../contexts/ChatProvider';
import Search from './Search';
import Options from './Options';
import OptionsValues from './OptionsValues';

const SidebarChats = () => {
  const { chats } = useAPI();
  const { selectChat } = useChat();
  const [filteredChats, setFilteredChats] = useState();
  const values = OptionsValues();

  return (
    <List>
      <Box style={{ display: 'flex', padding: (0, 10) }}>
        <Search valueString="chats" value={chats} setFilteredValue={setFilteredChats} />
        <Options values={values.chats} />
      </Box>
      {filteredChats &&
        filteredChats.map((chat) => {
          return (
            <Button
              style={{ width: '100%', height: 50, marginTop: 10 }}
              variant="outlined"
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
