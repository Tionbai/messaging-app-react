import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
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
import MenuItemTemplate from '../../../../../../MenuTemplates/MenuItemTemplate';
import MenuDialog from '../../../../../../MenuDialogTemplates/MenuDialog';
import MenuDialogWithCheckbox from '../../../../../../MenuDialogTemplates/MenuDialogWithCheckbox';
import { useChat } from '../../../../../../../contexts/ChatProvider';

const SidebarChatsMenu = ({ chat }) => {
  const {
    leaveChat,
    deleteChat,
    clearChat,
    addChatUser,
    removeChatUser,
    makeAdmin,
  } = useChat();
  const [menu, setMenu] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogWithCheckboxOpen, setDialogWithCheckboxOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState();
  const [selectedContacts, setSelectedContacts] = useState([]);

  const values = {
    leaveChat: {
      title: 'Are you sure you want to leave chat?',
      submitFunc: leaveChat,
    },
    deleteChat: {
      title: 'Are you sure you want to delete chat? This action is irreversible.',
      submitFunc: deleteChat,
    },
    clearChat: {
      title: 'Are you sure you want to delete all messages? This action is irreversible.',
      submitFunc: clearChat,
    },
    addChatUser: {
      title: 'Choose contact to add to the chat.',
      submitFunc: addChatUser,
    },
    removeChatUser: {
      title: 'Choose contact to remove from the chat.',
      submitFunc: removeChatUser,
    },
    makeAdmin: {
      title: 'Choose contact to make admin.',
      submitFunc: makeAdmin,
    },
  };

  const handleClickOpenDialog = (e, value) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedValue(value);
    setDialogOpen(true);
  };

  const handleClickOpenDialogWithCheckbox = (e, value) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedValue(value);
    setDialogWithCheckboxOpen(true);
  };

  return (
    <Box>
      <MenuContainerTemplate icon={<MoreVert />} menu={menu} setMenu={setMenu}>
        <MenuItemTemplate
          icon={<Remove />}
          string="Leave chat"
          submitFunc={(e) => handleClickOpenDialog(e, values.leaveChat)}
        />
        <MenuItemTemplate
          icon={<DeleteForever />}
          string="Delete chat"
          submitFunc={(e) => handleClickOpenDialog(e, values.deleteChat)}
        />
        <MenuItemTemplate
          icon={<ClearAll />}
          string="Clear chat"
          submitFunc={(e) => handleClickOpenDialog(e, values.clearChat)}
        />
        <MenuItemTemplate
          icon={<PersonAdd />}
          string="Add chat user"
          submitFunc={(e) => handleClickOpenDialogWithCheckbox(e, values.addChatUser)}
        />
        <MenuItemTemplate
          icon={<PersonAddDisabled />}
          string="Remove chat user"
          submitFunc={(e) => handleClickOpenDialogWithCheckbox(e, values.removeChatUser)}
        />
        <MenuItemTemplate
          icon={<TransferWithinAStation />}
          string="Transfer admin rights"
          submitFunc={(e) => handleClickOpenDialogWithCheckbox(e, values.makeAdmin)}
        />
      </MenuContainerTemplate>
      {dialogOpen && (
        <MenuDialog
          dialogOpen={dialogOpen}
          setDialogOpen={setDialogOpen}
          values={selectedValue}
          chat={chat}
        />
      )}
      {dialogWithCheckboxOpen && (
        <MenuDialogWithCheckbox
          dialogWithCheckboxOpen={dialogWithCheckboxOpen}
          setDialogWithCheckboxOpen={setDialogWithCheckboxOpen}
          values={selectedValue}
          selectedContacts={selectedContacts}
          setSelectedContacts={setSelectedContacts}
          chat={chat}
        />
      )}
    </Box>
  );
};

export default SidebarChatsMenu;

SidebarChatsMenu.propTypes = {
  chat: Object(PropTypes.array).isRequired,
};
