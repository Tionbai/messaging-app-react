import React from 'react';
import PropTypes from 'prop-types';
import { Container, Grid, Paper, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiFormControl-root': { width: '80%', margin: theme.spacing(1) },
    '& .MuiButtonBase-root': { margin: theme.spacing(1) },
  },
}));

const FormContainerTemplate = React.forwardRef(({ title, children }, ref) => {
  const classes = useStyles();

  return (
    <Container ref={ref} maxWidth="sm" align="center">
      <Grid container direction="column" style={{ height: '100vh' }} justify="center">
        <Paper className={classes.root}>
          <Typography variant="h4" style={{ marginBottom: 10 }}>
            {title}
          </Typography>
          {children}
        </Paper>
      </Grid>
    </Container>
  );
});

export default FormContainerTemplate;

FormContainerTemplate.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  title: PropTypes.string.isRequired,
};
