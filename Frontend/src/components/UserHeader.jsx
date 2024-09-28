import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import React from "react";
import { GoBell } from "react-icons/go";
import { FiInfo } from "react-icons/fi";
import { MdOutlineLogout } from "react-icons/md";
import logo from "../images/logopdao.jpg";
import { Link } from "react-router-dom";
import { useAuth } from "../layout/AuthContext.jsx";
import Swal from "sweetalert2";

const UserHeader = () => {
  const { auth, logout } = useAuth();

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
    <Navbar expand="lg" className="bg-body-tertiary navbar ">
      <Container className="hehe">
        <Navbar.Brand href="landing_page" className="text-white">
          <img
            src={logo}
            alt="Logo"
            className="rounded-circle"
            style={{ width: "50px", height: "50px", marginRight: "10px" }}
          />
          PDAO
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className=" justify-content-end">
          <Nav>
            <Nav.Link as={Link} to="user_page" className="mx-2 mt-2 text-white">
              Home
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="user_facilities"
              className="mx-2 mt-2  text-white"
            >
              Facilities
            </Nav.Link>

            <Nav.Link
              className="mx-2 text-white"
              href="#home"
              style={{ fontSize: "25px" }}
            >
              <GoBell />
            </Nav.Link>
            <Nav.Link
              className="mx-2 text-white"
              style={{ fontSize: "25px" }}
              href="#link"
            >
              <FiInfo />
            </Nav.Link>
            <Nav.Link
              onClick={handleLogout}
              className="mx-2 text-white"
              style={{ fontSize: "25px" }}
            >
              <MdOutlineLogout />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default UserHeader;
