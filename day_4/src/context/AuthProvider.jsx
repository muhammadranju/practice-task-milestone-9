/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { Navigate } from "react-router-dom";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(false);

  const registerUser = async (fullName, photo, email, password) => {
    setLoading(true);
    setIsLogin(false);
    const userData = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await signOut(auth);

    await updateProfile(auth.currentUser, {
      displayName: fullName,
      photoURL: photo,
    });

    // await sendEmailVerification(auth.currentUser);

    setUser(userData);
    setLoading(false);
    <Navigate to="/login" replace />;
    return userData;
  };

  const loginUser = (email, password) => {
    setLoading(true);
    setIsLogin(true);
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
    setIsLogin(false);
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
    isLogin,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
