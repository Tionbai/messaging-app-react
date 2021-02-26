import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { IconButton, Menu, List, MenuItem, Modal, makeStyles } from '@material-ui/core';
import { MoreHoriz } from '@material-ui/icons/';
import ModalTemplate from './ModalTemplate';

const useStyles = makeStyles(() => ({
  iconButton: {
    padding: 10,
  },
}));

const Options = ({ values }) => {
  const classes = useStyles();
  const [activeModal, setActiveModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setAnchorEl(e.currentTarget);
  };

  const handleClose = (e) => {
    e.preventDefault();

    setAnchorEl(null);
  };

  const handleMenuClick = (e, menuItem) => {
    e.preventDefault();
    e.stopPropagation();

    setActiveModal(menuItem);
    setAnchorEl(null);
  };

  useEffect(() => {}, []);
  return (
    <>
      <IconButton
        className={classes.iconButton}
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreHoriz />
      </IconButton>
      <Menu keepMounted anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {values.map((value) => {
          return (
            <List key={value.headerString}>
              <MenuItem onClick={(e) => handleMenuClick(e, value)}>
                {value.icon}
                {value.headerString}
              </MenuItem>
            </List>
          );
        })}
        <Modal open={activeModal !== false} onClose={() => setActiveModal(false)}>
          <ModalTemplate value={activeModal} setActiveModal={setActiveModal} />
        </Modal>
      </Menu>
    </>
  );
};

export default Options;

Options.propTypes = {
  // valueString: PropTypes.string.isRequired,
  values: Object(PropTypes.array).isRequired,
  // setFilteredValue: PropTypes.func.isRequired,
};
