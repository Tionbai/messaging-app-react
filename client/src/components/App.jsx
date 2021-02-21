import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Index from './components/Index';
import { SocketProvider } from '../contexts/SocketProvider';
import { APIProvider } from '../contexts/APIProvider';
import { ChatProvider } from '../contexts/ChatProvider';

const App = () => {
  return (
    <APIProvider>
      <SocketProvider>
        <ChatProvider>
          <Switch>
            <Route exact path="/" component={Index} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/dashboard" component={Dashboard} />
          </Switch>
        </ChatProvider>
      </SocketProvider>
    </APIProvider>
  );
};

export default App;

// TODO: Leave chat. You can not leave chat as admin.

// TODO: Clear chat of messages

// TODO: Delete message

// TODO: Only admin can delete chat

// TODO: Make another user admin
