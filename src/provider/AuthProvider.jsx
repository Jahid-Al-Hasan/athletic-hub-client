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
import useAxiosSecure from "../hooks/useAxiosSecure";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

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
      axiosSecure.get("/clear-cookie").catch((err) => console.log(err));
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      // authorization token request
      if (currentUser?.email) {
        axiosSecure
          .post("/jwt", {
            email: currentUser.email,
          })
          .catch((err) => {
            console.log(err);
            logOut();
          });
      }
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
