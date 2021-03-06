import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, Button } from '@material-ui/core';

const MenuDialog = ({ dialogOpen, setDialogOpen, values, chat }) => {
  const handleDialogClose = () => {
    console.log(dialogOpen);
    setDialogOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    values.submitFunc(chat.name);
  };

  return (
    <Dialog open={dialogOpen} onClose={handleDialogClose}>
      <DialogTitle>{values.title}</DialogTitle>
      <Button onClick={handleSubmit}>Yes</Button>
      <Button onClick={handleDialogClose}>Cancel</Button>
    </Dialog>
  );
};

export default MenuDialog;

MenuDialog.propTypes = {
  dialogOpen: PropTypes.func.isRequired,
  setDialogOpen: PropTypes.func.isRequired,
  values: Object(PropTypes.object).isRequired,
  submitFunc: PropTypes.func.isRequired,
  chat: Object(PropTypes.object).isRequired,
};
