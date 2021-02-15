import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Button } from 'react-bootstrap';
import { useContacts } from '../../../../contexts/ContactsProvider';
import { useConversations } from '../../../../contexts/ConversationsProvider';

const NewConversationModal = (props) => {
  const { closeModal } = props;
  const [selectedContactsUsernames, setSelectedContactsUsernames] = useState([]);
  const { contacts } = useContacts();
  const { createConversation } = useConversations();

  const handleCheckboxChange = (contactUsername) => {
    setSelectedContactsUsernames((prevSelectedContactsUsernames) => {
      if (prevSelectedContactsUsernames.includes(contactUsername)) {
        return prevSelectedContactsUsernames.filter((prevUsername) => {
          return contactUsername !== prevUsername;
        });
      }
      return [...prevSelectedContactsUsernames, contactUsername];
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createConversation(selectedContactsUsernames);
    closeModal();
  };
  return (
    <div>
      <Modal.Header closeButton>Create conversation</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {contacts.map((contact) => (
            <Form.Group controlId={contact.username} key={contact.username}>
              <Form.Check
                type="checkbox"
                value={selectedContactsUsernames.includes(contact.username)}
                label={contact.username}
                onChange={() => handleCheckboxChange(contact.username)}
              />
            </Form.Group>
          ))}
          <Button type="submit">Create</Button>
        </Form>
      </Modal.Body>
    </div>
  );
};

NewConversationModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default NewConversationModal;
