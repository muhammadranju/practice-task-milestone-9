/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const registerUser = async (fullName, photo, email, password) => {
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
    setLoading(true);
    return userData;
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      unSubscribe();
    };
  }, []);

  const authInfo = {
    loading,
    user,
    setUser,
    registerUser,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
