import React, { useEffect } from 'react';
import history from '../../history';
import { useAPI } from '../../contexts/APIProvider';

const Index = () => {
  const { token } = useAPI();

  useEffect(() => {
    return token ? history.push('/dashboard') : history.push('/login');
  }, []);

  return <></>;
};

export default Index;
