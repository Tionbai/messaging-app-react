import React, { useEffect, useRef } from 'react';
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
import history from '../../history';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiFormControl-root': { width: '80%', margin: theme.spacing(1) },
    '& .MuiButtonBase-root': { margin: theme.spacing(1) },
  },
  form: {
    padding: theme.spacing(2),
  },
}));

const Login = () => {
  const { token, loginUser, apiResponseMessage } = useAPI();
  const classes = useStyles();
  const usernameRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    if (token) {
      history.push('/dashboard');
    }
  }, [token]);

  const handleSubmit = (e) => {
    e.preventDefault();

    loginUser(usernameRef.current.value, passwordRef.current.value);
  };

  return (
    <Container maxWidth="sm" align="center">
      <Grid container direction="column" style={{ height: '100vh' }} justify="center">
        <Paper className={classes.form}>
          <Typography variant="h4" style={{ marginBottom: 10 }}>
            Login
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
              </Grid>
              <Grid item>
                <TextField
                  label="Password"
                  variant="outlined"
                  inputRef={passwordRef}
                  required
                />
              </Grid>
              {apiResponseMessage.type === 'error' && (
                <div variant="danger">{apiResponseMessage.message}</div>
              )}
              {apiResponseMessage.type === 'success' && (
                <div variant="success">{apiResponseMessage.message}</div>
              )}
              <Grid container direction="row" justify="center">
                <Grid item xs="4">
                  <Button size="large" variant="contained" color="primary" type="submit">
                    Submit
                  </Button>
                </Grid>
                <Grid item xs="4">
                  <Link to="/Register">
                    <Button color="primary" size="large" variant="text">
                      Register
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

export default withRouter(Login);
