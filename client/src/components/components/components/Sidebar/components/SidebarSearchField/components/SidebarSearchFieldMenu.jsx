import React, { useState } from 'react';
import { MoreVert, Add, Forum, PersonAdd, PersonAddDisabled } from '@material-ui/icons';
import MenuContainerTemplate from '../../../../../../MenuTemplates/MenuContainerTemplate';
import MenuItemAuthTemplate from '../../../../../../MenuTemplates/MenuItemAuthTemplate';
import { useAPI } from '../../../../../../../contexts/APIProvider';

const initialValues = {
  Chat: { 'Chat name': '' },
  Contact: { 'Username or email': '' },
};

const AccountMenu = () => {
  const { newChat, joinChat, newContact, deleteContact } = useAPI();
  const [menu, setMenu] = useState(false);
  const [values, setValues] = useState(initialValues);

  return (
    <MenuContainerTemplate icon={<MoreVert />} menu={menu} setMenu={setMenu}>
      <MenuItemAuthTemplate
        icon={<Add />}
        string="Create new chat"
        submitFunc={() => newChat(values.Chat['Chat name'])}
        values={values.Chat}
        setValues={setValues}
      />
      <MenuItemAuthTemplate
        icon={<Forum />}
        string="Join existing chat"
        submitFunc={() => joinChat(values.Chat['Chat name'])}
        values={values.Chat}
        setValues={setValues}
      />
      <MenuItemAuthTemplate
        icon={<PersonAdd />}
        string="New contact"
        submitFunc={() => newContact(values.Contact['Username or email'])}
        values={values.Contact}
        setValues={setValues}
      />
      <MenuItemAuthTemplate
        icon={<PersonAddDisabled />}
        string="Delete contact"
        submitFunc={() => deleteContact(values.Contact['Username or email'])}
        values={values.Contact}
        setValues={setValues}
      />
    </MenuContainerTemplate>
  );
};

export default AccountMenu;
