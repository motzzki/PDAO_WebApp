import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import PrivateRoute from "./layout/ProtectedRoute.jsx";
import MainLayout from "./layout/MainLayout.jsx";
import GraphReport from "./pages/GraphReport.jsx";
import Registration from "./pages/Registration.jsx";
import RegisteredPwd from "./pages/RegisteredPwd.jsx";
import Barangay from "./pages/Barangay.jsx";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/"
        element={
          <PrivateRoute>
            <MainLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="/graph_report" element={<GraphReport />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/registered_pwd" element={<RegisteredPwd />} />
        <Route path="/barangay" element={<Barangay />} />
      </Route>
    </Routes>
  );
}

export default App;
