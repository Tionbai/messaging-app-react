import React, { useState } from 'react';
import { AccountCircle, ExitToApp, DeleteForever } from '@material-ui/icons';
import MenuContainerTemplate from '../../../../MenuTemplates/MenuContainerTemplate';
import MenuItemTemplate from '../../../../MenuTemplates/MenuItemTemplate';
import MenuItemAuthTemplate from '../../../../MenuTemplates/MenuItemAuthTemplate';
import { useAPI } from '../../../../../contexts/APIProvider';

const initialValues = {
  username: '',
  password: '',
};

const AccountMenu = () => {
  const { setToken, deleteUser } = useAPI();
  const [menu, setMenu] = useState(false);
  const [values, setValues] = useState(initialValues);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('CHAT_Token');
    setToken(null);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();

    deleteUser(values.username, values.password);
  };

  return (
    <MenuContainerTemplate
      icon={<AccountCircle fontSize="large" />}
      menu={menu}
      setMenu={setMenu}
    >
      <MenuItemTemplate icon={<ExitToApp />} string="Logout" submitFunc={handleLogout} />
      <MenuItemAuthTemplate
        icon={<DeleteForever />}
        string="Delete account"
        submitFunc={handleDelete}
        values={values}
        setValues={setValues}
      />
    </MenuContainerTemplate>
  );
};

export default AccountMenu;
