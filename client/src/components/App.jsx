import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Index from './components/Index';
import { SocketProvider } from '../contexts/SocketProvider';
import { APIProvider } from '../contexts/APIProvider';

const App = () => {
  const token = localStorage.getItem('CHAT_Token');
  // Pass user's username down throughout application.

  return (
    <APIProvider>
      <Switch>
        <SocketProvider token={token}>
          <Route exact path="/" component={Index} />
          <Route exact path="/register" component={Register} />
          <Route
            exact
            path="/login"
            render={(props) => (
              /* eslint-disable-next-line react/jsx-props-no-spreading */
              <Login {...props} />
            )}
          />
          <Route
            exact
            path="/dashboard"
            render={(props) => (
              // eslint-disable-next-line react/jsx-props-no-spreading
              <Dashboard {...props} token={token} />
            )}
          />
        </SocketProvider>
      </Switch>
    </APIProvider>
  );
};

export default App;
