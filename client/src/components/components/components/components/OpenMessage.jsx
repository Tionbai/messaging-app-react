import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const OpenMessage = React.forwardRef((props, ref) => {
  const { message, lastMessage } = props;

  // When new message is sent, scroll down to last message.
  useEffect(() => {
    if (lastMessage) {
      ref.current.scrollIntoView({ smooth: true });
    }
  }, [ref]);

  return (
    <p
      // Set ref to last message - to scroll to last message after send.
      ref={lastMessage ? ref : null}
      className={`my-1 d-flex flex-column ${
        message.fromMe ? 'align-items-end' : 'align-items-start'
      }`}
    >
      <span
        className={`rounded px-2 py-1 ${message.fromMe ? 'bg-primary text-white' : 'border'}`}
      >
        {message.messages && message.messages[0].text}
      </span>
      <small className={`text-muted small ${message.fromMe ? 'text-right' : ''}`}>
        {message.fromMe ? 'You' : message.senderName}
      </small>
    </p>
  );
});

export default OpenMessage;

OpenMessage.propTypes = {
  message: Object(PropTypes.object).isRequired,
  lastMessage: PropTypes.bool.isRequired,
};
