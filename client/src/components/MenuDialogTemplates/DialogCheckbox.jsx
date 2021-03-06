import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Checkbox, FormControlLabel, ListItem } from '@material-ui/core';

const MenuDialogWithCheckbox = ({ contact, selectedContacts, setSelectedContacts }) => {
  const [selectedContact, setSelectedContact] = useState({ [contact.username]: false });

  const handleChange = (e) => {
    e.stopPropagation();
    setSelectedContact({ ...selectedContact, [contact.username]: e.target.checked });
    setSelectedContacts(() => {
      const previous = selectedContacts.filter((prev) => {
        return prev !== contact.username;
      });
      return [...previous, contact.username];
    });
  };

  return (
    <ListItem button>
      <FormControlLabel
        control={
          // eslint-disable-next-line react/jsx-wrap-multilines
          <Checkbox checked={selectedContact[contact.username]} onClick={handleChange} />
        }
        label={contact.username}
        name={contact.username}
      />
    </ListItem>
  );
};

export default MenuDialogWithCheckbox;

MenuDialogWithCheckbox.propTypes = {
  contact: Object(PropTypes.object).isRequired,
  selectedContacts: Object(PropTypes.array).isRequired,
  setSelectedContacts: PropTypes.func.isRequired,
};
