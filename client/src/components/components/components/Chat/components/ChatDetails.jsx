import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';

const ChatDetails = ({ chat }) => {
  const [showId, setShowId] = useState(false);
  const handleShowId = (e) => {
    e.preventDefault();

    setShowId(!showId);
  };
  return (
    <Grid container spacing={2} align="center">
      <Grid item xs={3} onClick={handleShowId}>
        Chat ID:
        {showId ? ` ${chat._id}` : ' ...'}
      </Grid>
      <Grid item xs={3}>
        {`${[chat.admin].length} admins`}
      </Grid>
      <Grid item xs={3}>
        {`${chat.users.length} members`}
      </Grid>
      <Grid item xs={3}>
        {`${chat.messages.length} messages`}
      </Grid>
    </Grid>
  );
};

export default ChatDetails;

ChatDetails.propTypes = {
  chat: Object(PropTypes.object).isRequired,
};
