import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import useLocalStorage from '../hooks/useLocalStorage';

const ContactsContext = React.createContext();

// Shorthand for using context in other parts of the application.
const useContacts = () => {
  return useContext(ContactsContext);
};

const ContactsProvider = ({ children }) => {
  const [contacts, setContacts] = useLocalStorage('contacts', []);

  // Create and store new contact.
  const createContact = (id, name) => {
    setContacts((prevContacts) => {
      return [...prevContacts, { id, name }];
    });
  };

  return (
    <ContactsContext.Provider value={{ contacts, createContact }}>
      {children}
    </ContactsContext.Provider>
  );
};

export { useContacts, ContactsProvider };

ContactsProvider.propTypes = {
  children: Object(PropTypes.object).isRequired,
};
