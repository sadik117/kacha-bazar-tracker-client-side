import React, { createContext, useEffect, useState } from "react";
import app from "./firebase.config";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  // updatePassword,
  updateProfile,
} from "firebase/auth";
import { toast } from "react-toastify";

// Context export
export const AuthContext = createContext();

// Firebase auth instance
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //  Create user
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //  Update Firebase profile
  const updateUserProfile = (profile) => {
    return updateProfile(auth.currentUser, profile);
  };

  //  Sign in user
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //  Google sign in
  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  //  Logout and token remove
  const logOut = () => {
    localStorage.removeItem("access-token"); // Clear JWT
    signOut(auth)
      .then(() => {
        toast.success("Signout successful!");
      })
      .catch((error) => {
        toast.error("Signout failed: " + error.message);
      });
  };

  //  Handle user state and token on auth change
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (currentUser) {
        try {
          const res = await fetch("http://localhost:3000/jwt", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: currentUser.email }),
          });

          const data = await res.json();
          localStorage.setItem("access-token", data.token);
        } catch (err) {
          console.error("Failed to fetch JWT token:", err);
        }
      } else {
        localStorage.removeItem("access-token"); 
      }
    });

    return () => unSubscribe();
  }, []);

  // //  Change password
  // const forgotPass = (user, newPassword) => {
  //   return updatePassword(user, newPassword);
  // };

  const authData = {
    user,
    setUser,
    loading,
    setLoading,
    createUser,
    signIn,
    logOut,
    updateUserProfile,
    googleSignIn,
    // forgotPass,
  };

  return (
    <AuthContext.Provider value={authData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
