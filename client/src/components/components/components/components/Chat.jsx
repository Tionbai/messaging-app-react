import React, { useState, useRef } from 'react';
import { Grid, Divider, Typography, List, makeStyles } from '@material-ui/core';
import { MoreHoriz } from '@material-ui/icons/';
import { useChat } from '../../../../contexts/ChatProvider';
import ChatDetails from './components/ChatDetails';
import ChatMessage from './components/ChatMessage';
import ChatForm from './components/ChatForm';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    justifyContent: 'space-between',
    padding: theme.spacing(2),
  },
  messages: {
    '&::-webkit-scrollbar': { width: 0, backgroundColor: 'transparent' },
  },
}));

const Chat = () => {
  const classes = useStyles();
  const { selectedChat, formattedChat } = useChat();
  const lastMessageRef = useRef();
  const [showChatDetails, setShowChatDetails] = useState(false);
  const chat = formattedChat;

  const handleShowChatDetails = (e) => {
    e.preventDefault();

    setShowChatDetails(!showChatDetails);
  };

  // Display and format conversation based on sender and recipient.
  return (
    <Grid container direction="column" className={classes.root}>
      <Grid container>
        <Grid item xs={9}>
          <Typography variant="h4">{selectedChat.name}</Typography>
        </Grid>
        <Grid item xs={3} style={{ textAlign: 'right' }} onClick={handleShowChatDetails}>
          <MoreHoriz />
        </Grid>
      </Grid>
      <Divider />
      {showChatDetails && <ChatDetails chat={selectedChat} />}
      <Grid
        className={classes.messages}
        container
        direction="column"
        item
        style={{ flex: 1, overflow: 'scroll' }}
      >
        <List>
          {chat &&
            chat.messages.map((message, index) => {
              const lastMessage = chat.messages.length - 1 === index;
              return (
                <ChatMessage
                  ref={lastMessageRef}
                  message={message}
                  lastMessage={lastMessage}
                />
              );
            })}
        </List>
      </Grid>
      <Grid item>
        <ChatForm />
      </Grid>
    </Grid>
  );
};

export default Chat;
