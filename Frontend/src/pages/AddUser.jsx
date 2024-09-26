import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";

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
        alert("Added Successfully");
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
    setDateOfBirth("");
    setContactNum("");
    setEmail("");
  };

  return (
    <Card>
      <Card.Header className="open-sans-bold fs-3">Add Employee</Card.Header>
      <Card.Body className="open-sans-regular">
        <Form className="my-2" onSubmit={handleSubmit}>
          {/* First Row: First Name, Middle Name, Last Name, Username */}
          <Row className="mb-3">
            <Col md={3}>
              <FloatingLabel controlId="floatingFirstName" label="First Name">
                <Form.Control
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
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
                />
              </FloatingLabel>
            </Col>
          </Row>

          {/* Second Row: Gender, User Group */}
          <Row className="mb-3">
            <Col md={6}>
              <FloatingLabel controlId="floatingGender" label="Gender">
                <Form.Select
                  aria-label="Gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
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
                  aria-label="Role"
                  value={userGroup}
                  onChange={(e) => setUserGroup(e.target.value)}
                >
                  <option value="">Select Group</option>
                  <option value="2">STAFF</option>
                  <option value="1">ADMINISTRATOR</option>
                </Form.Select>
              </FloatingLabel>
            </Col>
          </Row>

          {/* Third Row: Date of Birth */}
          <Row className="mb-3 justify-content-center">
            <Col md={6}>
              <FloatingLabel
                controlId="floatingDateOfBirth"
                label="Date of Birth"
              >
                <Form.Control
                  type="date"
                  placeholder="Date of Birth"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                />
              </FloatingLabel>
            </Col>
          </Row>

          {/* Fourth Row: Mobile Number, Email Address */}
          <Row className="mb-3">
            <Col md={6}>
              <FloatingLabel
                controlId="floatingContactNum"
                label="Mobile Number"
              >
                <Form.Control
                  type="number"
                  placeholder="Mobile Number"
                  value={contactNum}
                  onChange={(e) => setContactNum(e.target.value)}
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
                />
              </FloatingLabel>
            </Col>
          </Row>

          {/* Buttons */}
          <div className="d-flex justify-content-between">
            <Button variant="secondary" type="button" onClick={clearForm}>
              Clear
            </Button>
            <Button variant="primary" type="submit">
              Register
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AddUser;
