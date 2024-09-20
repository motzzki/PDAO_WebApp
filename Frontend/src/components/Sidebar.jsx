import React from "react";

import { useAuth } from "../layout/AuthContext.jsx";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";

const Sidebar = () => {
  const { auth, logout } = useAuth();
  const { user } = auth;

  const handleLogout = () => {
    Swal.fire({
      title: "Logout?",
      text: "Are you sure you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        let timerInterval;
        Swal.fire({
          title: "Logging out...",
          html: "See ya!",
          timer: 500,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
          },
          willClose: () => {
            clearInterval(timerInterval);
          },
        }).then(() => {
          logout();
        });
      }
    });
  };
  return (
    <CDBSidebar className="d-flex flex-column vh-100 open-sans-bold bg-danger">
      <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>
        PDAO
      </CDBSidebarHeader>
      <CDBSidebarContent className="d-flex flex-column">
        <CDBSidebarMenu className="flex-fill">
          <Link to="/">
            <CDBSidebarMenuItem>Dashboard</CDBSidebarMenuItem>
          </Link>
          <CDBSidebarMenuItem>Notifications</CDBSidebarMenuItem>
          <Link to="/registration">
            <CDBSidebarMenuItem>PWD Registration</CDBSidebarMenuItem>
          </Link>
          <Link to="/graph_report">
            <CDBSidebarMenuItem>Graphical Report</CDBSidebarMenuItem>
          </Link>
        </CDBSidebarMenu>
        <div className="mt-auto" onClick={handleLogout}>
          <CDBSidebarMenuItem>Logout</CDBSidebarMenuItem>
        </div>
      </CDBSidebarContent>
    </CDBSidebar>
  );
};

export default Sidebar;
