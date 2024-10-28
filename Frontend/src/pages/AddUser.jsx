import React, { useState } from "react";
import { Card, Row, Col, FloatingLabel, Form, Button } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";

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

  const blockNumbers = (e) => {
    if (!/[a-zA-Z\s]/.test(e.key)) {
      e.preventDefault();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (
    //   !firstName ||
    //   !lastName ||
    //   !gender ||
    //   !dateOfBirth ||
    //   !contactNum ||
    //   !email
    // ) {
    //   alert("Please fill in all the fields.");
    //   return;
    // }

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
        "http://localhost:8000/api/user_management/register_user",
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
          position: "top-end",
          icon: "success",
          title: "User Registered",
          showConfirmButton: false,
          timer: 1500,
        });
        clearForm();
      }
    } catch (err) {
      console.error("Error adding user:", err.message);
    }
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
    <Card className="shadow-sm">
      <Card.Header className="open-sans-bold fs-3 text-center py-3">
        Add Employee
      </Card.Header>
      <Card.Body className="open-sans-regular p-4">
        <Form onSubmit={handleSubmit}>
          {/* First Row: First Name, Middle Name, Last Name, Username */}
          <Row className="mb-4">
            <Col md={3}>
              <FloatingLabel controlId="floatingFirstName" label="First Name">
                <Form.Control
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  onKeyPress={blockNumbers}
                  required
                />
              </FloatingLabel>
            </Col>
            <Col md={3}>
              <FloatingLabel controlId="floatingMiddleName" label="Middle Name">
                <Form.Control
                  type="text"
                  placeholder="Middle Name"
                  value={middleName}
                  onChange={(e) => setMiddleName(e.target.value)}
                  onKeyPress={blockNumbers}
                />
              </FloatingLabel>
            </Col>
            <Col md={3}>
              <FloatingLabel controlId="floatingLastName" label="Last Name">
                <Form.Control
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  onKeyPress={blockNumbers}
                  required
                />
              </FloatingLabel>
            </Col>
            <Col md={3}>
              <FloatingLabel controlId="floatingUsername" label="Username">
                <Form.Control
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </FloatingLabel>
            </Col>
          </Row>

          {/* Second Row: Gender, User Group */}
          <Row className="mb-4">
            <Col md={6}>
              <FloatingLabel controlId="floatingGender" label="Gender">
                <Form.Select
                  aria-label="Gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </Form.Select>
              </FloatingLabel>
            </Col>
            <Col md={6}>
              <FloatingLabel controlId="floatingGroup" label="User Group">
                <Form.Select
                  aria-label="User Group"
                  value={userGroup}
                  onChange={(e) => setUserGroup(e.target.value)}
                  required
                >
                  <option value="">Select Group</option>
                  <option value="2">STAFF</option>
                  <option value="1">ADMINISTRATOR</option>
                </Form.Select>
              </FloatingLabel>
            </Col>
          </Row>

          {/* Third Row: Date of Birth */}
          <Row className="mb-4">
            <Col md={6} className="mx-auto">
              <FloatingLabel
                controlId="floatingDateOfBirth"
                label="Date of Birth"
              >
                <Form.Control
                  type="date"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  required
                />
              </FloatingLabel>
            </Col>
          </Row>

          {/* Fourth Row: Mobile Number, Email Address */}
          <Row className="mb-4">
            <Col md={6}>
              <FloatingLabel
                controlId="floatingContactNum"
                label="Mobile Number"
              >
                <Form.Control
                  type="text"
                  placeholder="Mobile Number"
                  value={contactNum}
                  onChange={(e) => setContactNum(e.target.value)}
                  required
                />
              </FloatingLabel>
            </Col>
            <Col md={6}>
              <FloatingLabel controlId="floatingEmail" label="Email Address">
                <Form.Control
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </FloatingLabel>
            </Col>
          </Row>

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
            <Button variant="primary" type="submit" className="px-4">
              Register
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AddUser;
