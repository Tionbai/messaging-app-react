import React, { useState } from 'react';
import { Box, List, Button } from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';
import { useAPI } from '../../../../contexts/APIProvider';
import { useChat } from '../../../../contexts/ChatProvider';
import SidebarOptions from './SidebarOptions';
import Search from './Search';

const SidebarChats = () => {
  const { chats } = useAPI();
  const { selectChat } = useChat();
  const [filteredChats, setFilteredChats] = useState();

  return (
    <List>
      <Box style={{ display: 'flex' }}>
        <Search valueString="chats" value={chats} setFilteredValue={setFilteredChats} />
      </Box>
      <SidebarOptions />
      {filteredChats &&
        filteredChats.map((chat) => {
          return (
            <Button
              style={{ width: '100%' }}
              variant="outlined"
              key={uuidv4()}
              onClick={() => selectChat(chat._id)}
            >
              Room:
              {` ${chat.name}`}
            </Button>
          );
        })}
    </List>
  );
};

export default SidebarChats;
