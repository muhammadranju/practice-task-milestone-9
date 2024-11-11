/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const registerUser = async (fullName, photo, email, password) => {
    setLoading(true);
    const userData = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await updateProfile(auth.currentUser, {
      displayName: fullName,
      photoURL: photo,
    });
    await sendEmailVerification(auth.currentUser);

    setUser(userData);
    setLoading(false);
    return userData;
  };

  const loginUser = (email, password) => {
    setLoading(true);
    const user = signInWithEmailAndPassword(auth, email, password);

    return user;
  };
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      unSubscribe;
    };
  }, []);

  const signOutUser = () => {
    signOut(auth);
    setUser(null);
    setLoading(false);
  };

  // provider value
  const authInfo = {
    loading,
    user,
    setUser,
    registerUser,
    signOutUser,
    setLoading,
    loginUser,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
