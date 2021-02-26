import React, { useState } from 'react';
import { Button, TextField, makeStyles } from '@material-ui/core';
import { Send } from '@material-ui/icons/';
import { useChat } from '../../../../../contexts/ChatProvider';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
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
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ width: '100%', resize: 'none' }}
        onKeyDown={handleShiftEnter}
      />
      <Button color="primary" variant="contained" type="submit" style={{ height: 40 }}>
        <Send />
      </Button>
    </form>
  );
};

export default ChatForm;
