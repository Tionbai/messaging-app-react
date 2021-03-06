import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, Button, FormControl, InputBase } from '@material-ui/core';

const MenuDialogWithInputs = ({ dialogWithInputsOpen, setDialogWithInputsOpen, values }) => {
  const [inputValue, setInputValue] = useState('');

  const handleDialogClose = () => {
    setDialogWithInputsOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const funcParams = [];
    Object.entries(inputValue).map((entry) => {
      return funcParams.push(entry[1]);
    });
    values.submitFunc(...funcParams);
  };

  const handleChange = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  return (
    <Dialog open={dialogWithInputsOpen} onClose={handleDialogClose}>
      <DialogTitle>{values.title}</DialogTitle>
      {values.placeholder.map((placeholder, index) => {
        return (
          <FormControl onSubmit={handleSubmit}>
            <InputBase placeholder={placeholder} onChange={handleChange} name={index} />
          </FormControl>
        );
      })}
      <Button onClick={handleSubmit}>Yes</Button>
      <Button onClick={handleDialogClose}>Cancel</Button>
    </Dialog>
  );
};

export default MenuDialogWithInputs;

MenuDialogWithInputs.propTypes = {
  dialogWithInputsOpen: PropTypes.func.isRequired,
  setDialogWithInputsOpen: PropTypes.func.isRequired,
  values: Object(PropTypes.object).isRequired,
  submitFunc: PropTypes.func.isRequired,
};
