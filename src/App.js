import React from 'react';
import LoginPage from './Auth/LoginPage/LoginPage';
import { Route } from 'react-router-dom';

function App() {
  console.log(process.env.REACT_APP_DATABASE_URL)
  return (
    <div>
      <Route path='/admin' component={LoginPage} />
    </div>
  );
}

export default App;
