import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Menu, List, MenuItem, Modal } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ModalTemplate from './ModalTemplate';

const Options = ({ values }) => {
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
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        <ArrowDropDownIcon />
      </Button>
      <Menu keepMounted anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {values.map((value) => {
          return (
            <List key={value.headerString}>
              <MenuItem onClick={(e) => handleMenuClick(e, value)}>
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
