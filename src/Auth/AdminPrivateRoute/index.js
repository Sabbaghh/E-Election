import React, { useEffect, useState, useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
// import axios from 'axios';
import { AuthContext } from '../../Auth/context/AuthContext'
import { ProjectFireStore } from '../../FireBase/fireBase'
import SecondDashboard from '../../components/Pages/Dashboards/SecondaryAdminsDashboard/SecondaryAdminsDashboard';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const [isMainAdmin, setIsMainAdmin] = useState('');
    const currentUser = useContext(AuthContext).currentUser;

    useEffect(() => {
        const getAdminType = () => {
            if (currentUser) {
                ProjectFireStore
                    .collection('Admins')
                    .doc(currentUser.email).get()
                    .then(res => {
                        setIsMainAdmin(res.data()['adminType']);
                    })
                    .catch(err => console.log(err));
            } else {
                return <Redirect to='/admin' />
            }
        }
        return getAdminType();
    }, [isMainAdmin, currentUser])


    return (
        <Route
            {...rest}
            render={
                props => {
                    if (isMainAdmin) {
                        if (isMainAdmin === 'MainAdmin') {
                            return <Component {...props} />
                        } else if (isMainAdmin === 'secondaryAdmin') {
                            return <SecondDashboard {...props} />
                        } else {
                            return <Redirect to='/admin' />
                        }
                    }
                }
            }
        >
        </Route>
    );
};

export default PrivateRoute;