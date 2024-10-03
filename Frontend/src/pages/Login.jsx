import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import bgLogo from "../images/bg_pdao.jpg";
import Logo from "../images/logopdao.jpg";
import iconLogo from "../images/iconuser.svg";
import lockLogo from "../images/lock.svg";
import eyeLogo from "../images/eye.svg"; 
import eyeOffLogo from "../images/eye-off.svg"; 
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import Swal from "sweetalert2";
import { useAuth } from "../layout/AuthContext.jsx";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 1000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login(username, password);
      Toast.fire({
        icon: "success",
        title: "Signed in successfully",
      });
    } catch (error) {
      setError("Incorrect Details...");
      setUsername("");
      setPassword("");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message || "An unexpected error occurred.",
        width: "26em",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    // Clear fields or navigate away
    setUsername("");
    setPassword("");
    // Optionally, navigate to another route
    // navigate("/"); // Uncomment to redirect to home or another route
  };

  return (
    <div className="position-relative d-flex justify-content-center align-items-center min-vh-100 overflow-hidden open-sans-light">
      <img
        src={bgLogo}
        alt="Background Logo"
        className="position-absolute top-0 start-0 w-100 h-100 object-cover"
        style={{ filter: "blur(5px)" }}
      />
      <div className="position-absolute top-0 start-0 w-100 h-100 bg-black opacity-50" />

      <Card className="w-25 bg-white bg-opacity-75 p-4 shadow-lg backdrop-blur-sm position-relative">
        <button 
          className="btn btn-close position-absolute top-0 end-0" 
          onClick={handleClose} 
          aria-label="Close"
          style={{ backgroundColor: 'red', border: 'none', color: 'white' }} // Set background color to red
        >
          <span aria-hidden="true">&times;</span>
        </button>
        <div className="d-flex justify-content-center mb-4">
          <img
            src={Logo}
            alt="Logo"
            className="rounded-circle"
            style={{ width: "128px", height: "128px" }}
          />
        </div>
        <Card.Body>
          <Form onSubmit={handleLogin}>
            <InputGroup size="lg" className="mb-3">
              <InputGroup.Text>
                <img
                  src={iconLogo}
                  alt="icon logo"
                  style={{ width: "20px", height: "20px" }}
                />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
              />
            </InputGroup>

            <InputGroup size="lg" className="mb-3">
              <InputGroup.Text>
                <img
                  src={lockLogo}
                  alt="icon logo"
                  style={{ width: "20px", height: "20px" }}
                />
              </InputGroup.Text>
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
              <InputGroup.Text
                onClick={() => setShowPassword(!showPassword)}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={showPassword ? eyeLogo : eyeOffLogo}
                  alt="Toggle password visibility"
                  style={{ width: "20px", height: "20px" }}
                />
              </InputGroup.Text>
            </InputGroup>
            <Button
              className="w-100 mt-4 fs-5"
              variant="primary"
              type="submit"
              disabled={isLoading}
            >
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Login;
