import React, { useState, useRef } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { useConversations } from '../../../contexts/ConversationsProvider';
import OpenMessage from './components/OpenMessage';

const OpenConversation = () => {
  const [text, setText] = useState('');
  const { sendMessage, selectedConversation } = useConversations();

  const messageRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send message to the recipient(s) in the conversation.
    sendMessage(
      selectedConversation.recipients.map((recipient) => recipient.username),
      text,
    );
    setText('');
  };

  // Handle user pressing enter to send message (need for 'textarea').
  const handleShiftEnter = (e) => {
    if (e.key === 'Enter' && e.shiftKey === false) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Display and format conversation based on sender and recipient.
  return (
    <section className="d-flex flex-column flex-grow-1">
      <section className="flex-grow-1 overflow-auto">
        <div className="min-vh-100 d-flex flex-column justify-content-end px-3">
          {selectedConversation.messages.map((message, index) => {
            const lastMessage = selectedConversation.messages.length - 1 === index;
            return (
              <OpenMessage
                message={message}
                lastMessage={lastMessage}
                key={(message.messages && message.messages[0].id) || null}
                ref={messageRef}
              />
            );
          })}
        </div>
      </section>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="m-2">
          <InputGroup>
            <Form.Control
              as="textarea"
              required
              value={text}
              onChange={(e) => setText(e.target.value)}
              style={{ height: '75px', resize: 'none' }}
              onKeyDown={handleShiftEnter}
            />
            <InputGroup.Append>
              <Button type="submit">Send</Button>
            </InputGroup.Append>
          </InputGroup>
        </Form.Group>
      </Form>
    </section>
  );
};

export default OpenConversation;
