import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import { useConversations } from '../../../../contexts/ConversationsProvider';

const Conversations = () => {
  const { conversations, selectConversationIndex } = useConversations();

  return (
    <ListGroup variant="flush">
      {conversations.map((conversation, index) => (
        <ListGroup.Item
          key={uuidv4()}
          action
          active={conversation.selected}
          onClick={() => selectConversationIndex(index)}
        >
          {conversation.recipients.map((recipient) => recipient.name).join(', ')}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default Conversations;
