import React, { useState } from 'react';
import { Box, List, Grid, Typography, Button, makeStyles } from '@material-ui/core';
import { Person } from '@material-ui/icons/';
import { v4 as uuidv4 } from 'uuid';
import { useAPI } from '../../../../contexts/APIProvider';
import Searchfield from './components/Searchfield';
import OptionsValues from './OptionsValues';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDrection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    textTransform: 'none',
    padding: 10,
  },
  selected: { backgroundColor: '#e8f4fd' },
}));

const Contacts = () => {
  const classes = useStyles();
  const { contacts } = useAPI();
  const [filteredContacts, setFilteredContacts] = useState();
  const values = OptionsValues();

  return (
    <List>
      <Box style={{ display: 'flex', padding: (0, 10) }}>
        <Searchfield
          valueString="contacts"
          value={contacts}
          setFilteredValue={setFilteredContacts}
          values={values.contacts}
        />
      </Box>
      {filteredContacts &&
        filteredContacts.map((contact) => (
          <Button
            className={classes.root}
            style={{ width: '100%', height: 75 }}
            key={uuidv4()}
          >
            <Grid container alignItems="center" align="center" style={{ width: '100%' }}>
              <Grid item alignSelf="center">
                <Person style={{ marginRight: '1.5rem' }} />
              </Grid>
              <Grid container item xs={7} direction="column" alignItems="flex-start">
                <Typography
                  style={{ color: '#2979ff', fontWeight: 'bold' }}
                  variant="subtitle1"
                >
                  {` ${contact.username}`}
                </Typography>
              </Grid>
            </Grid>
          </Button>
        ))}
    </List>
  );
};

export default Contacts;
