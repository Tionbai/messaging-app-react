import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import { useAPI } from '../../../../contexts/APIProvider';
import { useChatroom } from '../../../../contexts/ChatroomProvider';

const SidebarChatrooms = () => {
  const { chatrooms } = useAPI();
  const { selectChatroom } = useChatroom();

  return (
    <ListGroup variant="flush">
      {chatrooms &&
        chatrooms.map((chatroom) => {
          return (
            <ListGroup.Item
              className="p-2 border-right-0"
              key={uuidv4()}
              action
              active={chatroom.selected}
              onClick={() => selectChatroom(chatroom._id)}
            >
              Room:
              {` ${chatroom.name}`}
            </ListGroup.Item>
          );
        })}
    </ListGroup>
  );
};

export default SidebarChatrooms;
