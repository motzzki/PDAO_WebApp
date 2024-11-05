import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { host } from "../apiRoutes";

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
      } else if (auth.user.user_groups === 1) {
        navigate("/admin");
      } else {
        navigate("/staff");
      }
    }
  }, [auth.isAuthenticated, auth.user]);

  const refreshAuthToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) throw new Error("No refresh token available");

    try {
      const response = await axios.post(`${host}/api/authUser/token`, {
        refreshToken,
      });
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

  const getLoggedUser = async () => {
    if (!auth.isAuthenticated || !auth.user)
      throw new Error("User not authenticated");
    try {
      const response = await axios.get(
        `${host}/api/pwdInfo/logged_user/${auth.user.id}`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(
        "Error fetching logged user info:",
        error.response ? error.response.data : error.message
      );
      throw new Error("Failed to fetch user info");
    }
  };

  const getEmployee = async () => {
    if (!auth.isAuthenticated || !auth.user)
      throw new Error("Employee not authenticated");
    try {
      const response = await axios.get(
        `${host}/api/authUser/get-employee/${auth.user.id}`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      const employeeData = response.data;

      let userRole;
      if (employeeData.user_group === 1) {
        userRole = "Administrator";
      } else if (employeeData.user_group === 2) {
        userRole = "Staff";
      }

      return {
        ...employeeData,
        role: userRole,
      };
    } catch (error) {
      console.error(
        "Error fetching logged user info:",
        error.response ? error.response.data : error.message
      );
      throw new Error("Failed to fetch user info");
    }
  };

  const clearToken = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setAuth({ token: null, isAuthenticated: false, user: null });
  };

  const login = async (username, password) => {
    try {
      const response = await axios.post(
        `${host}/api/authUser/login`,
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
      value={{
        auth,
        login,
        logout,
        isAdmin,
        refreshAuthToken,
        getLoggedUser,
        getEmployee,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
