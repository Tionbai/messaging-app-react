import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  Button,
  FormControl,
  OutlinedInput,
  Box,
  Fade,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import MenuDialogWithInputStyles from './styles/MenuDialogWithInputStyles';
import { useAPI } from '../../../contexts/APIProvider';

const MenuDialogWithInput = ({ dialogWithInputOpen, setDialogWithInputOpen, values }) => {
  const [inputValue, setInputValue] = useState('');
  const classes = MenuDialogWithInputStyles();
  const { APIError, setAPIError } = useAPI();

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

  useEffect(() => {
    setAPIError();
  }, []);

  return (
    <Dialog open={dialogWithInputOpen} onClose={handleDialogClose}>
      <Box className={classes.root}>
        <DialogTitle>{values.title}</DialogTitle>
        {APIError &&
          APIError.map((error) => {
            return (
              <Fade in={Boolean(APIError)}>
                <Alert severity="error" className={classes.alert}>
                  {error.message || error}
                </Alert>
              </Fade>
            );
          })}
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
