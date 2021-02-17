import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const Index = (props) => {
  const { history } = props;

  useEffect(() => {
    const token = localStorage.getItem('CHAT_Token');
    if (token) {
      history.push('/dashboard');
    } else {
      history.push('/login');
    }
  }, []);

  return <></>;
};

export default Index;

Index.propTypes = {
  history: Object(PropTypes.object).isRequired,
};
