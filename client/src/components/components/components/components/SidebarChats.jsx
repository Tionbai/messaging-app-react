import React from 'react';
import { List, Button } from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';
import { useAPI } from '../../../../contexts/APIProvider';
import { useChat } from '../../../../contexts/ChatProvider';

const SidebarChats = () => {
  const { chats } = useAPI();
  const { selectChat } = useChat();

  return (
    <List>
      {chats &&
        chats.map((chat) => {
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
