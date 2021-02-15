import React, { useRef } from 'react';
import './App.css';
import useLocalStorage from '../hooks/useLocalStorage';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { ContactsProvider } from '../contexts/ContactsProvider';
import { ConversationsProvider } from '../contexts/ConversationsProvider';
import { SocketProvider } from '../contexts/SocketProvider';
import { UsersProvider } from '../contexts/UsersProvider';

export default function App() {
  // Pass user's username down throughout application.
  const [username, setUsername] = useLocalStorage('username');
  const usernameRef = useRef();
  const passwordRef = useRef();

  const dashboard = (
    <SocketProvider username={username}>
      <UsersProvider>
        <ContactsProvider>
          <ConversationsProvider username={username}>
            <Dashboard username={username} setUsername={setUsername} />
          </ConversationsProvider>
        </ContactsProvider>
      </UsersProvider>
    </SocketProvider>
  );

  return (
    <>
      {username ? (
        dashboard
      ) : (
        <UsersProvider>
          <Login
            usernameRef={usernameRef}
            passwordRef={passwordRef}
            setUsername={setUsername}
          />
        </UsersProvider>
      )}
    </>
  );
}
