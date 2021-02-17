import React, { useState, useRef } from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import './App.css';
import useLocalStorage from '../hooks/useLocalStorage';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { ContactsProvider } from '../contexts/ContactsProvider';
import { ConversationsProvider } from '../contexts/ConversationsProvider';
import { SocketProvider } from '../contexts/SocketProvider';
import { UsersProvider } from '../contexts/UsersProvider';

export default function App() {
  // Pass user's email down throughout application.
  const [email, setEmail] = useLocalStorage('email');
  const [loggedIn, setLoggedIn] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();

  const dashboard = (
    <SocketProvider email={email}>
      <UsersProvider>
        <ContactsProvider>
          <ConversationsProvider email={email}>
            <Route
              exact
              path="/dashboard"
              component={Dashboard}
              email={email}
              setEmail={setEmail}
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
          <Route exact path="/">
            {loggedIn ? <Redirect to="/dashboard" /> : <Redirect to="/login" />}
          </Route>
          <Route
            exact
            path="/register"
            component={Register}
            email={email}
            emailRef={emailRef}
            passwordRef={passwordRef}
            setEmail={setEmail}
          />
          <Route
            exact
            path="/login"
            component={Login}
            email={email}
            emailRef={emailRef}
            passwordRef={passwordRef}
            setEmail={setEmail}
            setLoggedIn={setLoggedIn}
          />
          {dashboard}
        </UsersProvider>
      </Switch>
    </Router>
  );
}
