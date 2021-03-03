import React from 'react';
import PropTypes from 'prop-types';
import { IconButton, Menu, List } from '@material-ui/core';

const MenuContainerTemplate = (props) => {
  const { icon, children, menu, setMenu } = props;

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setMenu(e.currentTarget);
  };

  const handleClose = (e) => {
    e.preventDefault();

    setMenu(null);
  };

  return (
    <>
      <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        {icon}
      </IconButton>
      <Menu keepMounted anchorEl={menu} open={Boolean(menu)} onClose={handleClose}>
        <List>{children}</List>
      </Menu>
    </>
  );
};

export default MenuContainerTemplate;

MenuContainerTemplate.propTypes = {
  icon: PropTypes.node.isRequired,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  setMenu: PropTypes.func.isRequired,
  menu: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

MenuContainerTemplate.defaultProps = {
  menu: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};
