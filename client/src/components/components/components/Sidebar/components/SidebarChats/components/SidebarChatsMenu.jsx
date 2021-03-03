import React, { useState } from 'react';
import {
  MoreVert,
  Remove,
  DeleteForever,
  ClearAll,
  PersonAdd,
  PersonAddDisabled,
  TransferWithinAStation,
} from '@material-ui/icons';
import MenuContainerTemplate from '../../../../../../MenuTemplates/MenuContainerTemplate';
import MenuItemAuthTemplate from '../../../../../../MenuTemplates/MenuItemAuthTemplate';
import { useAPI } from '../../../../../../../contexts/APIProvider';

const initialValues = {
  Chat: { 'Chat name': '' },
  'Chat user': { 'Chat name': '', 'User username': '' },
};

const SidebarChatsMenu = () => {
  const {
    leaveChat,
    deleteChat,
    clearChat,
    addChatUser,
    removeChatUser,
    makeAdmin,
  } = useAPI();
  const [menu, setMenu] = useState(false);
  const [values, setValues] = useState(initialValues);
  return (
    <MenuContainerTemplate icon={<MoreVert />} menu={menu} setMenu={setMenu}>
      <MenuItemAuthTemplate
        icon={<Remove />}
        string="Leave chat"
        submitFunc={() => leaveChat(values.Chat['Chat name'])}
        values={values.Chat}
        setValues={setValues}
      />
      <MenuItemAuthTemplate
        icon={<DeleteForever />}
        string="Delete chat"
        submitFunc={() => deleteChat(values.Chat['Chat name'])}
        values={values.Chat}
        setValues={setValues}
      />
      <MenuItemAuthTemplate
        icon={<ClearAll />}
        string="Clear chat"
        submitFunc={() => clearChat(values.Chat['Chat name'])}
        values={values.Chat}
        setValues={setValues}
      />
      <MenuItemAuthTemplate
        icon={<PersonAdd />}
        string="Add chat user"
        submitFunc={() => {
          addChatUser(
            values['Chat user']['Contact name'],
            values['Chat user']['User username'],
          );
        }}
        values={values['Chat user']}
        setValues={setValues}
      />
      <MenuItemAuthTemplate
        icon={<PersonAddDisabled />}
        string="Remove chat user"
        submitFunc={() => {
          removeChatUser(
            values['Chat user']['Contact name'],
            values['Chat user']['User username'],
          );
        }}
        values={values['Chat user']}
        setValues={setValues}
      />
      <MenuItemAuthTemplate
        icon={<TransferWithinAStation />}
        string="Transfer admin rights"
        submitFunc={() => {
          makeAdmin(values['Chat user']['Contact name'], values['Chat user']['User username']);
        }}
        values={values['Chat user']}
        setValues={setValues}
      />
    </MenuContainerTemplate>
  );
};

export default SidebarChatsMenu;
