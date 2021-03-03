import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';

const FormTextfieldTemplate = ({ entry, values, setValues }) => {
  return (
    <TextField
      label={entry[0]}
      variant="outlined"
      name={entry[0]}
      value={entry[1]}
      onChange={(e) => setValues({ ...values, [entry[0]]: e.target.value })}
      required
    />
  );
};

export default FormTextfieldTemplate;

FormTextfieldTemplate.propTypes = {
  entry: Object(PropTypes.array).isRequired,
  values: Object(PropTypes.object).isRequired,
  setValues: PropTypes.func.isRequired,
};
