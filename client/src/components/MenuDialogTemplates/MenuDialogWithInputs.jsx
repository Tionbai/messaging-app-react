import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContentText,
  Button,
  FormControl,
  OutlinedInput,
  Box,
  makeStyles,
} from '@material-ui/core';
import { useUser } from '../../contexts/UserProvider';

const useStyles = makeStyles(() => ({
  root: {
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

const MenuDialogWithInputs = ({ dialogWithInputsOpen, setDialogWithInputsOpen, values }) => {
  const { user } = useUser();
  const [inputValue, setInputValue] = useState('');
  const classes = useStyles();

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
      <Box className={classes.root}>
        <DialogTitle>{values.title}</DialogTitle>
        <DialogContentText>{values.content}</DialogContentText>
        {values.placeholder.map((placeholder, index) => {
          return (
            <FormControl
              key={values.title.charAt(index)}
              className={classes.formControl}
              onSubmit={handleSubmit}
            >
              <OutlinedInput
                defaultValue={
                  values.title === 'Delete account' && index === 0 ? user.username : ''
                }
                placeholder={placeholder}
                onChange={handleChange}
                name={index.toString()}
              />
            </FormControl>
          );
        })}
        <Box className={classes.buttons}>
          <Button color="primary" onClick={handleSubmit}>
            Submit
          </Button>
          <Button variant="contained" color="primary" onClick={handleDialogClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default MenuDialogWithInputs;

MenuDialogWithInputs.propTypes = {
  dialogWithInputsOpen: PropTypes.bool.isRequired,
  setDialogWithInputsOpen: PropTypes.func.isRequired,
  values: Object(PropTypes.object).isRequired,
};
