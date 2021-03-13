import React, { useState } from 'react';
import { Box } from '@material-ui/core';
import { AccountCircle, ExitToApp, DeleteForever } from '@material-ui/icons';
import MenuContainerTemplate from '../../../../../MenuTemplates/MenuContainerTemplate';
import MenuItemTemplate from '../../../../../MenuTemplates/MenuItemTemplate';
import { useAPI } from '../../../../../../contexts/APIProvider';
import MenuDialogWithInputs from '../../../../../MenuDialogTemplates/MenuDialogWithInputs';
import AccountMenuValues from './components/AccountMenuValues';

const AccountMenu = () => {
  const { setToken } = useAPI();
  const [menu, setMenu] = useState(false);
  const [dialogWithInputsOpen, setDialogWithInputsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState();
  const values = AccountMenuValues();

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
