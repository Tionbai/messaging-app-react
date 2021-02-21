import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import { useAPI } from '../../../../contexts/APIProvider';
import { useChat } from '../../../../contexts/ChatProvider';

const SidebarChats = () => {
  const { chats } = useAPI();
  const { selectChat } = useChat();

  return (
    <ListGroup variant="flush">
      {chats &&
        chats.map((chat) => {
          return (
            <ListGroup.Item
              className="p-2 border-right-0"
              key={uuidv4()}
              action
              active={chat.selected}
              onClick={() => selectChat(chat._id)}
            >
              Room:
              {` ${chat.name}`}
            </ListGroup.Item>
          );
        })}
    </ListGroup>
  );
};

export default SidebarChats;
