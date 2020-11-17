import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../../FireBase/fireBase';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    const signup = (email, PWD) => {
        return auth.createUserWithEmailAndPassword(email, PWD);
    }
    const login = (email, PWD) => {
        return auth.signInWithEmailAndPassword(email, PWD);
    }
    const resetPassword = (email) => {
        return auth.sendPasswordResetEmail(email);
    }
    const logout = () => {
        return auth.signOut();
    }

    useEffect(() => {
        const unSub = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
        });
        return unSub;
    }, []);


    const value = {
        currentUser,
        signup,
        login,
        resetPassword,
        logout
    }
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

