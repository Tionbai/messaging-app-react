import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, Grid, makeStyles } from '@material-ui/core';
import FormTextfieldTemplate from './FormTextfieldTemplate';
import FormLinkButtonTemplate from './FormLinkButtonTemplate';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiFormControl-root': { width: '80%', margin: theme.spacing(1) },
    '& .MuiButtonBase-root': { margin: theme.spacing(1) },
  },
}));

const FormTemplate = ({ setValues, values, submitFunc, links, children }) => {
  const classes = useStyles();
  const handleSubmit = (e) => {
    e.preventDefault();

    submitFunc();
  };

  return (
    <form onSubmit={handleSubmit} className={classes.root}>
      <Grid container direction="column">
        {Object.entries(values).map((entry) => (
          <Grid item key={entry[0]}>
            <FormTextfieldTemplate entry={entry} setValues={setValues} values={values} />
          </Grid>
        ))}
        <Grid container direction="row" justify="center">
          <Grid item xs={4}>
            <Button size="large" variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </Grid>
          {children}
          {links &&
            links.map((formLink) => (
              <Grid item xs={4} key={formLink}>
                <FormLinkButtonTemplate formLink={formLink} />
              </Grid>
            ))}
        </Grid>
      </Grid>
    </form>
  );
};

export default withRouter(FormTemplate);

FormTemplate.propTypes = {
  values: Object(PropTypes.object).isRequired,
  setValues: PropTypes.func.isRequired,
  submitFunc: PropTypes.func.isRequired,
  links: Object(PropTypes.array),
  children: PropTypes.func,
};

FormTemplate.defaultProps = {
  links: Object(PropTypes.array),
  children: PropTypes.func,
};
