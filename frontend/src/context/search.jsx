import { useState, useContext, createContext } from "react";

// using createContext() we create a context and store in a SearchContext variable
const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  // using SearchProvider we access this useState from anywhere
  const [auth, setAuth] = useState({
    keyword: "",
    results: [],
  });

 
  return (
    <SearchContext.Provider value={[auth, setAuth]}>
      {children}
    </SearchContext.Provider>
  );
};

// custom hook
// we use this auth in anywhere in components
const useSearch = () => useContext(SearchContext);

export { useSearch, SearchProvider };
