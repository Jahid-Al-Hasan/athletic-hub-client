import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import auth from "../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return result;
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (email, password) => {
    try {
      setLoading(true);
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return result;
    } finally {
      setLoading(false);
    }
  };

  const profileUpdate = async (name, photoURL) => {
    try {
      setLoading(true);
      return await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photoURL,
      });
    } finally {
      setLoading(false);
    }
  };

  const loginUser = async (email, password) => {
    try {
      setLoading(true);
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result;
    } finally {
      setLoading(false);
    }
  };

  const logOut = async () => {
    try {
      setLoading(true);
      return await signOut(auth);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const userInfo = {
    loading,
    user,
    signInWithGoogle,
    createUser,
    profileUpdate,
    loginUser,
    logOut,
  };
  return (
    <div>
      <AuthContext value={userInfo}>{children}</AuthContext>
    </div>
  );
};

export default AuthProvider;
