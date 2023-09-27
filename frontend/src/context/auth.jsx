import { useState, useContext, createContext, useEffect } from "react";
import axios from "axios";

// using createContext() we create a context and store in a AuthContext variable
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // using AuthProvider we access this useState from anywhere
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  // default axios this is
  axios.defaults.headers.common["Authorization"] = auth?.token;

  // here we take data with local storage
  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parseData = JSON.parse(data);
      setAuth({
        ...auth,
        user: parseData.user,
        token: parseData.token,
      });
    }
  }, []);
  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

// custom hook
// we use this auth in anywhere in components
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
