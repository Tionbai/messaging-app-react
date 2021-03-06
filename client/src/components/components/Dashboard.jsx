import React, { useEffect } from 'react';
import { Container, Box, Divider, makeStyles } from '@material-ui/core';
import Sidebar from './components/Sidebar/Sidebar';
import Chat from './components/Chat/Chat';
import { useUser } from '../../contexts/UserProvider';
import { useChat } from '../../contexts/ChatProvider';
import Account from './components/Account/Account';
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
  const { token, user } = useUser();
  const { chats, formattedChats, setSelectedChat, selectedChat } = useChat();

  useEffect(() => {
    return !token && history.push('/login');
  }, [token]);

  // Select first Chat in the list on initial render.
  useEffect(() => {
    if (chats.length) setSelectedChat(formattedChats[0]);
  }, [chats, setSelectedChat]);

  return (
    <Container className={classes.root}>
      {user ? (
        <>
          <Box>
            <Account />
            <Divider />
          </Box>
          <Box className={classes.content}>
            {selectedChat ? (
              <>
                <Sidebar />
                <Divider orientation="vertical" flexItem />
                <Chat />
              </>
            ) : (
              <></>
            )}
          </Box>
        </>
      ) : (
        <></>
      )}
    </Container>
  );
};

export default Dashboard;
