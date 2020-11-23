import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../../FireBase/fireBase';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState();
    // const [loading, setLoading] = useState(false);

    const signup = (email, PWD) => {
        return auth.createUserWithEmailAndPassword(email, PWD);
    }
    const login = (email, PWD) => {
        auth.onAuthStateChanged(user => {
            localStorage.setItem('currentUser', user.email);
        })
        return auth.signInWithEmailAndPassword(email, PWD);
    }
    const resetPassword = (email) => {
        return auth.sendPasswordResetEmail(email);
    }
    const logout = () => {
        localStorage.setItem('currentUser', '');
        return auth.signOut();
    }

    // useEffect(() => {
    //     console.log(chnageUser);
    //     const unSub = auth.onAuthStateChanged(user => {
    //         if (chnageUser) {
    //             setCurrentUser(user);
    //             localStorage.setItem('currentUser', user.email);
    //         }
    //         setLoading(false);
    //     });
    //     return unSub;
    // }, [chnageUser]);


    const value = {
        currentUser,
        setCurrentUser,
        signup,
        login,
        resetPassword,
        logout
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

