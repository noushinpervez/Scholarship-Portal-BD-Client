import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";
import PropTypes from 'prop-types';

export const AuthContext = createContext(null);

const FirebaseProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();

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

    const updateUserProfile = async (name, image) => {
        const currentUser = auth.currentUser;
        const photoURL = image || "https://w7.pngwing.com/pngs/129/292/png-transparent-female-avatar-girl-face-woman-user-flat-classy-users-icon.png";
        await updateProfile(currentUser, { displayName: name, photoURL: photoURL });
        setUser({ ...currentUser, displayName: name, photoURL: photoURL });
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