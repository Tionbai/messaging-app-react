import React, { useRef } from 'react';
import { Box, Divider, Typography, List } from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';
import { useChat } from '../../../../contexts/ChatProvider';
import ChatMessage from './components/ChatMessage/ChatMessage';
import ChatForm from './components/ChatForm/ChatForm';
import ChatStyles from './styles/ChatStyles';

const Chat = () => {
  const classes = ChatStyles();
  const { selectedChat, formattedChat } = useChat();
  const lastMessageRef = useRef();
  const chat = formattedChat;

  // Display and format conversation based on sender and recipient.
  return (
    <Box className={classes.root}>
      <Box className={classes.header}>
        <Typography variant="h4">
          {selectedChat.privateChatName || selectedChat.name}
        </Typography>
      </Box>
      <Divider />
      <List className={classes.messages}>
        {chat.messages.map((message, index) => {
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
