import React from 'react';
import './App.css';
import useLocalStorage from '../hooks/useLocalStorage';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { ContactsProvider } from '../contexts/ContactsProvider';
import { ConversationsProvider } from '../contexts/ConversationsProvider';
import { SocketProvider } from '../contexts/SocketProvider';

export default function App() {
  // Pass user's id down throughout application.
  const [id, setId] = useLocalStorage('id');

  const dashboard = (
    <SocketProvider id={id}>
      <ContactsProvider>
        <ConversationsProvider id={id}>
          <Dashboard id={id} />
        </ConversationsProvider>
      </ContactsProvider>
    </SocketProvider>
  );

  return <>{id ? dashboard : <Login setId={setId} />}</>;
}
