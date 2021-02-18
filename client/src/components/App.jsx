import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import useLocalStorage from '../hooks/useLocalStorage';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Index from './components/Index';
import { SocketProvider } from '../contexts/SocketProvider';
import { APIProvider } from '../contexts/APIProvider';

const App = () => {
  const token = localStorage.getItem('CHAT_Token');
  // Pass user's username down throughout application.
  const [username, setUsername] = useLocalStorage('username');

  return (
    <APIProvider>
      <Switch>
        <SocketProvider token={token}>
          <Route exact path="/" component={Index} />
          <Route
            exact
            path="/register"
            component={Register}
            username={username}
            setUsername={setUsername}
          />
          <Route exact path="/login">
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            {token ? <Redirect to="/dashboard" /> : (props) => <Login {...props} />}
          </Route>
          <Route
            exact
            path="/dashboard"
            render={(props) => (
              // eslint-disable-next-line react/jsx-props-no-spreading
              <Dashboard {...props} />
            )}
          />
        </SocketProvider>
      </Switch>
    </APIProvider>
  );
};

export default App;
