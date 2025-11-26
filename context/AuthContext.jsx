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

//   //  function
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

// // src/context/AuthContext.js
// import React, { createContext, useState, useContext, useEffect } from "react";

// // Create Context
// const AuthContext = createContext();

// // Custom hook to access auth context - MAKE SURE THIS IS EXPORTED
// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };

// // AuthProvider component
// export const AuthProvider = ({ children }) => {
//   const getInitialAuthState = () => {
//     const localToken = localStorage.getItem("token");
//     return !!localToken;
//   };

//   const [isAuthenticated, setIsAuthenticated] = useState(getInitialAuthState());

//   useEffect(() => {
//     console.log("isAuthenticated", isAuthenticated);
//   }, [isAuthenticated]);

//   const login = (token) => {
//     if (token) {
//       localStorage.setItem("token", token);
//     }
//     setIsAuthenticated(true);
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("phone");
//     document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
//     document.cookie = "phone=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
//     setIsAuthenticated(false);
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// src/context/AuthContext.js
// import React, { createContext, useState, useContext, useEffect } from "react";

// import axios from "../api/axios";

// const AuthContext = createContext();

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [user, setUser] = useState(null);

//   // Verify authentication on mount
//   useEffect(() => {
//     verifyAuth();
//   }, []);

//   const verifyAuth = async () => {
//     try {
//       // Call your backend to verify if user is authenticated
//       const response = await axios.get("/auth/verify");

//       console.log("Auth verification response:", response);

//       if (response?.data?.authenticated) {
//         console.log("response from verifyAuth", response.data.authenticated);
//         setIsAuthenticated(true);
//         setUser(response.data.user);
//       } else {
//         // setIsAuthenticated(false);
//         setUser(null);
//       }
//     } catch (error) {
//       console.error("Auth verification failed:", error);
//       setIsAuthenticated(false);
//       setUser(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const login = async (credentials) => {
//     console.log("credentials", credentials);
//     try {
//       const response = await axios.post(
//         "/auth/admin_login",

//         credentials
//       );

//       console.log("response from login", response);

//       if (response?.data?.success) {
//         console.log("Login successful:", response);
//         setIsAuthenticated(true);
//         setUser(response?.data?.admin);
//         return { success: true };
//       } else {
//         const error = await response.data;
//         return { success: false, error: error.message };
//       }
//     } catch (error) {
//       console.error("Login failed:", error);
//       return { success: false, error: "Login failed" };
//     }
//   };

//   const logout = async () => {
//     try {
//       await fetch("/api/auth/logout", {
//         method: "POST",
//         credentials: "include",
//       });
//     } catch (error) {
//       console.error("Logout failed:", error);
//     } finally {
//       setIsAuthenticated(false);
//       setUser(null);
//     }
//   };

//   const value = {
//     isAuthenticated,
//     user,
//     login,
//     logout,
//     loading,
//     verifyAuth,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };










import React, { createContext, useState, useContext, useEffect } from "react";

import axios from "../api/axios";

const AuthContext = createContext();


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};


export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // ⬅️ Start with true
  const [user, setUser] = useState(null);

  // Verify authentication on mount
  useEffect(() => {
    verifyAuth();
  }, []);

  const verifyAuth = async () => {
    try {
      setLoading(true); // ⬅️ Set loading to true when checking
      const response = await axios.get("/auth/verify");

      console.log("Auth verification response:", response);

      if (response?.data?.authenticated) {
        console.log("response from verifyAuth", response.data.authenticated);
        setIsAuthenticated(true);
        setUser(response.data.user);
      } else {
        setIsAuthenticated(false); // ⬅️ Changed: explicitly set to false
        setUser(null);
      }
    } catch (error) {
      console.error("Auth verification failed:", error);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false); // ⬅️ Always set loading to false when done
    }
  };

  const login = async (credentials) => {
    console.log("credentials", credentials);
    try {
      const response = await axios.post("/auth/admin_login", credentials);

      console.log("response from login", response);

      if (response?.data?.success) {
        console.log("Login successful:", response);
        setIsAuthenticated(true);
        setUser(response?.data?.admin);
        // Store token if needed
        if (response?.data?.token) {
          localStorage.setItem("token", response.data.token);
        }
        return { success: true };
      } else {
        const error = await response.data;
        return { success: false, error: error.message };
      }
    } catch (error) {
      console.error("Login failed:", error);
      return { success: false, error: "Login failed" };
    }
  };

  const logout = async () => {
    try {
      await axios.post("/auth/logout"); // ⬅️ Use your axios instance
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsAuthenticated(false);
      setUser(null);
      localStorage.removeItem("token"); // ⬅️ Clear token
    }
  };

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
    loading, // ⬅️ Make sure to include loading
    verifyAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};