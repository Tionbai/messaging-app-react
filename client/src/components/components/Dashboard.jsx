import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Box, Divider, makeStyles } from '@material-ui/core';
import Sidebar from './components/Sidebar';
import Chat from './components/components/Chat';
import { useAPI } from '../../contexts/APIProvider';
import { useChat } from '../../contexts/ChatProvider';
import Account from './components/components/Account';
import history from '../../history';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: 0,
    height: '100vh',
    overflow: 'hidden',
    border: '1px solid lightgrey',
  },
  content: {
    display: 'flex',
    height: 'calc(100vh - 60px)',
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const { token, chats } = useAPI();
  const { selectChat, selectedChat } = useChat();

  useEffect(() => {
    if (!token) history.push('/login');
  }, [token]);

  // Select first Chat in the list on initial render.
  useEffect(() => {
    if (chats.length) selectChat(chats[0]._id);
  }, [chats]);

  return (
    <Container className={classes.root}>
      <Box>
        <Account />
        <Divider />
      </Box>
      <Box className={classes.content}>
        <Sidebar />
        <Divider orientation="vertical" flexItem />
        {selectedChat && <Chat />}
      </Box>
    </Container>
  );
};

export default withRouter(Dashboard);
