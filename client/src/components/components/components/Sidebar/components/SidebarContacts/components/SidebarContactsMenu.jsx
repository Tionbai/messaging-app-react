import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MoreVert, Add } from '@material-ui/icons';
import MenuContainerTemplate from '../../../../../../MenuTemplates/MenuContainerTemplate';
import MenuItemTemplate from '../../../../../../MenuTemplates/MenuItemTemplate';

const SidebarContactsMenu = ({ newMessage }) => {
  const [menu, setMenu] = useState(false);
  return (
    <MenuContainerTemplate icon={<MoreVert />} menu={menu} setMenu={setMenu}>
      <MenuItemTemplate icon={<Add />} string="New message" submitFunc={newMessage} />
    </MenuContainerTemplate>
  );
};

export default SidebarContactsMenu;

SidebarContactsMenu.propTypes = {
  newMessage: PropTypes.func.isRequired,
};
