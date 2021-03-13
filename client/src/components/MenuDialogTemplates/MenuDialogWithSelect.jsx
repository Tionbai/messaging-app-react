import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContentText,
  Button,
  makeStyles,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import { useContacts } from '../../contexts/ContactsProvider';

const useStyles = makeStyles(() => ({
  root: {
    minWidth: '30rem',
    maxWidth: '100%',
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    '& > * + *': { margin: '1.5rem' },
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-evenly',
  },
}));

const MenuDialogWithSelect = ({
  dialogWithSelectOpen,
  selectedContacts,
  setSelectedContacts,
  setDialogWithSelectOpen,
  values,
  chat,
}) => {
  const { contacts } = useContacts();
  const classes = useStyles();

  const handleChange = (e) => {
    e.preventDefault();
    setSelectedContacts(e.target.value);
  };

  const handleDialogClose = () => {
    setDialogWithSelectOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    selectedContacts.map((selectedContact) => {
      return values.submitFunc(chat.name, selectedContact);
    });
    setDialogWithSelectOpen(false);
  };

  return (
    <Dialog open={dialogWithSelectOpen} onClose={handleDialogClose}>
      <Box className={classes.root}>
        <DialogTitle>{values.title}</DialogTitle>
        <DialogContentText>{values.content}</DialogContentText>
        <FormControl variant="outlined">
          <InputLabel id="select-label">Select contact</InputLabel>
          <Select
            multiple
            labelId="select-label"
            value={selectedContacts}
            onChange={handleChange}
            label="Select contact"
          >
            {contacts.map((contact) => {
              return (
                <MenuItem key={contact.username} value={contact.username}>
                  {contact.username}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
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

export default MenuDialogWithSelect;

MenuDialogWithSelect.propTypes = {
  dialogWithSelectOpen: PropTypes.bool.isRequired,
  setDialogWithSelectOpen: PropTypes.func.isRequired,
  values: Object(PropTypes.object).isRequired,
  selectedContacts: Object(PropTypes.array).isRequired,
  setSelectedContacts: PropTypes.func.isRequired,
  chat: Object(PropTypes.object).isRequired,
};
