import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MenuItem, Box, makeStyles, Modal, Button } from '@material-ui/core';
import FormContainerTemplate from '../FormTemplates/FormContainerTemplate';
import FormTemplate from '../FormTemplates/FormTemplate';

const useStyles = makeStyles(() => ({
  icon: {
    marginRight: 10,
  },
}));

const MenuItemAuthTemplate = (props) => {
  const { icon, string, submitFunc, values, setValues } = props;
  const classes = useStyles();
  const [activeModal, setActiveModal] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setActiveModal(values);
  };

  const handleSubmit = () => {
    submitFunc();
    setActiveModal(false);
  };

  return (
    <>
      <MenuItem onClick={handleClick}>
        <Box className={classes.icon}>{icon}</Box>
        {string}
      </MenuItem>
      <Modal open={activeModal !== false} onClose={() => setActiveModal(false)}>
        <FormContainerTemplate title={string}>
          <FormTemplate values={values} setValues={setValues} submitFunc={handleSubmit}>
            <Button onClick={() => setActiveModal(false)}>Cancel</Button>
          </FormTemplate>
        </FormContainerTemplate>
      </Modal>
    </>
  );
};

export default MenuItemAuthTemplate;

MenuItemAuthTemplate.propTypes = {
  icon: PropTypes.node.isRequired,
  string: PropTypes.string.isRequired,
  submitFunc: PropTypes.func.isRequired,
  values: Object(PropTypes.object).isRequired,
  setValues: PropTypes.func.isRequired,
};
