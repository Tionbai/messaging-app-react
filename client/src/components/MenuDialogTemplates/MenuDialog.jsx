import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContentText,
  Button,
  Box,
  makeStyles,
} from '@material-ui/core';

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

const MenuDialog = ({ dialogOpen, setDialogOpen, values, chat }) => {
  const classes = useStyles();
  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    values.submitFunc(chat.name);
  };

  return (
    <Dialog open={dialogOpen} onClose={handleDialogClose}>
      <Box className={classes.root}>
        <DialogTitle>{values.title}</DialogTitle>
        <DialogContentText>{values.content}</DialogContentText>
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

export default MenuDialog;

MenuDialog.propTypes = {
  dialogOpen: PropTypes.func.isRequired,
  setDialogOpen: PropTypes.func.isRequired,
  values: Object(PropTypes.object).isRequired,
  submitFunc: PropTypes.func.isRequired,
  chat: Object(PropTypes.object).isRequired,
};
