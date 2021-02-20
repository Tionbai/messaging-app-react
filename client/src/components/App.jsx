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
  return (
    <APIProvider>
      <SocketProvider>
        <ChatroomProvider>
          <Switch>
            <Route exact path="/" component={Index} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/dashboard" component={Dashboard} />
          </Switch>
        </ChatroomProvider>
      </SocketProvider>
    </APIProvider>
  );
};

export default App;
