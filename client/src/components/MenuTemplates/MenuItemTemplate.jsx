import React from 'react';
import PropTypes from 'prop-types';
import { MenuItem, Box, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  icon: {
    marginRight: 10,
  },
}));

const MenuItemTemplate = (props) => {
  const { icon, string, submitFunc } = props;
  const classes = useStyles();

  return (
    <MenuItem onClick={submitFunc}>
      <Box className={classes.icon}>{icon}</Box>
      {string}
    </MenuItem>
  );
};

export default MenuItemTemplate;

MenuItemTemplate.propTypes = {
  icon: PropTypes.node.isRequired,
  string: PropTypes.string.isRequired,
  submitFunc: PropTypes.func.isRequired,
};
