import React, { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../Firebase/Firebase.config";
import { AuthContext } from "./AuthContext";
import axios from "axios";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //sing up
  const createSingIn = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //updateProfile
  const updateUser = (updatedData) => {
    return updateProfile(auth.currentUser, updatedData);
  };

  //sign in
  const singIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  sendPasswordResetEmail
    const resetEmail = (email) => {
      return sendPasswordResetEmail(auth, email);
    }

  //google sing in
  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  //state
  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      //post req with jwt
      if (currentUser?.email) {
        axios
          .post("https://e-bikolpo-server.vercel.app/jwt", {
            email: currentUser?.email,
          })
          .then((res) => {
            localStorage.setItem("token", res.data.token);
          })
          .catch((err) => console.error("JWT Error:", err));
      } else {
        localStorage.removeItem("token");
      }
      setLoading(false);
    });
    return () => unsubscribed();
  }, []);

  //Logout
  //logout
  const logout = () => {
    localStorage.removeItem("token");
    return signOut(auth);
  };

  const authData = {
    createSingIn,
    loading,
    user,
    setUser,
    singIn,
    resetEmail,
    logout,
    googleLogin,
    updateUser,
  };
  return <AuthContext value={authData}>{children}</AuthContext>;
};

export default AuthProvider;
