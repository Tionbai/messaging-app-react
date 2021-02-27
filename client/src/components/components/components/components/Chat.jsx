import React, { useState, useRef } from 'react';
import { Box, Divider, Typography, List, makeStyles } from '@material-ui/core';
import { MoreHoriz } from '@material-ui/icons/';
import { v4 as uuidv4 } from 'uuid';
import { useChat } from '../../../../contexts/ChatProvider';
import ChatDetails from './components/ChatDetails';
import ChatMessage from './components/ChatMessage';
import ChatForm from './components/ChatForm';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  messages: {
    '&::-webkit-scrollbar': { width: 0, backgroundColor: 'transparent' },
    flex: 1,
    overflow: 'scroll',
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
    <Box className={classes.root}>
      <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h4">{selectedChat.name}</Typography>
        {showChatDetails && <ChatDetails chat={selectedChat} />}
        <MoreHoriz onClick={handleShowChatDetails} />
      </Box>
      <Divider />
      <List className={classes.messages}>
        {chat &&
          chat.messages.map((message, index) => {
            const lastMessage = chat.messages.length - 1 === index;
            return (
              <ChatMessage
                key={uuidv4()}
                ref={lastMessageRef}
                message={message}
                lastMessage={lastMessage}
              />
            );
          })}
      </List>
      <ChatForm />
    </Box>
  );
};

export default Chat;
