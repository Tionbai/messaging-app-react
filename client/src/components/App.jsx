import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Index from './components/Index';
import { SocketProvider } from '../contexts/SocketProvider';
import { APIProvider } from '../contexts/APIProvider';
import { ChatroomProvider } from '../contexts/ChatroomProvider';

const App = () => {
  const token = localStorage.getItem('CHAT_Token');
  // Pass user's username down throughout application.

  return (
    <APIProvider>
      <SocketProvider token={token}>
        <ChatroomProvider>
          <Switch>
            <Route exact path="/" component={Index} />
            <Route exact path="/register" component={Register} />
            <Route
              exact
              path="/login"
              render={(props) => (
                /* eslint-disable-next-line react/jsx-props-no-spreading */
                <Login {...props} token={token} />
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
          </Switch>
        </ChatroomProvider>
      </SocketProvider>
    </APIProvider>
  );
};

export default App;
