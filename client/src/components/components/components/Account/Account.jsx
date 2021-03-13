import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { useUser } from '../../../../contexts/UserProvider';
import AccountMenu from './components/AccountMenu/AccountMenu';
import AccountStyles from './styles/AccountStyles';

const Account = () => {
  const classes = AccountStyles();
  const { user } = useUser();

  return (
    <Grid
      container
      className={classes.root}
      justify="space-between"
      align="center"
      alignContent="center"
    >
      <Grid container item xs={6} alignItems="center" alignContent="flex-start" spacing={1}>
        <Grid item>
          <AccountMenu />
        </Grid>
        <Grid item>
          <Typography variant="subtitle1">{user.username}</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Account;
