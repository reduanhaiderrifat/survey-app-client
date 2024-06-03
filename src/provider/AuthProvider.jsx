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
import usePublic from "../hooks/usePublic";


export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
const axiosPublic = usePublic()
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
  const updateUser = async (username, imageUrl) => {
    return updateProfile(auth.currentUser, {
      displayName: username,
      photoURL: imageUrl,
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
      //get token 
      if(currentuser){
        const userInfo= {uid:currentuser?.uid}
        axiosPublic.post('/jwt',userInfo)
        .then(res=>{
          if(res.data.token){
            localStorage.setItem('token',res.data.token)
            setLoading(false);
          }
        })
      } else{
        localStorage.removeItem('token')
        setLoading(false);
      }
    
      // setLoading(false);
    });
    return () => unsuscribe();
  }, [reloader,axiosPublic]);
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
