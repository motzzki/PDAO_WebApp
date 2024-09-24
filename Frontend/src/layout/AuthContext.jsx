import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);
``;
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: localStorage.getItem("accessToken") || null,
    isAuthenticated: !!localStorage.getItem("accessToken"),
    user: null,
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.token) {
      const decodedToken = jwtDecode(auth.token);
      setAuth((prev) => ({
        ...prev,
        user: {
          first_name: decodedToken.first_name,
          role: decodedToken.role,
        },
      }));
    }
  }, [auth.token]);

  useEffect(() => {
    const checkTokenExpiry = async () => {
      if (!auth.token) return;

      const decodedToken = jwtDecode(auth.token);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        try {
          await refreshAuthToken();
        } catch (error) {
          clearToken();
          navigate("/login");
          alert("Session expired. Please log in again.");
        }
      }
    };

    checkTokenExpiry();
    const interval = setInterval(checkTokenExpiry, 60000);

    return () => clearInterval(interval);
  }, [auth.token, navigate]);

  const refreshAuthToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) throw new Error("No refresh token available");

    const response = await axios.post(
      "http://localhost:8000/api/authUser/token",
      {
        refreshToken,
      }
    );

    handleToken(response.data.accessToken, refreshToken);
  };

  const handleToken = (accessToken, refreshToken) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    const decodedToken = jwtDecode(accessToken);
    setAuth({
      token: accessToken,
      isAuthenticated: true,
      user: {
        first_name: decodedToken.first_name,
        role: decodedToken.role,
      },
    });
  };

  const clearToken = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setAuth({ token: null, isAuthenticated: false, user: null });
  };

  const login = async (username, password) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/authUser/login",
        { username, password },
        { headers: { "Content-Type": "application/json" } }
      );

      const { accessToken, refreshToken } = response.data;
      handleToken(accessToken, refreshToken);
      return "success";
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error("Incorrect username or password");
      }
      throw new Error("An error occurred during login");
    }
  };

  const logout = () => {
    clearToken();
    navigate("/");
  };

  const isAdmin = () => auth.user?.role === "admin";

  return (
    <AuthContext.Provider value={{ auth, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
