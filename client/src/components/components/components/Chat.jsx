import React, { useState, useEffect, useRef } from 'react';
import { Form, InputGroup, ListGroup, Button } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import { useChat } from '../../../contexts/ChatProvider';

const Chat = () => {
  const [text, setText] = useState('');
  const { sendMessage, selectedChat, filteredMessages } = useChat();
  const lastMessageRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    sendMessage(text);
    setText('');
  };

  // Handle user pressing enter to send message (need for 'textarea').
  const handleShiftEnter = (e) => {
    if (e.key === 'Enter' && e.shiftKey === false) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // When new message is sent, scroll down to last message.
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ smooth: true });
    }
  }, [lastMessageRef, filteredMessages]);

  // Display and format conversation based on sender and recipient.
  return (
    <section className="d-flex flex-column flex-grow-1">
      <section className="m-2 flex-grow-1 overflow-auto">
        <h2>{selectedChat[0].name}</h2>
        <p>{selectedChat[0]._id}</p>
        <ListGroup className="d-flex flex-column">
          {filteredMessages.map((message, index) => {
            const lastMessage = filteredMessages.length - 1 === index;
            return (
              <ListGroup.Item
                className="my-1 border"
                key={uuidv4()}
                ref={lastMessage ? lastMessageRef : null}
              >
                {message._id}
                <br />
                {message.message}
              </ListGroup.Item>
            );
          })}
        </ListGroup>
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

export default Chat;
