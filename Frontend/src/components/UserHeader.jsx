import React from "react";
import { Navbar, Container, Nav, OverlayTrigger, Tooltip } from "react-bootstrap";
import { GoBell } from "react-icons/go";
import { FiInfo } from "react-icons/fi";
import { MdOutlineLogout } from "react-icons/md";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import logo from "../images/logopdao.jpg";
import { useAuth } from "../layout/AuthContext.jsx";

const UserHeader = () => {
  const { logout } = useAuth();

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
        Swal.fire({
          title: "Logging out...",
          html: "See ya!",
          timer: 500,
          timerProgressBar: true,
          showConfirmButton: false,
          willClose: () => {
            logout();
          },
        });
      }
    });
  };

  return (
    <Navbar expand="lg" className="bg-dark navbar-dark sticky-top shadow-sm">
      <Container>
        <Navbar.Brand
          as={Link}
          to="/user"
          className="d-flex align-items-center text-white"
        >
          <img
            src={logo}
            alt="PDAO Logo"
            className="rounded-circle"
            style={{ width: "50px", height: "50px", marginRight: "10px" }}
          />
          PDAO
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav" className="justify-content-end">
          <Nav className="align-items-center">
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip id="tooltip-home">Home</Tooltip>}
            >
              <Nav.Link as={Link} to="/user" className="mx-2 text-white">
                Home
              </Nav.Link>
            </OverlayTrigger>

            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip id="tooltip-facilities">Facilities</Tooltip>}
            >
              <Nav.Link as={Link} to="/user/user_facilities" className="mx-2 text-white">
                Facilities
              </Nav.Link>
            </OverlayTrigger>

            <Nav.Link
              href="#notifications"
              className="mx-2 text-white"
              style={{ fontSize: "1.5rem" }}
            >
              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip id="tooltip-notification">Notification</Tooltip>}
              >
                <span>
                  <GoBell />
                </span>
              </OverlayTrigger>
            </Nav.Link>

            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip id="tooltip-info">View Profile Information</Tooltip>}
            >
              <Nav.Link
                as={Link}
                to="/user/pwdinfo"
                className="mx-2 text-white"
                style={{ fontSize: "1.5rem" }}
              >
                <FiInfo />
              </Nav.Link>
            </OverlayTrigger>

            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip id="tooltip-logout">Logout</Tooltip>}
            >
              <Nav.Link
                onClick={handleLogout}
                className="mx-2 text-white"
                style={{ fontSize: "1.5rem" }}
              >
                <MdOutlineLogout />
              </Nav.Link>
            </OverlayTrigger>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default UserHeader;
