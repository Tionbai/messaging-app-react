import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Menu,
  List,
  ListItem,
  Typography,
  IconButton,
  makeStyles,
} from '@material-ui/core';
import { ExpandMore, DeleteForever } from '@material-ui/icons';
import MenuItemTemplate from '../../../../MenuTemplates/MenuItemTemplate';
import { useAPI } from '../../../../../contexts/APIProvider';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 5,
    paddingRight: 5,
    marginTop: 10,
    alignSelf: 'flex-start',
    position: 'relative',
  },
  message: {
    width: 'fit-content',
    borderRadius: '10px',
    padding: '5px 10px',
  },
  sender: {
    margin: '2px 3px',
    color: 'grey',
  },
  fromMe: {
    backgroundColor: '#2979ff',
    color: 'white',
  },
  toMe: {
    backgroundColor: '#f5f5f5',
  },
  messageContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  messageMenuLeft: {
    order: 0,
  },
  messageMenuRight: {
    order: 1,
  },
}));

const ChatMessage = React.forwardRef(({ lastMessage, message }, ref) => {
  const { deleteMessage } = useAPI();
  const classes = useStyles();
  const [showTime, setShowTime] = useState(false);
  const [hover, setHover] = useState(false);
  const [menu, setMenu] = useState(false);

  const formatTime = (msg) => {
    const newDateDay = msg.createdAt.split('T')[0].slice(5).split('-')[1];
    const newDateMonth = msg.createdAt.split('T')[0].slice(5).split('-')[0];
    const newTime = msg.createdAt.split('T')[1].split('.')[0].slice(0, 5);
    // let xM = '';
    // if (newTime.charAt(1) <= 9) xM = 'AM';
    // if (newTime.charAt(1) > 9) xM = 'PM';
    return `${newDateDay}-${newDateMonth} ${newTime}`;
  };

  const handleClick = (e) => {
    e.preventDefault();

    setShowTime(!showTime);
  };

  const handleMenuOpen = (e) => {
    e.preventDefault();

    setMenu(e.currentTarget);
  };

  const handleMenuClose = (e) => {
    e.preventDefault();

    setMenu(null);
  };

  const handlePointerEnter = (e) => {
    e.preventDefault();

    setHover(true);
  };

  const handlePointerLeave = (e) => {
    e.preventDefault();

    setHover(false);
  };

  // When new message is sent, scroll down to last message.
  useEffect(() => {
    if (lastMessage) {
      ref.current.scrollIntoView({ smooth: true });
    }
  }, [ref]);

  return (
    <ListItem
      style={{ alignItems: message.fromMe ? 'flex-end' : 'flex-start' }}
      className={classes.root}
      ref={lastMessage ? ref : null}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      <Box className={classes.messageContainer}>
        {hover && (
          <span
            className={message.fromMe ? classes.messageMenuLeft : classes.messageMenuRight}
          >
            <IconButton
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleMenuOpen}
              size="small"
            >
              <ExpandMore />
            </IconButton>
            <Menu keepMounted anchorEl={menu} open={Boolean(menu)} onClose={handleMenuClose}>
              <List>
                <MenuItemTemplate
                  icon={<DeleteForever />}
                  string="Delete message"
                  submitFunc={() => {
                    deleteMessage(message._id);
                  }}
                />
              </List>
            </Menu>
          </span>
        )}
        <Typography
          variant="body1"
          className={`${classes.message} ${message.fromMe ? classes.fromMe : classes.toMe}`}
        >
          {message.message}
        </Typography>
      </Box>
      <Typography variant="body2" className={classes.sender} onClick={handleClick}>
        {message.fromMe ? 'You' : message.senderName}
        {showTime && <Typography variant="caption">{` ${formatTime(message)}`}</Typography>}
      </Typography>
    </ListItem>
  );
});

export default ChatMessage;

ChatMessage.propTypes = {
  lastMessage: PropTypes.bool.isRequired,
  message: Object(PropTypes.object).isRequired,
};
