import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import app from "../firebase/firebase.config";
import { AuthContext } from "./authContext";
import useAxiosPublic from "../hooks/useAxiosPublic";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const AuthProviderContext = ({ children }) => {
  const axiosPublic = useAxiosPublic();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
 
  const createUserWithEmailPass = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInWithEmailPass = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };
  // google signIn
  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };
  // update the user profile
  const updateUserProfile = (name) => {
    setLoading(true);
    return updateProfile(auth.currentUser, name);
  };
  // 3. User State Observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Get Token from backend
        const userInfo = { email: currentUser.email };
        axiosPublic.post("/jwt", userInfo).then((res) => {
          if (res.data.success) {
             // Token set in cookies
             setLoading(false);
          }
        });
      } else {
        // Remove token on logout
        axiosPublic.post("/logout").then(() => {
           setLoading(false);
        });
      }
    });
    return () => unsubscribe();
  }, [axiosPublic]);

  const authInfo = {
    user,
    loading,
    createUserWithEmailPass,
    signInWithEmailPass,
    logOut,
    signInWithGoogle,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};
