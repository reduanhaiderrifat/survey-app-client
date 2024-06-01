import {
  GoogleAuthProvider,
  TwitterAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../firebase/Firebase.config";

export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [reloader, setReloader] = useState(false);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();
  const twitterProvider = new TwitterAuthProvider();
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const singInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const googleUser = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };
  const twitterhUser = () => {
    setLoading(true);
    return signInWithPopup(auth, twitterProvider);
  };
  const updateUser = async (username, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: username,
      photoURL: photo,
    }).then(() => {
      setReloader(Math.random());
    });
  };
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };
  useEffect(() => {
    const unsuscribe = onAuthStateChanged(auth, (currentuser) => {
      setUser(currentuser);
      //   const loggedUser = { email: currentuser?.email };
      //   if (currentuser) {
      //     axiosSecure.post(`/jwt`, loggedUser).then(() => {
      //       setLoading(false);
      //     });
      //   } else {
      //     axiosSecure.post(`/logout`, loggedUser).then(() => {
      //       setLoading(false);
      //     });
      //   }
      setLoading(false);
    });
    return () => unsuscribe();
  }, [reloader]);
  const authInfo = {
    createUser,
    singInUser,
    googleUser,
    twitterhUser,
    updateUser,
    logOut,
    setLoading,
    loading,
    user,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
