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
  const [nationality, setNationality] = useState("");
  const [age, setAge] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [civilStatus, setCivilStatus] = useState("");
  const [barangay, setBarangay] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !firstName ||
      !lastName ||
      !gender ||
      !dateOfBirth ||
      !contactNum ||
      !email ||
      !nationality ||
      !age ||
      !bloodType ||
      !civilStatus ||
      !barangay ||
      !address
    ) {
      alert("Please fill in all the fields.");
      return;
    }

    const newUser = {
      first_name: firstName,
      middle_name: middleName,
      last_name: lastName,
      gender,
      date_of_birth: dateOfBirth,
      contact_num: contactNum,
      email,
      nationality,
      age,
      blood_type: bloodType,
      civil_status: civilStatus,
      barangay,
      house_address: address,
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/registerPwd/register_pwd",
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
    setDateOfBirth("");
    setContactNum("");
    setEmail("");
    setNationality("");
    setAge("");
    setBloodType("");
    setCivilStatus("");
    setBarangay("");
    setAddress("");
  };

  return (
    <Card>
      <Card.Header className="open-sans-bold fs-3">Add User</Card.Header>
      <Card.Body className="open-sans-regular">
        <Form className="my-2" onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={4}>
              <FloatingLabel controlId="floatingFirstName" label="First Name">
                <Form.Control
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </FloatingLabel>
            </Col>
            <Col md={4}>
              <FloatingLabel controlId="floatingMiddleName" label="Middle Name">
                <Form.Control
                  type="text"
                  placeholder="Middle Name"
                  value={middleName}
                  onChange={(e) => setMiddleName(e.target.value)}
                />
              </FloatingLabel>
            </Col>
            <Col md={4}>
              <FloatingLabel controlId="floatingLastName" label="Last Name">
                <Form.Control
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </FloatingLabel>
            </Col>
          </Row>

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
              <Form.Group className="mb-3">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Date of Birth"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={4}>
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
            <Col md={4}>
              <FloatingLabel controlId="floatingEmail" label="Email Address">
                <Form.Control
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FloatingLabel>
            </Col>
            <Col md={4}>
              <FloatingLabel
                controlId="floatingNationality"
                label="Nationality"
              >
                <Form.Control
                  type="text"
                  placeholder="Nationality"
                  value={nationality}
                  onChange={(e) => setNationality(e.target.value)}
                />
              </FloatingLabel>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={4}>
              <FloatingLabel controlId="floatingAge" label="Age">
                <Form.Control
                  type="number"
                  placeholder="Age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </FloatingLabel>
            </Col>
            <Col md={4}>
              <FloatingLabel controlId="floatingBloodType" label="Blood Type">
                <Form.Select
                  aria-label="Blood Type"
                  value={bloodType}
                  onChange={(e) => setBloodType(e.target.value)}
                >
                  <option value="">Select Blood Type</option>
                  <option value="a-positive">A+</option>
                  <option value="a-negative">A-</option>
                  <option value="b-positive">B+</option>
                  <option value="b-negative">B-</option>
                  <option value="ab-positive">AB+</option>
                  <option value="ab-negative">AB-</option>
                  <option value="o-positive">O+</option>
                  <option value="o-negative">O-</option>
                </Form.Select>
              </FloatingLabel>
            </Col>
            <Col md={4}>
              <FloatingLabel
                controlId="floatingCivilStatus"
                label="Civil Status"
              >
                <Form.Select
                  aria-label="Civil Status"
                  value={civilStatus}
                  onChange={(e) => setCivilStatus(e.target.value)}
                >
                  <option value="">Select Civil Status</option>
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                  <option value="widowed">Widowed</option>
                  <option value="divorced">Divorced</option>
                </Form.Select>
              </FloatingLabel>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={4}>
              <FloatingLabel controlId="floatingBarangay" label="Barangay">
                <Form.Select
                  aria-label="Barangay"
                  value={barangay}
                  onChange={(e) => setBarangay(e.target.value)}
                >
                  <option value="">Select Barangay</option>
                  <option value="baclaran">Baclaran</option>
                  <option value="banaybanay">Banaybanay</option>
                  <option value="banlic">Banlic</option>
                  <option value="bigaa">Bigaa</option>
                </Form.Select>
              </FloatingLabel>
            </Col>
            <Col md={8}>
              <FloatingLabel controlId="floatingAddress" label="Address">
                <Form.Control
                  as="textarea"
                  placeholder="House #, Block #, Lot #"
                  style={{ height: "100px" }}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </FloatingLabel>
            </Col>
          </Row>

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
