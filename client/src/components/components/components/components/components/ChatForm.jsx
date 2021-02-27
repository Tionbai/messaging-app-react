import React, { useState } from 'react';
import { Box, IconButton, TextField, makeStyles } from '@material-ui/core';
import { Send } from '@material-ui/icons/';
import { useChat } from '../../../../../contexts/ChatProvider';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textfield: {
    width: '95%',
    resize: 'none',
  },
  iconfield: {
    width: '5%',
    textAlign: 'center',
  },
  icon: {
    backgroundColor: '#2979ff',
    color: 'white',
  },
}));

const ChatForm = () => {
  const classes = useStyles();
  const [text, setText] = useState('');
  const { sendMessage } = useChat();

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
      <TextField
        multiline
        rows={Infinity}
        as="textarea"
        variant="outlined"
        required
        placeholder="Write something"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className={classes.textfield}
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
