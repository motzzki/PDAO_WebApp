import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

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
          user_group: decodedToken.user_group,
        },
      }));

      // Redirect based on user_group
      if (decodedToken.user_group === 1) {
        navigate("/user-page");
      } else if (
        decodedToken.user_group === 2 ||
        decodedToken.user_group === 3
      ) {
        navigate("/admin-page");
      }
    }
  }, [auth.token, navigate]);

  const refreshAuthToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) throw new Error("No refresh token available");

    const response = await axios.post(
      "http://localhost:8000/api/authUser/token",
      { refreshToken }
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
        user_group: decodedToken.user_group,
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

      // Redirect based on user_group
      const decodedToken = jwtDecode(accessToken);

      if (decodedToken.user_group === 1) {
        navigate("/user-page");
      } else if (
        decodedToken.user_group === 2 ||
        decodedToken.user_group === 3
      ) {
        navigate("/admin-page");
      }

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

  const isAdmin = () =>
    auth.user?.user_group === 2 || auth.user?.user_group === 3;

  return (
    <AuthContext.Provider value={{ auth, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
