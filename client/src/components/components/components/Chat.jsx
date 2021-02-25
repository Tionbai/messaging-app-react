import React, { useState, useEffect, useRef } from 'react';
import {
  Grid,
  Divider,
  List,
  ListItem,
  ListItemText,
  Button,
  TextField,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';
import { useChat } from '../../../contexts/ChatProvider';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    justifyContent: 'space-between',
    padding: theme.spacing(2),
  },
  chatItem: {
    minHeight: 50,
    padding: 0,
    margin: 5,
    border: '1px solid grey',
  },
  form: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
}));

const Chat = () => {
  const classes = useStyles();
  const [text, setText] = useState('');
  const { sendMessage, selectedChat, filteredMessages } = useChat();
  const lastMessageRef = useRef();

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

  // When new message is sent, scroll down to last message.
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ smooth: true });
    }
  }, [lastMessageRef, filteredMessages]);

  // Display and format conversation based on sender and recipient.
  return (
    <Grid container direction="column" className={classes.root}>
      <Grid item>
        <Typography variant="h4">{selectedChat[0].name}</Typography>
        <Divider />
        <Typography variant="body1">{selectedChat[0]._id}</Typography>
      </Grid>
      <Grid item style={{ flex: 1 }}>
        <List>
          {filteredMessages.map((message, index) => {
            const lastMessage = filteredMessages.length - 1 === index;
            return (
              <ListItem
                className={classes.chatItem}
                key={uuidv4()}
                ref={lastMessage ? lastMessageRef : null}
              >
                <Typography>{message._id}</Typography>
                <ListItemText>{message.message}</ListItemText>
              </ListItem>
            );
          })}
        </List>
      </Grid>
      <Grid item>
        <form className={classes.form} onSubmit={handleSubmit}>
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
          <Button color="primary" variant="contained" type="submit">
            Send
          </Button>
        </form>
      </Grid>
    </Grid>
  );
};

export default Chat;
