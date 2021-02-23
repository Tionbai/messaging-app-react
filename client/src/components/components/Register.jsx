import React, { useRef } from 'react';
import { Link, withRouter } from 'react-router-dom';
import {
  Container,
  Button,
  Grid,
  Typography,
  TextField,
  makeStyles,
  Paper,
} from '@material-ui/core';
import { useAPI } from '../../contexts/APIProvider';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiFormControl-root': { width: '80%', margin: theme.spacing(1) },
    '& .MuiButtonBase-root': { margin: theme.spacing(1) },
  },
  form: {
    padding: theme.spacing(2),
  },
}));

const Register = () => {
  const { typeError, registerUser } = useAPI();
  const classes = useStyles();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    registerUser(usernameRef.current.value, emailRef.current.value, passwordRef.current.value);
  };

  return (
    <Container maxWidth="sm" align="center">
      <Grid container direction="column" style={{ height: '100vh' }} justify="center">
        <Paper className={classes.form}>
          <Typography variant="h4" style={{ marginBottom: 10 }}>
            Register
          </Typography>
          <form onSubmit={handleSubmit} className={classes.root}>
            <Grid container direction="column">
              <Grid item>
                <TextField
                  label="Username"
                  variant="outlined"
                  inputRef={usernameRef}
                  required
                />
                {typeError('error-username') && (
                  <div variant="danger">{typeError('error-username')}</div>
                )}
              </Grid>
              <Grid item>
                <TextField label="Email" variant="outlined" inputRef={emailRef} required />
                {typeError('error-email') && (
                  <div variant="danger">{typeError('error-email')}</div>
                )}
              </Grid>
              <Grid item>
                <TextField
                  label="Password"
                  variant="outlined"
                  inputRef={passwordRef}
                  required
                />
                {typeError('error-password') && (
                  <div variant="danger">{typeError('error-password')}</div>
                )}
              </Grid>
              {/* TODO: Add validation message to screen before redirect to login, or on login screen after redirect */}
              <Grid container direction="row" justify="center">
                <Grid item xs="3">
                  <Button size="large" variant="contained" color="primary" type="submit">
                    Submit
                  </Button>
                </Grid>
                <Grid item xs="3">
                  <Link to="/Login">
                    <Button size="large" variant="text">
                      Login
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </Container>
  );
};

export default withRouter(Register);
