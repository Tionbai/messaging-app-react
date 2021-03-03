import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useAPI } from './APIProvider';

const ContactsContext = React.createContext();

// Shorthand for using context in other parts of the application.
const useContacts = () => {
  return useContext(ContactsContext);
};

const ContactsProvider = ({ children }) => {
  const { setContacts } = useAPI();

  // Create and store new contact.
  const createContact = (username) => {
    setContacts((prevContacts) => {
      return [...prevContacts, { username }];
    });
  };

  const value = {
    createContact,
  };

  return <ContactsContext.Provider value={value}>{children}</ContactsContext.Provider>;
};

export { useContacts, ContactsProvider };

ContactsProvider.propTypes = {
  children: Object(PropTypes.object),
};

ContactsProvider.defaultProps = {
  children: Object(PropTypes.object),
};
