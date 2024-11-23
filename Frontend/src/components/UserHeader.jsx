import React, { useEffect, useState } from "react";
import {
  Navbar,
  Container,
  Nav,
  OverlayTrigger,
  Tooltip,
  Badge,
  Modal,
  Form,
  InputGroup,
  Button,
} from "react-bootstrap";
import { FiSettings, FiUser } from "react-icons/fi";
import {
  FaUser,
  FaPhone,
  FaEnvelope,
  FaCalendarAlt,
  FaLock,
  FaUserShield,
  FaKey,
  FaEye,
  FaEyeSlash,
  FaExclamationCircle,
  FaCheckCircle,
} from "react-icons/fa";
import profile from "../images/profile.svg";
import { MdOutlineLogout, MdPassword, MdSettings } from "react-icons/md";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import logo from "../images/logopdao.jpg";
import { useAuth } from "../layout/AuthContext.jsx";
import Notifications from "./Notifications.jsx";
import { host } from "../apiRoutes.js";
import axios from "axios";

const UserHeader = () => {
  const { logout, getLoggedUser } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);

  const [showModal, setShowModal] = useState(false);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // New state for confirm password
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [changePasswordError, setChangePasswordError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (changePasswordError) {
      const timer = setTimeout(() => setChangePasswordError(null), 1500); // Clear error after 1.5 seconds
      return () => clearTimeout(timer); // Clean up timer on unmount
    }

    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(""), 1500); // Clear success message after 1.5 seconds
      return () => clearTimeout(timer); // Clean up timer on unmount
    }
  }, [changePasswordError, successMessage]);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setChangePasswordError(null);
    setSuccessMessage("");
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true); // Start loading
      setError(null); // Clear previous errors
      try {
        const data = await getLoggedUser();

        setProfileData(data);
      } catch (err) {
        setError(err.message || "Error loading user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [getLoggedUser]);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setChangePasswordError("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post(`${host}/api/pwdInfo/change_password`, {
        userId: profileData.userId,
        oldPassword,
        newPassword,
      });
      setSuccessMessage(response.data.message);
      setChangePasswordError(null);
      console.log({ userId: profileData.userId, oldPassword, newPassword });
    } catch (err) {
      setChangePasswordError(
        err.response?.data?.error || "Failed to change password"
      );
      setSuccessMessage(""); // Clear success message on error
    }
  };

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
    <Navbar expand="lg" className="bg-danger sticky-top shadow-sm">
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
        </Navbar.Brand>
        <div className="d-flex align-items-center text-white open-sans-bold fs-5">
          {loading ? (
            "Loading..."
          ) : error ? (
            <span>Error loading profile</span>
          ) : (
            `${profileData.first_name} ${profileData.last_name}`
          )}
          <Badge className="ms-3" bg="light" text="dark">
            REGISTERED
          </Badge>
        </div>
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
              <Nav.Link
                as={Link}
                to="/user/user_facilities"
                className="text-white"
              >
                Facilities
              </Nav.Link>
            </OverlayTrigger>

            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip id="tooltip-info">Change Password</Tooltip>}
            >
              <Nav.Link
                to="/user/pwdinfo"
                className="text-white me-2"
                onClick={handleShowModal}
              >
                Change Password
              </Nav.Link>
            </OverlayTrigger>

            {profileData && profileData.userId && (
              <Notifications userType={"user"} userId={profileData.userId} />
            )}

            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip id="tooltip-info">View Profile</Tooltip>}
            >
              <Nav.Link
                as={Link}
                to="/user/pwdinfo"
                className="mx-2 text-white"
                style={{ fontSize: "1.5rem" }}
              >
                <FiUser />
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

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton className="bg-danger text-white">
          <Modal.Title className="w-100 text-center">
            Change Password
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          {changePasswordError && (
            <div className="alert alert-danger d-flex align-items-center">
              <FaExclamationCircle className="me-2" />
              <span>{changePasswordError}</span>
            </div>
          )}
          {successMessage && (
            <div className="alert alert-success d-flex align-items-center">
              <FaCheckCircle className="me-2" />
              <span>{successMessage}</span>
            </div>
          )}

          <Form onSubmit={handleChangePassword}>
            {/* Old Password Field */}
            <Form.Group className="mb-4">
              <Form.Label className="text-secondary">Old Password</Form.Label>
              <InputGroup>
                <InputGroup.Text className="bg-light text-danger">
                  <FaKey />
                </InputGroup.Text>
                <Form.Control
                  type="password"
                  placeholder="Enter old password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  required
                />
              </InputGroup>
            </Form.Group>

            {/* New Password Field */}
            <Form.Group className="mb-4">
              <Form.Label className="text-secondary">New Password</Form.Label>
              <InputGroup>
                <InputGroup.Text className="bg-light text-danger">
                  <FaLock />
                </InputGroup.Text>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <InputGroup.Text
                  onClick={togglePasswordVisibility}
                  style={{ cursor: "pointer" }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>

            {/* Confirm Password Field */}
            <Form.Group className="mb-4">
              <Form.Label className="text-secondary">
                Confirm Password
              </Form.Label>
              <InputGroup>
                <InputGroup.Text className="bg-light text-danger">
                  <FaLock />
                </InputGroup.Text>
                <Form.Control
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <InputGroup.Text
                  onClick={toggleConfirmPasswordVisibility}
                  style={{ cursor: "pointer" }}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>

            <div className="d-grid mt-4">
              <Button type="submit" variant="danger" size="lg">
                Update Password
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Navbar>
  );
};

export default UserHeader;
