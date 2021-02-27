import React from 'react';
import { Grid, Typography, IconButton, makeStyles } from '@material-ui/core';
import { AccountCircle, ExitToApp } from '@material-ui/icons/';
import { useAPI } from '../../../../contexts/APIProvider';
import Options from './components/Options';
import OptionsValues from './OptionsValues';

const useStyles = makeStyles(() => ({
  root: {
    padding: '10px 10px',
    height: 60,
  },
}));
const Account = () => {
  const classes = useStyles();
  const { user, setToken } = useAPI();
  const values = OptionsValues();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('CHAT_Token');
    setToken(null);
  };
  return (
    <Grid container className={classes.root} justify="space-between" alignItems="center">
      <Grid container item xs={6} alignItems="center" alignContent="flex-start" spacing={1}>
        <Grid item>
          <AccountCircle fontSize="large" />
        </Grid>
        <Grid item>
          <Typography>{user && user.username}</Typography>
        </Grid>
      </Grid>
      <Grid
        container
        item
        xs={6}
        alignItems="center"
        alignContent="flex-start"
        justify="flex-end"
        spacing={1}
      >
        <Grid item>
          <Options values={values.user} />
        </Grid>
        <Grid item>
          <IconButton>
            <ExitToApp onClick={handleLogout} />
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Account;
