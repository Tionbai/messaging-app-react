import React, { useState } from 'react';
import { Box } from '@material-ui/core';
import { MoreVert, Add, Forum, PersonAdd, PersonAddDisabled } from '@material-ui/icons';
import MenuContainerTemplate from '../../../../../../../MenuTemplates/MenuContainerTemplate';
import MenuItemTemplate from '../../../../../../../MenuTemplates/MenuItemTemplate';
import MenuDialogWithInput from '../../../../../../../MenuDialogTemplates/MenuDialogWithInput/MenuDialogWithInput';
import MenuDialogWithSelect from '../../../../../../../MenuDialogTemplates/MenuDialogWithSelect';
import SidebarSearchFieldMenuValues from './components/SidebarSearchFieldMenuValues';

const AccountMenu = () => {
  const [menu, setMenu] = useState(false);
  const [dialogWithInputOpen, setDialogWithInputOpen] = useState(false);
  const [dialogWithSelectOpen, setDialogWithSelectOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState();
  const [selectedContacts, setSelectedContacts] = useState([]);
  const values = SidebarSearchFieldMenuValues();

  const handleClickOpenDialogWithInput = (e, value) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedValue(value);
    setDialogWithInputOpen(true);
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
          icon={<Add />}
          string="Create new chat"
          submitFunc={(e) => handleClickOpenDialogWithInput(e, values.newChat)}
        />
        <MenuItemTemplate
          icon={<Forum />}
          string="Join existing chat"
          submitFunc={(e) => handleClickOpenDialogWithInput(e, values.joinChat)}
        />
        <MenuItemTemplate
          icon={<PersonAdd />}
          string="New contact"
          submitFunc={(e) => handleClickOpenDialogWithInput(e, values.newContact)}
        />
        <MenuItemTemplate
          icon={<PersonAddDisabled />}
          string="Delete contact"
          submitFunc={(e) => handleClickOpenDialogWithSelect(e, values.deleteContact)}
        />
      </MenuContainerTemplate>
      {dialogWithInputOpen && (
        <MenuDialogWithInput
          dialogWithInputOpen={dialogWithInputOpen}
          setDialogWithInputOpen={setDialogWithInputOpen}
          values={selectedValue}
        />
      )}
      {dialogWithSelectOpen && (
        <MenuDialogWithSelect
          dialogWithSelectOpen={dialogWithSelectOpen}
          setDialogWithSelectOpen={setDialogWithSelectOpen}
          values={selectedValue}
          selectedContacts={selectedContacts}
          setSelectedContacts={setSelectedContacts}
        />
      )}
    </Box>
  );
};

export default AccountMenu;
