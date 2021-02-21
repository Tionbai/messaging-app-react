import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { useAPI } from '../../../../contexts/APIProvider';

const Contacts = () => {
  const { contacts } = useAPI();

  return (
    <ListGroup variant="flush">
      {contacts.map((contact) => (
        <ListGroup.Item key={contact.username}>{contact.username}</ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default Contacts;
