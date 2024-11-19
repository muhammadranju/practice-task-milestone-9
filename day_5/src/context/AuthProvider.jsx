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

export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(false);

  const signupController = async (email, password, name, photo) => {
    setLoading(true);
    setIsLogin(false);
    const userData = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log(userData);
    await signOut(auth);

    await updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });

    // await sendEmailVerification(auth.currentUser);

    setUser(userData);
    setLoading(false);

    return userData;
  };

  const loginController = (email, password) => {
    setLoading(true);
    setIsLogin(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logoutController = () => {
    signOut(auth);
  };

  const forgotPasswordController = () => {
    console.log("forgot password");
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

  const context = {
    user,
    isLogin,
    loginController,
    signupController,
    logoutController,
    forgotPasswordController,
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
