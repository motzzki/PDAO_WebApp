import React from "react";
import { useAuth } from "../layout/AuthContext.jsx";
import { Link } from "react-router-dom";
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

  const menuItemStyle = {
    transition: "background-color 0.3s ease, box-shadow 0.3s ease",
    borderRadius: "8px",
  };

  const hoverStyle = {
    backgroundColor: "#f8d7da", 
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Lighter shadow
  };

  return (
    <CDBSidebar className="d-flex flex-column vh-100 open-sans-bold bg-danger">
      <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>
        PDAO
      </CDBSidebarHeader>
      <CDBSidebarContent className="d-flex flex-column">
        <CDBSidebarMenu className="flex-fill">
          <Link to="/">
            <CDBSidebarMenuItem
              icon="th-large"
              style={menuItemStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = hoverStyle.backgroundColor;
                e.currentTarget.style.boxShadow = hoverStyle.boxShadow;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "";
                e.currentTarget.style.boxShadow = "";
              }}
            >
              Dashboard
            </CDBSidebarMenuItem>
          </Link>
          <CDBSidebarMenuItem
            icon="th-large"
            style={menuItemStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = hoverStyle.backgroundColor;
              e.currentTarget.style.boxShadow = hoverStyle.boxShadow;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "";
              e.currentTarget.style.boxShadow = "";
            }}
          >
            Notifications
          </CDBSidebarMenuItem>
          <Link to="/registration">
            <CDBSidebarMenuItem
              icon="th-large"
              style={menuItemStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = hoverStyle.backgroundColor;
                e.currentTarget.style.boxShadow = hoverStyle.boxShadow;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "";
                e.currentTarget.style.boxShadow = "";
              }}
            >
              PWD Registration
            </CDBSidebarMenuItem>
          </Link>
          <Link to="/graph_report">
            <CDBSidebarMenuItem
              icon="th-large"
              style={menuItemStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = hoverStyle.backgroundColor;
                e.currentTarget.style.boxShadow = hoverStyle.boxShadow;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "";
                e.currentTarget.style.boxShadow = "";
              }}
            >
              Graphical Report
            </CDBSidebarMenuItem>
          </Link>
        </CDBSidebarMenu>
        <div className="mt-auto" onClick={handleLogout}>
          <CDBSidebarMenuItem icon="th-large">
            Logout
          </CDBSidebarMenuItem>
        </div>
      </CDBSidebarContent>
    </CDBSidebar>
  );
};

export default Sidebar;

