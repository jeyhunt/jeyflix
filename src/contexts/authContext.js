import React, { useContext, useState, useEffect } from "react";
import { auth } from "../helper/firebase";

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const signup = (email, password) => {
    return auth
      .createUserWithEmailAndPassword(email, password)
      .catch((error) => {
        setErrorMsg(error.message);
      });
  };

  const signin = (email, password) => {
    return auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => setErrorMsg(error.message));
  };

  const signout = () => {
    return auth.signOut();
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    signin,
    errorMsg,
    signout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
