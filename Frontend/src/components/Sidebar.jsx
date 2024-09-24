import React, { useState } from "react";
import { useAuth } from "../layout/AuthContext.jsx";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import logo from "../images/logopdao.jpg";

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
  const [isUserManagementOpen, setIsUserManagementOpen] = useState(false); // State to handle dropdown

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
    transition:
      "background-color 0.3s ease, box-shadow 0.3s ease, color 0.3s ease",
    borderRadius: "8px",
  };

  const hoverStyle = {
    backgroundColor: "#f8d7da",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    color: "red", // Add hover text color here
  };

  return (
    <CDBSidebar className="d-flex flex-column vh-100 open-sans-bold bg-danger">
      <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>
        <img
          src={logo}
          alt="Logo"
          className="rounded-circle"
          style={{ width: "50px", height: "50px", marginRight: "10px" }}
        />
        PDAO
      </CDBSidebarHeader>
      <CDBSidebarContent className="d-flex flex-column">
        <CDBSidebarMenu className="flex-fill">
          <Link to="/">
            <CDBSidebarMenuItem
              icon="th-large"
              style={menuItemStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  hoverStyle.backgroundColor;
                e.currentTarget.style.boxShadow = hoverStyle.boxShadow;
                e.currentTarget.style.color = hoverStyle.color; // Apply text color on hover
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "";
                e.currentTarget.style.boxShadow = "";
                e.currentTarget.style.color = ""; // Revert text color on hover end
              }}
            >
              Dashboard
            </CDBSidebarMenuItem>
          </Link>

          {/* Updated Notification Icon */}
          <CDBSidebarMenuItem
            icon="bell"
            style={menuItemStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor =
                hoverStyle.backgroundColor;
              e.currentTarget.style.boxShadow = hoverStyle.boxShadow;
              e.currentTarget.style.color = hoverStyle.color; // Apply text color on hover
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "";
              e.currentTarget.style.boxShadow = "";
              e.currentTarget.style.color = ""; // Revert text color on hover end
            }}
          >
            Notifications
          </CDBSidebarMenuItem>

          <Link to="/registration">
            {/* Updated PWD Registration Icon */}
            <CDBSidebarMenuItem
              icon="file-alt"
              style={menuItemStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  hoverStyle.backgroundColor;
                e.currentTarget.style.boxShadow = hoverStyle.boxShadow;
                e.currentTarget.style.color = hoverStyle.color; // Apply text color on hover
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "";
                e.currentTarget.style.boxShadow = "";
                e.currentTarget.style.color = ""; // Revert text color on hover end
              }}
            >
              PWD Registration
            </CDBSidebarMenuItem>
          </Link>

          <Link to="/graph_report">
            {/* Updated Graphical Report Icon */}
            <CDBSidebarMenuItem
              icon="chart-bar"
              style={menuItemStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  hoverStyle.backgroundColor;
                e.currentTarget.style.boxShadow = hoverStyle.boxShadow;
                e.currentTarget.style.color = hoverStyle.color; // Apply text color on hover
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "";
                e.currentTarget.style.boxShadow = "";
                e.currentTarget.style.color = ""; // Revert text color on hover end
              }}
            >
              Graphical Report
            </CDBSidebarMenuItem>
          </Link>

          {/* User Management Dropdown */}
          <div>
            <CDBSidebarMenuItem
              icon="user"
              style={menuItemStyle}
              onClick={() => setIsUserManagementOpen(!isUserManagementOpen)} // Toggle dropdown
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  hoverStyle.backgroundColor;
                e.currentTarget.style.boxShadow = hoverStyle.boxShadow;
                e.currentTarget.style.color = hoverStyle.color; // Apply text color on hover
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "";
                e.currentTarget.style.boxShadow = "";
                e.currentTarget.style.color = ""; // Revert text color on hover end
              }}
            >
              User Management
            </CDBSidebarMenuItem>
            {isUserManagementOpen && (
              <div style={{ paddingLeft: "20px" }}>
                <Link to="/add_user">
                  <CDBSidebarMenuItem
                    icon="user-plus"
                    style={menuItemStyle}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor =
                        hoverStyle.backgroundColor;
                      e.currentTarget.style.boxShadow = hoverStyle.boxShadow;
                      e.currentTarget.style.color = hoverStyle.color; // Apply text color on hover
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "";
                      e.currentTarget.style.boxShadow = "";
                      e.currentTarget.style.color = ""; // Revert text color on hover end
                    }}
                  >
                    Add User
                  </CDBSidebarMenuItem>
                </Link>
                <Link to="/registered_users">
                  <CDBSidebarMenuItem
                    icon="users"
                    style={menuItemStyle}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor =
                        hoverStyle.backgroundColor;
                      e.currentTarget.style.boxShadow = hoverStyle.boxShadow;
                      e.currentTarget.style.color = hoverStyle.color; // Apply text color on hover
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "";
                      e.currentTarget.style.boxShadow = "";
                      e.currentTarget.style.color = ""; // Revert text color on hover end
                    }}
                  >
                    Registered Users
                  </CDBSidebarMenuItem>
                </Link>
              </div>
            )}
          </div>
        </CDBSidebarMenu>

        {/* Updated Logout Icon */}
        <div
          className="mt-auto"
          onClick={handleLogout}
          style={menuItemStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = hoverStyle.backgroundColor;
            e.currentTarget.style.boxShadow = hoverStyle.boxShadow;
            e.currentTarget.style.color = hoverStyle.color; // Apply text color on hover
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "";
            e.currentTarget.style.boxShadow = "";
            e.currentTarget.style.color = ""; // Revert text color on hover end
          }}
        >
          <CDBSidebarMenuItem icon="sign-out-alt">Logout</CDBSidebarMenuItem>
        </div>
      </CDBSidebarContent>
    </CDBSidebar>
  );
};

export default Sidebar;
