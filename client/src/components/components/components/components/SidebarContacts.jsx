import React from 'react';
import { List, Button } from '@material-ui/core';
import { useAPI } from '../../../../contexts/APIProvider';

const Contacts = () => {
  const { contacts } = useAPI();

  return (
    <List>
      {contacts.map((contact) => (
        <Button key={contact.username}>
          {contact._id}
          <br />
          {contact.username}
        </Button>
      ))}
    </List>
  );
};

export default Contacts;
