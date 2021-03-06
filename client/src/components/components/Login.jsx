import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useUser } from '../../contexts/UserProvider';
import history from '../../history';
import FormContainerTemplate from '../FormTemplates/FormContainerTemplate';
import FormTemplate from '../FormTemplates/FormTemplate';

const initialValues = {
  username: '',
  password: '',
};

const Login = () => {
  const { token, loginUser } = useUser();
  const [values, setValues] = useState(initialValues);

  useEffect(() => {
    if (token) {
      history.push('/dashboard');
    }
  }, [token]);

  return (
    <FormContainerTemplate title="Login">
      <FormTemplate
        values={values}
        setValues={setValues}
        submitFunc={() => loginUser(values.username, values.password)}
        links={['Register']}
      />
    </FormContainerTemplate>
  );
};

export default withRouter(Login);
