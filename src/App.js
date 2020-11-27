import React from 'react';
import { AuthProvider } from './Auth/context/AuthContext'
import LoginPage from './components/Pages/LoginPage/LoginPage';
import DashBoard from './components/Pages/Dashboards/MainAdminDashboard/MainAdminDashBoard'
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
