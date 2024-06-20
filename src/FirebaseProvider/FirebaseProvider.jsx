import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";
import PropTypes from 'prop-types';

export const AuthContext = createContext(null);

const FirebaseProvider = ({ children }) => {
    const googleProvider = new GoogleAuthProvider();
    
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    // google login
    const googleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    // logout
    const logout = () => {
        setUser(null);
        setLoading(true);
        return signOut(auth);
    };

    const updateUserProfile = (name, image) => {
        const currentUser = auth.currentUser;
        const photoURL = image || "./logo.png";
        return updateProfile(currentUser, { displayName: name, photoURL: photoURL })
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            }
            else {
                setUser(null);
            }
            setLoading(false);
        });
        return () => {
            return unsubscribe();
        }
    }, []);

    const data = { createUser, signInUser, googleLogin, logout, user, loading, updateUserProfile };

    return (
        <AuthContext.Provider value={ data }>
            { children }
        </AuthContext.Provider>
    );
};

FirebaseProvider.propTypes = {
    children: PropTypes.object
}

export default FirebaseProvider;