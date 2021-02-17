import React, { useRef } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import './App.css';
import useLocalStorage from '../hooks/useLocalStorage';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Index from './components/Index';
import { ContactsProvider } from '../contexts/ContactsProvider';
import { ConversationsProvider } from '../contexts/ConversationsProvider';
import { SocketProvider } from '../contexts/SocketProvider';
import { UsersProvider } from '../contexts/UsersProvider';

const App = () => {
  // Pass user's username down throughout application.
  const [username, setUsername] = useLocalStorage('username');
  const usernameRef = useRef();
  const passwordRef = useRef();

  const dashboard = (
    <SocketProvider username={username}>
      <UsersProvider>
        <ContactsProvider>
          <ConversationsProvider username={username}>
            <Route
              exact
              path="/dashboard"
              component={Dashboard}
              username={username}
              setUsername={setUsername}
            />
          </ConversationsProvider>
        </ContactsProvider>
      </UsersProvider>
    </SocketProvider>
  );

  return (
    <Router history={createBrowserHistory()}>
      <Switch>
        <UsersProvider>
          <Route exact path="/" component={Index} />
          <Route
            exact
            path="/register"
            component={Register}
            username={username}
            usernameRef={usernameRef}
            passwordRef={passwordRef}
            setUsername={setUsername}
          />
          <Route
            exact
            path="/login"
            component={Login}
            username={username}
            usernameRef={usernameRef}
            passwordRef={passwordRef}
            setUsername={setUsername}
          />
          {dashboard}
        </UsersProvider>
      </Switch>
    </Router>
  );
};

export default App;
