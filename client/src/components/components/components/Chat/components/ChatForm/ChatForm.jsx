import React, { useState } from 'react';
import { Box, IconButton } from '@material-ui/core';
import { Send } from '@material-ui/icons/';
import { useMessages } from '../../../../../../contexts/MessagesProvider';
import ChatFormStyles from './styles/ChatFormStyles';

const ChatForm = () => {
  const classes = ChatFormStyles();
  const [text, setText] = useState('');
  const { sendMessage } = useMessages();

  const handleChange = (e) => {
    e.preventDefault();
    setText(e.target.textContent);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    sendMessage(text);
    e.target.textContent = '';
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
        role="textbox"
        aria-label="input"
        tabIndex={0}
        contentEditable
        className={classes.textarea}
        required
        placeholder="Write something"
        value={text}
        onKeyDown={handleShiftEnter}
        onSubmit={handleSubmit}
        onInput={handleChange}
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
