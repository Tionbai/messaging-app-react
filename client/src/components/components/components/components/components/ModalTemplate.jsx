import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Paper, TextField, Box, Button, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: theme.palette.background.paper,
  },
  form: {
    width: 400,
    height: 300,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: theme.spacing(1),
  },
  buttons: {
    width: '80%',
    display: 'flex',
    justifyContent: 'space-evenly',
  },
}));

const ModalTemplate = React.forwardRef((props, ref) => {
  const classes = useStyles();
  const { value, setActiveModal } = props;
  const { headerString, labelString, labelString2, submitFunc } = value;
  const inputRef = useRef();
  const inputRef2 = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (labelString2) {
      submitFunc(inputRef.current.value, inputRef2.current.value);
    } else {
      submitFunc(inputRef.current.value);
    }
    setActiveModal(false);
  };

  return (
    <Paper ref={ref} className={classes.paper}>
      <form className={classes.form} onSubmit={handleSubmit}>
        <Typography variant="h5">{headerString}</Typography>
        <TextField type="text" label={labelString} inputRef={inputRef} required />
        {labelString2 && (
          <TextField type="text" label={labelString2} inputRef={inputRef2} required />
        )}
        <Box className={classes.buttons}>
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
          <Button onClick={() => setActiveModal(false)}>Cancel</Button>
        </Box>
      </form>
    </Paper>
  );
});

ModalTemplate.propTypes = {
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]).isRequired,
  setActiveModal: PropTypes.func.isRequired,
};

export default ModalTemplate;
