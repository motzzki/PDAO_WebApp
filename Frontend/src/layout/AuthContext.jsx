import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Ensure jwt-decode is imported correctly

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState({
    token: localStorage.getItem("accessToken") || null,
    isAuthenticated: !!localStorage.getItem("accessToken"),
    user: null,
  });

  useEffect(() => {
    if (auth.token) {
      const decodedUser = jwtDecode(auth.token);
      setAuth((prev) => ({ ...prev, user: decodedUser }));
    } else {
      setAuth((prev) => ({ ...prev, user: null }));
    }
  }, [auth.token]);

  useEffect(() => {
    if (auth.isAuthenticated && auth.user) {
      if (auth.user.user_groups === 3) {
        navigate("/user");
      } else if ([1, 2].includes(auth.user.user_groups)) {
        navigate("/admin");
      }
    }
  }, [auth.isAuthenticated, auth.user]);

  const refreshAuthToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) throw new Error("No refresh token available");

    try {
      const response = await axios.post(
        "http://localhost:8000/api/authUser/token",
        { refreshToken }
      );
      handleToken(response.data.accessToken, refreshToken);
    } catch (error) {
      console.error("Error refreshing token:", error);
      logout();
    }
  };

  const handleToken = (accessToken, refreshToken) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    const decodedUser = jwtDecode(accessToken);
    setAuth({ token: accessToken, isAuthenticated: true, user: decodedUser });
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
      handleToken(response.data.accessToken, response.data.refreshToken);
      return "success";
    } catch (error) {
      console.error("Login error:", error);
      const errorMessage =
        error.response?.data?.error || "An error occurred during login";
      throw new Error(errorMessage);
    }
  };

  const logout = () => {
    clearToken();
    navigate("/");
  };

  const isAdmin = () =>
    auth.user?.user_groups === 1 || auth.user?.user_groups === 2;

  return (
    <AuthContext.Provider
      value={{ auth, login, logout, isAdmin, refreshAuthToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
