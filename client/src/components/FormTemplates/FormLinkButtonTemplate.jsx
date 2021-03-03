import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';

const FormLinkButtonTemplate = ({ formLink }) => {
  return (
    <Link to={`/${formLink}`}>
      <Button color="primary" size="large" variant="text">
        {formLink}
      </Button>
    </Link>
  );
};

export default FormLinkButtonTemplate;

FormLinkButtonTemplate.propTypes = {
  formLink: PropTypes.string.isRequired,
};
