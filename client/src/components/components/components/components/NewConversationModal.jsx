import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Button } from 'react-bootstrap';
import { useContacts } from '../../../../contexts/ContactsProvider';
import { useConversations } from '../../../../contexts/ConversationsProvider';

const NewConversationModal = (props) => {
  const { closeModal } = props;
  const [selectedContactsIds, setSelectedContactsIds] = useState([]);
  const { contacts } = useContacts();
  const { createConversation } = useConversations();

  const handleCheckboxChange = (contactId) => {
    setSelectedContactsIds((prevSelectedContactsIds) => {
      if (prevSelectedContactsIds.includes(contactId)) {
        return prevSelectedContactsIds.filter((prevId) => {
          return contactId !== prevId;
        });
      }
      return [...prevSelectedContactsIds, contactId];
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createConversation(selectedContactsIds);
    closeModal();
  };
  return (
    <div>
      <Modal.Header closeButton>Create conversation</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {contacts.map((contact) => (
            <Form.Group controlId={contact.id} key={contact.id}>
              <Form.Check
                type="checkbox"
                value={selectedContactsIds.includes(contact.id)}
                label={contact.name}
                onChange={() => handleCheckboxChange(contact.id)}
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
