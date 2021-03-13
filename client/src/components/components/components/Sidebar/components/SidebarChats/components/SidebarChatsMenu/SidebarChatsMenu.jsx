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
import MenuContainerTemplate from '../../../../../../../MenuTemplates/MenuContainerTemplate';
import MenuItemTemplate from '../../../../../../../MenuTemplates/MenuItemTemplate';
import MenuDialog from '../../../../../../../MenuDialogTemplates/MenuDialog';
import MenuDialogWithSelect from '../../../../../../../MenuDialogTemplates/MenuDialogWithSelect';
import SidebarChatsMenuValues from './components/SidebarChatsMenuValues';

const SidebarChatsMenu = ({ chat }) => {
  const [menu, setMenu] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogWithSelectOpen, setDialogWithSelectOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState();
  const [selectedContacts, setSelectedContacts] = useState([]);
  const values = SidebarChatsMenuValues();

  const handleClickOpenDialog = (e, value) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedValue(value);
    setDialogOpen(true);
  };

  const handleClickOpenDialogWithSelect = (e, value) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedValue(value);
    setDialogWithSelectOpen(true);
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
          submitFunc={(e) => handleClickOpenDialogWithSelect(e, values.addChatUser)}
        />
        <MenuItemTemplate
          icon={<PersonAddDisabled />}
          string="Remove chat user"
          submitFunc={(e) => handleClickOpenDialogWithSelect(e, values.removeChatUser)}
        />
        <MenuItemTemplate
          icon={<TransferWithinAStation />}
          string="Transfer admin rights"
          submitFunc={(e) => handleClickOpenDialogWithSelect(e, values.makeAdmin)}
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
      {dialogWithSelectOpen && (
        <MenuDialogWithSelect
          dialogWithSelectOpen={dialogWithSelectOpen}
          setDialogWithSelectOpen={setDialogWithSelectOpen}
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
  chat: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
};
