import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  Button,
  FormControl,
  OutlinedInput,
  Box,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    minWidth: '25rem',
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    '& > *': { padding: '1.5rem' },
  },
  formControl: { padding: '0.75rem' },
  buttons: {
    display: 'flex',
    justifyContent: 'space-evenly',
  },
}));

const MenuDialogWithInput = ({ dialogWithInputOpen, setDialogWithInputOpen, values }) => {
  const [inputValue, setInputValue] = useState('');
  const classes = useStyles();

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
      <Box className={classes.root}>
        <DialogTitle>{values.title}</DialogTitle>
        <FormControl className={classes.formControl} onSubmit={handleSubmit}>
          <OutlinedInput placeholder={values.placeholder} onChange={handleChange} />
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

export default MenuDialogWithInput;

MenuDialogWithInput.propTypes = {
  dialogWithInputOpen: PropTypes.bool.isRequired,
  setDialogWithInputOpen: PropTypes.func.isRequired,
  values: Object(PropTypes.object).isRequired,
};
