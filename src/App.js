import React from 'react';
import { AuthProvider } from './Auth/context/AuthContext'
import LoginPage from './Auth/LoginPage/LoginPage';
import { Route, Switch } from 'react-router-dom';

function App() {
  console.log(process.env.REACT_APP_DATABASE_URL)
  return (
    <AuthProvider>
      <Switch>
        <Route path='/admin' component={LoginPage} />
        <Route exact path='/dashboard' component={<div>dashboard</div>} />
      </Switch>
    </AuthProvider>
  );
}

export default App;
