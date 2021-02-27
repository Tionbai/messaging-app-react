import React, { useState } from 'react';
import {
  Box,
  List,
  Grid,
  Typography,
  ListItem,
  IconButton,
  makeStyles,
} from '@material-ui/core';
import { Person } from '@material-ui/icons/';
import { v4 as uuidv4 } from 'uuid';
import { useAPI } from '../../../../contexts/APIProvider';
import Searchfield from './components/Searchfield';
import OptionsValues from './OptionsValues';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    padding: (0, 10),
  },
  contact: {
    display: 'flex',
    flexDrection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    textTransform: 'none',
    padding: 10,
    width: '100%',
    height: 75,
  },
  contactIcon: {
    backgroundColor: 'white',
    border: '1px solid darkgrey',
  },
  contactTitle: {
    fontWeight: 'bold',
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
      <Box className={classes.root}>
        <Searchfield
          valueString="contacts"
          value={contacts}
          setFilteredValue={setFilteredContacts}
          values={values.contacts}
        />
      </Box>
      {filteredContacts &&
        filteredContacts.map((contact) => (
          <ListItem className={classes.contact} key={uuidv4()}>
            <Grid container spacing={1} alignItems="center" align="center">
              <Grid item alignSelf="center">
                <IconButton className={classes.contactIcon}>
                  <Person />
                </IconButton>
              </Grid>
              <Grid item direction="column" alignItems="flex-start">
                <Typography className={classes.contactTitle} variant="subtitle1">
                  {` ${contact.username}`}
                </Typography>
              </Grid>
            </Grid>
          </ListItem>
        ))}
    </List>
  );
};

export default Contacts;
