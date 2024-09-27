import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import PrivateRoute from "./layout/ProtectedRoute.jsx";
import MainLayout from "./layout/MainLayout.jsx";
import GraphReport from "./pages/GraphReport.jsx";
import Registration from "./pages/Registration.jsx";
import RegisteredPwd from "./pages/RegisteredPwd.jsx";
import Barangay from "./pages/Barangay.jsx";
import AddUser from "./pages/AddUser.jsx";
import RegisteredUsers from "./pages/RegisteredUsers.jsx";
import Facilities from "./pages/Facilities.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import UserPage from "./pages/UserPage.jsx";
import UserHeader from "./components/UserHeader.jsx";
import FooterUser from "./components/UserFooter.jsx";
import UserFacilities from "./pages/UserFacilities.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/landing_page" />} />
      <Route path="/landing_page" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      {/* <Route path="Footer" element={<Footer />} /> */}
      <Route path="UserFacilities" element={<UserFacilities />} />
      <Route path="UserPage" element={<UserPage />} />

      <Route
        path="/*"
        element={
          <PrivateRoute>
            <MainLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="graph_report" element={<GraphReport />} />
        <Route path="registration" element={<Registration />} />
        <Route path="registered_pwd" element={<RegisteredPwd />} />
        <Route path="barangay" element={<Barangay />} />
        <Route path="add_user" element={<AddUser />} />
        <Route path="registered_users" element={<RegisteredUsers />} />
        <Route path="facilities" element={<Facilities />} />
      </Route>
    </Routes>
  );
}

export default App;
