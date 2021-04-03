import React from 'react'
import { AuthProvider } from './Contexts/AuthContext'
import LoginPage from './LoginPage/LoginPage'
import DashBoard from './MainAdminDashboard/MainAdminDashBoard'
import DashBoard2 from './SecondaryAdminsDashboard/SecondaryAdminsDashboard'
import { Route, Switch } from 'react-router-dom'
import MainAdminPrivateRoute from './PrivateRouter/MainAdminPrivateRoute'

function App() {
	return (
		<AuthProvider>
			<Switch>
				<Route path='/admin' component={LoginPage} />
				{/* <Route path='/dev' component={DashBoard2} /> */}
				<MainAdminPrivateRoute exact path='/dashboard' component={DashBoard} />
				<MainAdminPrivateRoute
					exact
					path='/dashboard2'
					component={DashBoard2}
				/>
			</Switch>
		</AuthProvider>
	)
}

export default App
