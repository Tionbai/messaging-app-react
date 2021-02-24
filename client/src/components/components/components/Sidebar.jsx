import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Paper, Tabs, Tab, Button, makeStyles } from '@material-ui/core';
import { useAPI } from '../../../contexts/APIProvider';
import SidebarOptions from './components/SidebarOptions';
import SidebarChats from './components/SidebarChats';
import SidebarContacts from './components/SidebarContacts';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    flexDirection: 'column',
    width: 250,
  },
}));

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      /* eslint-disable-next-line react/jsx-props-no-spreading */
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number,
  value: PropTypes.number,
};
TabPanel.defaultProps = {
  children: PropTypes.node,
  index: PropTypes.number,
  value: PropTypes.number,
};

const Sidebar = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const { setToken } = useAPI();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('CHAT_Token');
    setToken(null);
  };

  const handleChange = (e, newValue) => {
    e.preventDefault();
    setValue(newValue);
  };

  return (
    <Paper className={classes.root}>
      <Tabs
        // variant="fullWidth"
        indicatorColor="primary"
        value={value}
        onChange={handleChange}
      >
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Tab style={{ minWidth: 125 }} label="Chats" {...a11yProps(0)} />
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Tab style={{ minWidth: 125 }} label="Contacts" {...a11yProps(1)} />
      </Tabs>
      <Box style={{ flexGrow: 1 }}>
        <TabPanel value={value} index={0}>
          <SidebarOptions />
          <SidebarChats />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <SidebarContacts />
        </TabPanel>
      </Box>
      <Button variant="outlined" onClick={handleLogout}>
        Logout
      </Button>
    </Paper>
  );
};

export default Sidebar;
