import React, { useState } from "react";
import { Card, FloatingLabel, Form, Button } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import { host } from "../apiRoutes";
const AddUser = () => {
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [contactNum, setContactNum] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [userGroup, setUserGroup] = useState("");

  // Function to block numeric input
  const blockNumbers = (e) => {
    if (/\d/.test(e.key)) {
      e.preventDefault();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !firstName ||
      !lastName ||
      !gender ||
      !dateOfBirth ||
      !contactNum ||
      !email ||
      !username ||
      !userGroup
    ) {
      alert("Please fill in all the fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!/^\d{11}$/.test(contactNum)) {
      alert("Please enter a valid 11-digit contact number.");
      return;
    }

    const newUser = {
      firstname: firstName,
      middlename: middleName,
      lastname: lastName,
      gender: gender,
      birthdate: dateOfBirth,
      contactnum: contactNum,
      email: email,
      username: username,
      user_group: userGroup,
    };

    try {
      const response = await axios.post(
        `${host}/api/user_management/register_user`,
        newUser,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status !== 201) {
        throw new Error("Failed to add user");
      } else {
        Swal.fire({
          icon: "success",
          title:
            "<h3 style='color: #333; font-weight: 600;'>Registered Successfully</h3>",
          html: `
            <div style="text-align: left; margin-bottom: 10px;">
              <p><strong>Username:</strong> <span style="color: #007bff;">${response.data.username}</span></p>
              <p><strong>Password:</strong></p>
              <div style="display: flex; align-items: center; border: 1px solid #ddd; border-radius: 6px; padding: 5px;">
                <input 
                  type="password" 
                  id="generated-password" 
                  value="${response.data.password}" 
                  readonly 
                  style="flex: 1; padding: 8px; border: none; font-size: 14px; outline: none; color: #555;"
                />
                <button 
                  id="toggle-password" 
                  style="padding: 5px 10px; background: none; border: none; color: #007bff; font-weight: 500; cursor: pointer; outline: none;">
                  Show
                </button>
              </div>
            </div>
            <p style="color: red; font-size: 14px; margin-top: 10px; text-align: center;"><strong>Do not share this information</strong></p>
          `,
          showConfirmButton: true,
          confirmButtonText: "OK",
          confirmButtonColor: "#007bff",
          width: "400px",
          didOpen: () => {
            const passwordInput = document.getElementById("generated-password");
            const toggleButton = document.getElementById("toggle-password");

            toggleButton.addEventListener("click", () => {
              const isPasswordVisible = passwordInput.type === "text";
              passwordInput.type = isPasswordVisible ? "password" : "text";
              toggleButton.textContent = isPasswordVisible ? "Show" : "Hide";
            });
          },
        });
        clearForm();
      }
    } catch (err) {
      console.error("Error adding user:", err.message);
    }
  };

  const handleContactNumChange = (e) => {
    const value = e.target.value;
    // Remove all non-numeric characters and limit to 11 digits
    const filteredValue = value.replace(/[^0-9]/g, "").slice(0, 11);
    setContactNum(filteredValue);
  };

  const clearForm = () => {
    setFirstName("");
    setMiddleName("");
    setLastName("");
    setGender("");
    setUserGroup("");
    setUsername("");
    setDateOfBirth("");
    setContactNum("");
    setEmail("");
  };

  return (
    <Card className="shadow-lg rounded w-75 mx-auto">
      <Card.Header className="open-sans-bold fs-3 text-center py-3">
        Add Employee
      </Card.Header>
      <Card.Body className="open-sans-regular p-4">
        <Form onSubmit={handleSubmit}>
          {/* First Name, Middle Name, Last Name, Username */}
          <FloatingLabel
            controlId="floatingFirstName"
            label="First Name"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              onKeyDown={blockNumbers} // Changed to onKeyDown
              required
              className="form-control-custom"
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingMiddleName"
            label="Middle Name"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="Middle Name"
              value={middleName}
              onChange={(e) => setMiddleName(e.target.value)}
              onKeyDown={blockNumbers} // Changed to onKeyDown
              className="form-control-custom"
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingLastName"
            label="Last Name"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              onKeyDown={blockNumbers} // Changed to onKeyDown
              required
              className="form-control-custom"
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingUsername"
            label="Username"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="form-control-custom"
            />
          </FloatingLabel>

          {/* Gender, User Group */}
          <FloatingLabel
            controlId="floatingGender"
            label="Gender"
            className="mb-3"
          >
            <Form.Select
              aria-label="Gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
              className="form-control-custom"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </Form.Select>
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingGroup"
            label="User Group"
            className="mb-3"
          >
            <Form.Select
              aria-label="User Group"
              value={userGroup}
              onChange={(e) => setUserGroup(e.target.value)}
              required
              className="form-control-custom"
            >
              <option value="">Select Group</option>
              <option value="2">STAFF</option>
              <option value="1">ADMINISTRATOR</option>
            </Form.Select>
          </FloatingLabel>

          {/* Date of Birth */}
          <FloatingLabel
            controlId="floatingDateOfBirth"
            label="Date of Birth"
            className="mb-3"
          >
            <Form.Control
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              required
              className="form-control-custom"
            />
          </FloatingLabel>

          {/* Mobile Number, Email Address */}
          <FloatingLabel
            controlId="floatingContactNum"
            label="Mobile Number"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="Mobile Number"
              value={contactNum}
              onChange={handleContactNumChange}
              className="form-control-custom"
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingEmail"
            label="Email Address"
            className="mb-3"
          >
            <Form.Control
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-control-custom"
            />
          </FloatingLabel>

          {/* Buttons */}
          <div className="d-flex justify-content-between mt-4">
            <Button
              variant="secondary"
              type="button"
              onClick={clearForm}
              className="px-4"
            >
              Clear
            </Button>
            <Button variant="danger" type="submit" className="px-4">
              Register
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AddUser;
