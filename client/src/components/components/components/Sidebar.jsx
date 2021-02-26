import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, Paper, Tabs, Tab, makeStyles } from '@material-ui/core';
import SidebarChats from './components/SidebarChats';
import SidebarContacts from './components/SidebarContacts';
import Account from './components/Account';

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: '#f5f5f5',
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
      {value === index && <Grid p={3}>{children}</Grid>}
    </div>
  );
}

TabPanel.propTypes = {
  children: Object(PropTypes.object),
  index: PropTypes.number,
  value: PropTypes.number,
};
TabPanel.defaultProps = {
  children: Object(PropTypes.object),
  index: PropTypes.number,
  value: PropTypes.number,
};

const Sidebar = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (e, newValue) => {
    e.preventDefault();
    setValue(newValue);
  };

  return (
    <Paper className={classes.root}>
      <Account />
      <Tabs indicatorColor="primary" value={value} onChange={handleChange}>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Tab style={{ minWidth: 125 }} label="Chats" {...a11yProps(0)} />
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Tab style={{ minWidth: 125 }} label="Contacts" {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={value} index={0} style={{ flexGrow: 1 }}>
        <SidebarChats />
      </TabPanel>
      <TabPanel value={value} index={1} style={{ flexGrow: 1 }}>
        <SidebarContacts />
      </TabPanel>
    </Paper>
  );
};

export default Sidebar;
