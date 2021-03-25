import React, { useState } from 'react';
import { Box, IconButton } from '@material-ui/core';
import { Send } from '@material-ui/icons/';
import { useMessages } from '../../../../../../contexts/MessagesProvider';
import ChatFormStyles from './styles/ChatFormStyles';

const ChatForm = () => {
  const classes = ChatFormStyles();
  const [text, setText] = useState('');
  const { sendMessage } = useMessages();

  const handleSubmit = (e) => {
    e.preventDefault();

    sendMessage(text);
    setText('');
  };

  // Handle user pressing enter to send message (need for 'textarea').
  const handleShiftEnter = (e) => {
    if (e.key === 'Enter' && e.shiftKey === false) {
      e.preventDefault();
      handleSubmit(e);
    }
  };
  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <div
        role="presentation"
        contentEditable
        className={classes.textarea}
        required
        placeholder="Write something"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleShiftEnter}
      />
      <Box className={classes.iconfield}>
        <IconButton color="primary" variant="contained" type="submit" className={classes.icon}>
          <Send fontSize="large" />
        </IconButton>
      </Box>
    </form>
  );
};

export default ChatForm;
