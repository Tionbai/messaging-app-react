import React, { useState } from 'react';
import { Box, List, Button } from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';
import { useAPI } from '../../../../contexts/APIProvider';
import Search from './Search';
import Options from './Options';
import OptionsValues from './OptionsValues';

const Contacts = () => {
  const { contacts } = useAPI();
  const [filteredContacts, setFilteredContacts] = useState();
  const values = OptionsValues();

  return (
    <List>
      <Box style={{ display: 'flex', padding: (0, 10) }}>
        <Search
          valueString="contacts"
          value={contacts}
          setFilteredValue={setFilteredContacts}
        />
        <Options values={values.contacts} />
      </Box>
      {filteredContacts &&
        filteredContacts.map((contact) => (
          <Button
            style={{ width: '100%', height: 50, marginTop: 10 }}
            variant="outlined"
            key={uuidv4()}
          >
            {contact._id}
            <br />
            {contact.username}
          </Button>
        ))}
    </List>
  );
};

export default Contacts;
