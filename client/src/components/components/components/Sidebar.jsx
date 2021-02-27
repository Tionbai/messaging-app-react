import React, { useState } from 'react';
import { Box, Tabs, Tab, makeStyles } from '@material-ui/core';
import SidebarChats from './components/SidebarChats';
import SidebarContacts from './components/SidebarContacts';
import { a11yProps, TabPanel } from './components/TabPanel';

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 250,
  },
}));

const Sidebar = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (e, newValue) => {
    e.preventDefault();
    setValue(newValue);
  };

  return (
    <Box className={classes.root}>
      <Tabs indicatorColor="primary" value={value} onChange={handleChange}>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Tab style={{ minWidth: 125 }} label="Chats" {...a11yProps(0)} />
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Tab style={{ minWidth: 125 }} label="Contacts" {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={value} index={0} style={{ flex: 1 }}>
        <SidebarChats />
      </TabPanel>
      <TabPanel value={value} index={1} style={{ flex: 1 }}>
        <SidebarContacts />
      </TabPanel>
    </Box>
  );
};

export default Sidebar;
