// // src/context/AuthContext.js

// // Create Context
// const AuthContext = createContext();

// // Custom hook to access auth context
// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };

// // AuthProvider component to wrap around your app and provide auth context
// export const AuthProvider = ({ children }) => {
//   // Check if token exists in localStorage or cookie
//   const getInitialAuthState = () => {
//     // Check localStorage first
//     const localToken = localStorage.getItem("token");
//     if (localToken) return true;
    
//     // Then check cookies
//     const cookieToken = document.cookie.replace(
//       /(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/,
//       "$1"
//     );
//     return !!cookieToken; // Convert to boolean
//   };

//   const [isAuthenticated, setIsAuthenticated] = useState(getInitialAuthState());

//   useEffect(() => {
//     console.log("isAuthenticated", isAuthenticated);
//     console.log("token in localStorage", localStorage.getItem("token"));
//   }, [isAuthenticated]);

//   // Login function
//   const login = (token) => {
//     if (token) {
//       localStorage.setItem("token", token);
//     }
//     setIsAuthenticated(true);
//   };

//   // Logout function
//   const logout = () => {
//     localStorage.removeItem("token");
//     // Clear cookie if needed
//     document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
//     setIsAuthenticated(false);
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };


// src/context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from "react";

// Create Context
const AuthContext = createContext();

// Custom hook to access auth context - MAKE SURE THIS IS EXPORTED
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const getInitialAuthState = () => {
    const localToken = localStorage.getItem("token");
    return !!localToken;
  };

  const [isAuthenticated, setIsAuthenticated] = useState(getInitialAuthState());

  useEffect(() => {
    console.log("isAuthenticated", isAuthenticated);
  }, [isAuthenticated]);

  const login = (token) => {
    if (token) {
      localStorage.setItem("token", token);
    }
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("phone");
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "phone=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};