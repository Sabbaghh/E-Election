import React, { useContext, useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import SecondDashboard from '../../components/Dashboards/SecondaryAdminsDashboard/SecondaryAdminsDashboard';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const currentUser = localStorage.getItem('currentUser');
    const [isMainAdmin, setIsMainAdmin] = useState(false);

    useEffect(() => {
        if (currentUser) {
            axios.get(`https://e-election-e4023.firebaseio.com/admins/${(currentUser).split(".")[0]}/auth.json`)
                .then(res => {
                    setIsMainAdmin(res.data);
                }).catch(err => console.log(err));
        }
    }, [currentUser])


    return (
        <Route
            {...rest}
            render={
                props => {
                    // change it later sabbagh
                    if (currentUser) {
                        return isMainAdmin ?
                            <Component {...props} /> : <SecondDashboard {...props} />
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