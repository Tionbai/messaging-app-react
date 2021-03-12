import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContentText,
  List,
  Button,
  makeStyles,
  Box,
} from '@material-ui/core';
import { useContacts } from '../../contexts/ContactsProvider';
import DialogCheckbox from './DialogCheckbox';

const useStyles = makeStyles(() => ({
  root: {
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    '& > *': { padding: '1.5rem' },
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-evenly',
  },
}));

const MenuDialogWithCheckbox = ({
  dialogWithCheckboxOpen,
  selectedContacts,
  setSelectedContacts,
  setDialogWithCheckboxOpen,
  values,
  chat,
}) => {
  const { contacts } = useContacts();
  const classes = useStyles();

  const handleDialogClose = () => {
    setDialogWithCheckboxOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    selectedContacts.map((selectedContact) => {
      return values.submitFunc(chat.name, selectedContact);
    });
    setDialogWithCheckboxOpen(false);
  };

  return (
    <Dialog open={dialogWithCheckboxOpen} onClose={handleDialogClose}>
      <Box className={classes.root}>
        <DialogTitle>{values.title}</DialogTitle>
        <DialogContentText>{values.content}</DialogContentText>
        <List>
          {contacts.map((contact) => {
            return (
              <DialogCheckbox
                key={contact.username}
                contact={contact}
                selectedContacts={selectedContacts}
                setSelectedContacts={setSelectedContacts}
              />
            );
          })}
        </List>
        <Box className={classes.buttons}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
          <Button color="primary" onClick={handleDialogClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default MenuDialogWithCheckbox;

MenuDialogWithCheckbox.propTypes = {
  dialogWithCheckboxOpen: PropTypes.bool.isRequired,
  setDialogWithCheckboxOpen: PropTypes.func.isRequired,
  values: Object(PropTypes.object).isRequired,
  selectedContacts: Object(PropTypes.array).isRequired,
  setSelectedContacts: PropTypes.func.isRequired,
  chat: Object(PropTypes.object).isRequired,
};
