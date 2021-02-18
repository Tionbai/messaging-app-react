import React, { useEffect } from 'react';
import history from '../../history';

const Index = () => {
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
