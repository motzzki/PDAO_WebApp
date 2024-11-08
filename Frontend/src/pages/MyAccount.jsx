import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Image,
  Modal,
  Form,
  InputGroup,
} from "react-bootstrap";
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
import { useAuth } from "../layout/AuthContext";
import moment from "moment";
import { host } from "../apiRoutes";
import axios from "axios";

const MyAccount = () => {
  const { getEmployee } = useAuth();

  const [employeeData, setEmployeeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //MODAL
  const [showModal, setShowModal] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // New state for confirm password
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [changePasswordError, setChangePasswordError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const data = await getEmployee();
        setEmployeeData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [getEmployee]);

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

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setChangePasswordError("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post(
        `${host}/api/user_management/change_password`,
        {
          username: employeeData.username,
          oldPassword,
          newPassword,
        }
      );
      setSuccessMessage(response.data.message);
      setChangePasswordError(null);
    } catch (err) {
      setChangePasswordError(
        err.response?.data?.error || "Failed to change password"
      );
      setSuccessMessage(""); // Clear success message on error
    }
  };

  const cardStyle = {
    color: "white",
    borderRadius: "12px",
    padding: "20px",
    marginBottom: "20px", // Space between cards
  };

  const profileImageStyle = {
    width: "120px",
    height: "120px",
    objectFit: "cover",
    border: "3px solid #fff", // White border around the profile image
    transition: "transform 0.3s ease-in-out",
  };

  const iconStyle = {
    fontSize: "1.5rem",
    color: "#fff", // White icons for contrast
  };

  const buttonStyle = {
    backgroundColor: "#e63946", // Darker red button color
    border: "none",
    fontSize: "1.1rem",
    width: "75%",
    padding: "12px 0",
    transition: "background-color 0.3s ease",
  };

  const profileNameStyle = {
    fontSize: "2rem",
    fontWeight: "bold",
    marginTop: "10px",
    color: "#fff", // White text for name
  };

  const userRoleStyle = {
    fontSize: "1.1rem",
    color: "#f0f0f0", // Light grey color for the role
  };

  // Display loading or error states
  if (loading) {
    return (
      <Container fluid>
        <Row className="justify-content-center">
          <Col md={12} lg={8} xl={6}>
            <h3>Loading...</h3>
          </Col>
        </Row>
      </Container>
    );
  }

  if (error) {
    return (
      <Container fluid>
        <Row className="justify-content-center">
          <Col md={12} lg={8} xl={6}>
            <h3>Error: {error}</h3>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <>
      <Container fluid>
        <Row className="justify-content-center">
          <Col md={12} lg={8} xl={6}>
            {/* Profile Card */}
            <Card
              style={cardStyle}
              className="shadow-lg rounded-lg border-0 text-center bg-danger"
            >
              <Card.Body>
                <Image
                  src="https://via.placeholder.com/150"
                  alt="Profile Picture"
                  roundedCircle
                  style={profileImageStyle}
                  className="mb-3 profile-image"
                />
                <h3 style={profileNameStyle}>
                  {employeeData.firstname} {employeeData.lastname}
                </h3>
                <p style={userRoleStyle}>{employeeData.role}</p>
              </Card.Body>
            </Card>

            {/* User Details Cards */}
            <Row>
              <Col sm={12} md={6}>
                <Card
                  style={cardStyle}
                  className="shadow-lg rounded-lg border-0 bg-danger"
                >
                  <Card.Body>
                    <h5>
                      <FaUser className="me-2" style={iconStyle} /> Full Name
                    </h5>
                    <p>
                      {employeeData.firstname} {employeeData.middlename}{" "}
                      {employeeData.lastname}
                    </p>
                  </Card.Body>
                </Card>
              </Col>
              <Col sm={12} md={6}>
                <Card
                  style={cardStyle}
                  className="shadow-lg rounded-lg border-0 bg-danger"
                >
                  <Card.Body>
                    <h5>
                      <FaPhone className="me-2" style={iconStyle} /> Contact
                      Number
                    </h5>
                    <p>{employeeData.contactnum}</p>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <Row>
              <Col sm={12} md={6}>
                <Card
                  style={cardStyle}
                  className="shadow-lg rounded-lg border-0 bg-danger"
                >
                  <Card.Body>
                    <h5>
                      <FaEnvelope className="me-2" style={iconStyle} /> Email
                    </h5>
                    <p>{employeeData.email}</p>
                  </Card.Body>
                </Card>
              </Col>
              <Col sm={12} md={6}>
                <Card
                  style={cardStyle}
                  className="shadow-lg rounded-lg border-0 bg-danger"
                >
                  <Card.Body>
                    <h5>
                      <FaCalendarAlt className="me-2" style={iconStyle} />{" "}
                      Birthdate
                    </h5>
                    <p>
                      {moment(employeeData.birthdate).format("MMMM D, YYYY")}
                    </p>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <Row>
              <Col sm={12} md={6}>
                <Card
                  style={cardStyle}
                  className="shadow-lg rounded-lg border-0 bg-danger"
                >
                  <Card.Body>
                    <h5>
                      <FaUserShield className="me-2" style={iconStyle} />{" "}
                      Username
                    </h5>
                    <p>{employeeData.username}</p>
                  </Card.Body>
                </Card>
              </Col>
              <Col sm={12} md={6}>
                <Card
                  style={cardStyle}
                  className="shadow-lg rounded-lg border-0 bg-danger"
                >
                  <Card.Body>
                    <h5>
                      <FaLock className="me-2" style={iconStyle} /> Role
                    </h5>
                    <p>{employeeData.role}</p>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            {/* Change Password Button */}
            <div className="text-center mt-4">
              <Button
                variant="primary"
                style={buttonStyle}
                onClick={handleShowModal}
                size="lg"
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor = "#d62828")
                } // Darker red on hover
                onMouseOut={(e) => (e.target.style.backgroundColor = "#e63946")} // Original red on hover out
              >
                Change Password
              </Button>
            </div>
          </Col>
        </Row>
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
    </>
  );
};

export default MyAccount;
