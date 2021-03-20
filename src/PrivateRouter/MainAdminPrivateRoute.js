import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthContext } from '../Contexts/AuthContext'
import {} from '../Contexts/AuthContext'

const MainAdminPrivateRoute = ({ component: Component, ...rest }) => {
	const currentUser = useContext(AuthContext).currentUser
	return (
		<Route
			{...rest}
			render={(props) => {
				return currentUser ? <Component {...props} /> : <Redirect to='/admin' />
			}}
		></Route>
	)
}

export default MainAdminPrivateRoute
