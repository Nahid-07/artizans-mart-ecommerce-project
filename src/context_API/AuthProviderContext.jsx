import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  GoogleAuthProvider, 
  signInWithPopup,
  updateProfile
} from "firebase/auth";
import app from "../firebase/firebase.config";
import { AuthContext } from "./authContext";

const auth = getAuth(app);
const provider = new GoogleAuthProvider()

export const AuthProviderContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. Unified and consistent name for loader/loading
  const createUserWithEmailPass = (email, password) => {
    setLoading(true); // 2. Update loading state on every auth function call
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
  const signInWithGoogle = ()=>{
    setLoading(true);
    return signInWithPopup(auth,provider)
  }
  // 3. User State Observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // 4. Set loading to false once state is determined
    });
    // Cleanup function to prevent memory leaks
    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    createUserWithEmailPass,
    signInWithEmailPass,
    logOut,
    signInWithGoogle
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};
