import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useAPI } from '../../contexts/APIProvider';
import FormContainerTemplate from '../FormTemplates/FormContainerTemplate';
import FormTemplate from '../FormTemplates/FormTemplate';

const initialValues = {
  username: '',
  email: '',
  password: '',
};

const Register = () => {
  const { registerUser } = useAPI();
  const [values, setValues] = useState(initialValues);

  return (
    <FormContainerTemplate title="Register">
      <FormTemplate
        values={values}
        setValues={setValues}
        submitFunc={() => registerUser(values.username, values.email, values.password)}
        links={['Login']}
      />
    </FormContainerTemplate>
  );
};

export default withRouter(Register);
