import React, { useState, useEffect, useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import useLocalStorage from '../hooks/useLocalStorage';
import { useContacts } from './ContactsProvider';
import { useSocket } from './SocketProvider';

// Handle conversation changes between different parts of the application.

// Function to check if arrays are equal.
const arrayEquality = (a, b) => {
  if (a.length !== b.length) return false;

  a.sort();
  b.sort();

  return a.every((element, index) => {
    return element === b[index];
  });
};

const ConversationsContext = React.createContext();

// Shorthand for using context in other parts of the application.
const useConversations = () => {
  return useContext(ConversationsContext);
};

const ConversationsProvider = ({ username, children }) => {
  const [conversations, setConversations] = useLocalStorage('conversations', []);
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);
  const { contacts } = useContacts();
  const socket = useSocket();

  // Get old conversation stored in local storage if any, and append new message to the conversation.
  const createConversation = (recipients) => {
    setConversations((prevConversations) => {
      // Return empty messages array on initial conversation.
      return [...prevConversations, { recipients, messages: [] }];
    });
  };

  // Handle messaging. Either append message to existing conversation, or create new conversation.
  const addMessageToConversation = useCallback(
    ({ recipients, text, sender }) => {
      setConversations((prevConversations) => {
        let prevConversationExists = false;
        // Pass in id to message to give React a unique key in render.
        const newMessage = { sender, messages: [{ id: uuidv4(), text }] };
        const newConversation = prevConversations.map((prevConversation) => {
          // If array between recipients exists (conversation exists), append message to conversation between recipients.
          if (arrayEquality(prevConversation.recipients, recipients)) {
            prevConversationExists = true;
            return {
              ...prevConversation,
              messages: [...prevConversation.messages, newMessage],
            };
          }
          // Return updated previous conversation.
          return prevConversation;
        });

        // Return updated previous conversation if there was one.
        if (prevConversationExists) {
          return newConversation;
        }
        // Return new or updated conversation.
        return [...prevConversations, { recipients, messages: [newMessage] }];
      });
    },
    [setConversations],
  );

  // Handle socket.io requests.
  useEffect(() => {
    if (!socket) {
      return null;
    }

    socket.on('receive-message', addMessageToConversation);

    // Close socket to prevent reruns of same request.
    return () => socket.off('receive-message', addMessageToConversation);
  }, [socket, addMessageToConversation]);

  // Send message with socket.io.
  const sendMessage = (recipients, text) => {
    socket.emit('send-message', { recipients, text });
    addMessageToConversation({ recipients, text, sender: username });
  };

  // Format conversation to display in application.
  const formattedConversations = conversations.map((conversation, index) => {
    // Find the recipient(s) in the conversation.
    const recipients = conversation.recipients.map((recipient) => {
      const recipientInContacts = contacts.find((contact) => {
        return contact.username === recipient;
      });
      const name = (recipientInContacts && recipientInContacts.username) || recipient;
      // Return recipient to display in conversation.
      return { username: recipient, name };
    });

    const messages = conversation.messages.map((message) => {
      // Find the sender(s) in the conversation's messages.
      const senderInContacts = contacts.find((contact) => {
        return contact.username === message.sender;
      });
      const name = (senderInContacts && senderInContacts.username) || message.sender;
      // fromMe flag for the sender of the message. Id passed from App component.
      const fromMe = username === message.sender;
      // Return message with flags.
      return { ...message, senderName: name, fromMe };
    });
    // Return the currently selected conversation to display.
    const selected = index === selectedConversationIndex;
    return { ...conversation, messages, recipients, selected };
  });

  const value = {
    conversations: formattedConversations,
    selectedConversation: formattedConversations[selectedConversationIndex],
    sendMessage,
    selectConversationIndex: setSelectedConversationIndex,
    createConversation,
  };

  return (
    <ConversationsContext.Provider value={value}>{children}</ConversationsContext.Provider>
  );
};

export { useConversations, ConversationsProvider };

ConversationsProvider.propTypes = {
  username: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  children: Object(PropTypes.object).isRequired,
};

ConversationsProvider.defaultProps = {
  username: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
};
