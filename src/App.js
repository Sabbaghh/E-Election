import React from 'react';
import { AuthProvider } from './Contexts/AuthContext'
import LoginPage from './LoginPage/LoginPage';
import DashBoard from './MainAdminDashboard/MainAdminDashBoard'
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRouter/AdminPrivateRouter'

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
