import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid } from '@material-ui/core';

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
};

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      /* eslint-disable-next-line react/jsx-props-no-spreading */
      {...other}
    >
      {value === index && <Grid p={3}>{children}</Grid>}
    </Box>
  );
};

TabPanel.propTypes = {
  children: Object(PropTypes.object).isRequired,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export { a11yProps, TabPanel };
