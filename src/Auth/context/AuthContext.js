import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../../FireBase/fireBase'
const AuthContext = createContext()
export const useAuth = () => {
    useContext(AuthContext);
}
export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    const signup = (email, PWD) => {
        return auth.createUserWithEmailAndPassword(email, PWD);
    }

    useEffect(() => {
        const unSub = auth.onAuthStateChanged(user => {
            setLoading(false);
            setCurrentUser(user);
        });
    }, [])

    const value = {
        currentUser,
        signup
    }
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

