import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import auth from "./../firebase/firebase.config";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const axiosPublic = useAxiosPublic();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const emailPasswordRegister = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const emailPasswordLogIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };
  const logOut = async () => {
    setLoading(true);
    return signOut(auth);
  };
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        //get token and set to local storage
        // console.log(currentUser);
        // console.log(userInfo);
        setUser(currentUser);
        setLoading(false);
      } else {
        // remove token from local storage
        setUser(null);

        setLoading(false);
      }
    });
    return () => unSubscribe();
  }, [axiosPublic]);
  const authInfo = {
    emailPasswordRegister,
    emailPasswordLogIn,
    setLoading,
    googleLogin,
    loading,
    user,
    setUser,
    logOut,
  };
  return (
    <div>
      <AuthContext.Provider value={authInfo}>
        {children} <ToastContainer />
      </AuthContext.Provider>
    </div>
  );
};

export default AuthProvider;
