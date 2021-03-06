import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, List, Button } from '@material-ui/core';
import { useContacts } from '../../contexts/ContactsProvider';
import DialogCheckbox from './DialogCheckbox';

const MenuDialogWithCheckbox = ({
  dialogWithCheckboxOpen,
  selectedContacts,
  setSelectedContacts,
  setDialogWithCheckboxOpen,
  values,
  chat,
}) => {
  const { contacts } = useContacts();

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
      <DialogTitle>{values.title}</DialogTitle>
      <List>
        {contacts.map((contact) => {
          return (
            <DialogCheckbox
              contact={contact}
              selectedContacts={selectedContacts}
              setSelectedContacts={setSelectedContacts}
            />
          );
        })}
      </List>
      <Button onClick={handleSubmit}>Yes</Button>
      <Button onClick={handleDialogClose}>Cancel</Button>
    </Dialog>
  );
};

export default MenuDialogWithCheckbox;

MenuDialogWithCheckbox.propTypes = {
  dialogWithCheckboxOpen: PropTypes.func.isRequired,
  setDialogWithCheckboxOpen: PropTypes.func.isRequired,
  values: Object(PropTypes.object).isRequired,
  selectedContacts: Object(PropTypes.array).isRequired,
  setSelectedContacts: PropTypes.func.isRequired,
  chat: Object(PropTypes.object).isRequired,
};
