import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import SecondDashboard from '../../components/SecondaryAdminsDashboard/SecondaryAdminsDashboard';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const currentUser = useContext(AuthContext).currentUser;
    return (
        <Route
            {...rest}
            render={
                props => {
                    // return currentUser.email ==='test@test.com' ? <Component {...props} /> : <Redirect to='/login' />
                    if (currentUser) {
                        return currentUser.email === 'admin@admin.com' ? <Component {...props} /> : <SecondDashboard {...props} />
                    } else {
                        return <Redirect to='/admin' />
                    }
                }
            }
        >
        </Route>
    );
};

export default PrivateRoute;