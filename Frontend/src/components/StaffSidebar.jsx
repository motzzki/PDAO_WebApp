import React, { useState, useEffect } from "react";
import { useAuth } from "../layout/AuthContext.jsx";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import logo from "../images/logopdao.jpg";
import { Badge } from "react-bootstrap";

import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";

const StaffSidebar = () => {
  const { logout, getEmployee } = useAuth();
  const [isUserManagementOpen, setIsUserManagementOpen] = useState(false);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true); // Start loading
      setError(null); // Clear previous errors
      try {
        const data = await getEmployee();
        setProfileData(data);
      } catch (err) {
        setError(err.message || "Error loading user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [getEmployee]);

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
        {loading ? (
          <div className="text-white text-center">Loading...</div>
        ) : error ? (
          <div className="text-danger text-center">{error}</div>
        ) : (
          <div className="text-white text-center">
            <div>
              {profileData.firstname} {profileData.lastname}
            </div>
            <div>
              <Badge bg="light" text="dark">
                {profileData.role}
              </Badge>
            </div>
          </div>
        )}
        <hr />
        <CDBSidebarMenu className="flex-fill">
          <Link to="/staff">
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
          <Link to="/staff/notif">
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
          </Link>

          <Link to="/staff/registration">
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

          <Link to="/staff/graph_report">
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
        </CDBSidebarMenu>

        {/* Updated Logout Icon */}
        <CDBSidebarMenu>
          <Link to="/staff/myaccount">
            <CDBSidebarMenuItem
              icon="user"
              className="mt-auto"
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
              My Account
            </CDBSidebarMenuItem>
          </Link>
          {/* Logout */}
          <CDBSidebarMenuItem
            icon="sign-out-alt"
            onClick={handleLogout}
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
            Logout
          </CDBSidebarMenuItem>
        </CDBSidebarMenu>
      </CDBSidebarContent>
    </CDBSidebar>
  );
};

export default StaffSidebar;
