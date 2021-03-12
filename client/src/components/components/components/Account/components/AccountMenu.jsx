import React, { useState } from 'react';
import { Box } from '@material-ui/core';
import { AccountCircle, ExitToApp, DeleteForever } from '@material-ui/icons';
import MenuContainerTemplate from '../../../../MenuTemplates/MenuContainerTemplate';
import MenuItemTemplate from '../../../../MenuTemplates/MenuItemTemplate';
import { useUser } from '../../../../../contexts/UserProvider';
import { useAPI } from '../../../../../contexts/APIProvider';
import MenuDialogWithInputs from '../../../../MenuDialogTemplates/MenuDialogWithInputs';

const AccountMenu = () => {
  const { setToken } = useAPI();
  const { deleteUser } = useUser();
  const [menu, setMenu] = useState(false);
  const [dialogWithInputsOpen, setDialogWithInputsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState();

  const values = {
    deleteUser: {
      title: 'Delete account',
      content: 'Are you sure you want to delete account? This action is irreversible.',
      placeholder: ['Type in your username or email', 'Type in your password'],
      submitFunc: deleteUser,
    },
  };

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('CHAT_Token');
    setToken(null);
  };

  const handleClickOpenDialogWithInputs = (e, value) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedValue(value);
    setDialogWithInputsOpen(true);
  };

  return (
    <Box>
      <MenuContainerTemplate
        icon={<AccountCircle fontSize="large" />}
        menu={menu}
        setMenu={setMenu}
      >
        <MenuItemTemplate icon={<ExitToApp />} string="Logout" submitFunc={handleLogout} />
        <MenuItemTemplate
          icon={<DeleteForever />}
          string="Delete account"
          submitFunc={(e) => handleClickOpenDialogWithInputs(e, values.deleteUser)}
        />
      </MenuContainerTemplate>
      {dialogWithInputsOpen && (
        <MenuDialogWithInputs
          dialogWithInputsOpen={dialogWithInputsOpen}
          setDialogWithInputsOpen={setDialogWithInputsOpen}
          values={selectedValue}
        />
      )}
    </Box>
  );
};

export default AccountMenu;
