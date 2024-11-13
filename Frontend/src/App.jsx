import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import GraphReport from "./pages/GraphReport.jsx";
import Registration from "./pages/Registration.jsx";
import RegisteredPwd from "./pages/RegisteredPwd.jsx";
import Barangay from "./pages/Barangay.jsx";
import AddUser from "./pages/AddUser.jsx";
import RegisteredUsers from "./pages/RegisteredUsers.jsx";
import Facilities from "./pages/Facilities.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import UserPage from "./pages/UserPage.jsx";
import AddHelp from "./pages/AddHelp.jsx";

import UserFacilities from "./pages/UserFacilities.jsx";
import AdminLayout from "./layout/AdminLayout.jsx";
import UserLayout from "./layout/UserLayout.jsx";
import ProtectedRoute from "./layout/ProtectedRoute.jsx";
import PwdInfo from "./pages/PwdInfo.jsx";
import StaffLayout from "./layout/StaffLayout.jsx";
import StaffDashboard from "./pages/StaffDashboard.jsx";
import StaffSidebar from "./components/StaffSidebar.jsx";
import HeatMap from "./pages/HeatMap.jsx";
import EmployeeNotification from "./pages/EmployeeNotification.jsx";
import MyAccount from "./pages/MyAccount.jsx";
import UserAccounts from "./pages/UserAccounts.jsx";
import Custom404 from "./pages/Custom404.jsx";
import BirthdayCashGift from "./pages/BirthdayCashGift.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/landing_page" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/admin/*"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="graph_report" element={<GraphReport />} />
        <Route path="registration" element={<Registration />} />
        <Route path="registered_pwd" element={<RegisteredPwd />} />
        <Route path="barangay" element={<Barangay />} />
        <Route path="add_user" element={<AddUser />} />
        <Route path="registered_users" element={<RegisteredUsers />} />
        <Route path="facilities" element={<Facilities />} />
        <Route path="addhelp" element={<AddHelp />} />
        <Route path="heatmap" element={<HeatMap />} />
        <Route path="notif" element={<EmployeeNotification />} />
        <Route path="myaccount" element={<MyAccount />} />
        <Route path="accounts" element={<UserAccounts />} />
        <Route path="cashgift" element={<BirthdayCashGift />} />
      </Route>

      <Route
        path="/staff/*"
        element={
          <ProtectedRoute>
            <StaffLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<StaffDashboard />} />
        <Route path="dashboard" element={<StaffSidebar />} />
        <Route path="graph_report" element={<GraphReport />} />
        <Route path="registration" element={<Registration />} />
        <Route path="registered_pwd" element={<RegisteredPwd />} />
        <Route path="barangay" element={<Barangay />} />
        <Route path="facilities" element={<Facilities />} />
        <Route path="addhelp" element={<AddHelp />} />
        <Route path="heatmap" element={<HeatMap />} />
        <Route path="notif" element={<EmployeeNotification />} />
        <Route path="myaccount" element={<MyAccount />} />
      </Route>

      <Route
        path="/user/*"
        element={
          <ProtectedRoute>
            <UserLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<UserPage />} />
        <Route path="user_page" element={<UserPage />} />
        <Route path="user_facilities" element={<UserFacilities />} />
        <Route path="pwdinfo" element={<PwdInfo />} />
      </Route>
      <Route path="*" element={<Custom404 />} />
    </Routes>
  );
}

export default App;
