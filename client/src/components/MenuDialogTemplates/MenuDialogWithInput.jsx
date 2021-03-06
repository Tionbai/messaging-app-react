import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, Button, FormControl, InputBase } from '@material-ui/core';

const MenuDialogWithInput = ({ dialogWithInputOpen, setDialogWithInputOpen, values }) => {
  const [inputValue, setInputValue] = useState('');

  const handleDialogClose = () => {
    setDialogWithInputOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    values.submitFunc(inputValue);
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <Dialog open={dialogWithInputOpen} onClose={handleDialogClose}>
      <DialogTitle>{values.title}</DialogTitle>
      <FormControl onSubmit={handleSubmit}>
        <InputBase placeholder={values.placeholder} onChange={handleChange} />
        <Button onClick={handleSubmit}>Yes</Button>
      </FormControl>
      <Button onClick={handleDialogClose}>Cancel</Button>
    </Dialog>
  );
};

export default MenuDialogWithInput;

MenuDialogWithInput.propTypes = {
  dialogWithInputOpen: PropTypes.func.isRequired,
  setDialogWithInputOpen: PropTypes.func.isRequired,
  values: Object(PropTypes.object).isRequired,
  submitFunc: PropTypes.func.isRequired,
};
