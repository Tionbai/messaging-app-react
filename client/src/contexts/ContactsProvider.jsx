import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useUser } from './UserProvider';
import { useAPI } from './APIProvider';

const ContactsContext = React.createContext();

// Shorthand for using context in other parts of the application.
const useContacts = () => {
  return useContext(ContactsContext);
};

const ContactsProvider = ({ children }) => {
  const { APIput, APIdelete } = useAPI();
  const { user } = useUser();
  const [contacts, setContacts] = useState([]);

  // Add new contact given a contact ref (username or email).
  const newContact = async (contactRef) => {
    const route = '/user/contacts/new';
    const body = {
      ref: contactRef,
    };
    try {
      const response = await APIput(route, body);
      setContacts([...user.contacts, response.data]);
      return response.data;
    } catch (err) {
      return err.response;
    }
  };

  // Add new contact given a contact ref (username or email).
  const deleteContact = async (contactRef) => {
    const route = `/user/contacts/${contactRef}`;
    try {
      const response = await APIdelete(route);
      setContacts([...contacts.filter((contact) => contact._id !== response.data)]);
      return response.data;
    } catch (err) {
      return err.response;
    }
  };

  useEffect(() => {
    return user && setContacts(user.contacts);
  }, [user]);

  const value = {
    contacts,
    setContacts,
    newContact,
    deleteContact,
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
