import React, { useState } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { useChatroom } from '../../../contexts/ChatroomProvider';

const Chatroom = () => {
  const [text, setText] = useState('');
  const { sendMessage } = useChatroom();

  const handleSubmit = (e) => {
    e.preventDefault();

    sendMessage();
    setText('');
  };

  // Display and format conversation based on sender and recipient.
  return (
    <section className="d-flex flex-column flex-grow-1">
      <section className="m-2 flex-grow-1">Chatroom section</section>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="m-2">
          <InputGroup>
            <Form.Control
              as="textarea"
              required
              value={text}
              onChange={(e) => setText(e.target.value)}
              style={{ height: '75px', resize: 'none' }}
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

export default Chatroom;
