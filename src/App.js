import React from 'react';
import { AuthProvider } from './Auth/context/AuthContext'
import LoginPage from './Auth/LoginPage/LoginPage';
import DashBoard from './components/Dashboard/MainAdminDashboard/MainAdminDashBoard'
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './Auth/AdminPrivateRoute'

function App() {
  return (
    <AuthProvider>
      <Switch>
        <Route path='/admin' component={LoginPage} />
        <PrivateRoute exact path='/dashboard' component={DashBoard} />
      </Switch>
    </AuthProvider>
  );
}

export default App;
