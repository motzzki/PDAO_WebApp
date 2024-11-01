import React, { useState } from "react";
import { Button, Card, FloatingLabel, Form, Row, Col } from "react-bootstrap";
import Select from "react-select";
import axios from "axios";
import Swal from "sweetalert2";

const Registration = () => {
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [contactNum, setContactNum] = useState("");
  const [email, setEmail] = useState("");
  const [nationality, setNationality] = useState("");
  const [age, setAge] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [disability, setDisability] = useState("");
  const [civilStatus, setCivilStatus] = useState("");
  const [cause, setCause] = useState("");
  const [barangay, setBarangay] = useState("");
  const [education, setEducation] = useState("");
  const [employment, setEmployment] = useState("");
  const [address, setAddress] = useState("");
  const [occupation, setOccupation] = useState("");

  const blockNumbers = (e) => {
    if (!/[a-zA-Z\s]/.test(e.key)) {
      e.preventDefault();
    }
  };

  const blockLetters = (e) => {
    if (!/[0-9]/.test(e.key)) {
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
      !nationality ||
      !age ||
      !bloodType ||
      !disability ||
      !civilStatus ||
      !cause ||
      !barangay ||
      !education ||
      !employment ||
      !address ||
      !occupation
    ) {
      alert("Please fill in all the fields.");
      return;
    }

    const newUser = {
      first_name: firstName,
      middle_name: middleName,
      last_name: lastName,
      gender: gender,
      date_of_birth: dateOfBirth,
      contact_num: contactNum,
      email: email,
      nationality: nationality,
      age: age,
      blood_type: bloodType,
      disability_status: disability,
      civilStatus: civilStatus,
      cause_status: cause,
      barangay: barangay,
      educational_status: education,
      employment_status: employment,
      house_address: address,
      occupation_name: occupation,
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
        // Check for 201 status code
        throw new Error("Failed to add user");
      } else {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "User Registered",
          showConfirmButton: false,
          timer: 1500,
        });
        setFirstName("");
        setAddress("");
        setAge("");
        setBarangay("");
        setBloodType("");
        setCause("");
        setCivilStatus("");
        setContactNum("");
        setDateOfBirth("");
        setDisability("");
        setEducation("");
        setEmail("");
        setEmployment("");
        setLastName("");
        setMiddleName("");
        setNationality("");
        setOccupation("");
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
    setCause("");
    setEducation("");
    setOccupation("");
    setEmployment("");
  };

  // const handleNumber = (e, setValue) => {
  //   const value = e.target.value;
  //   const regex = /^[0-9]*$/;
  //   if (regex.test(value) || value === "") {
  //     setValue(value);
  //   }
  // };
  const handleChange = (selectedOption) => {
    if (selectedOption) {
      setBarangay(selectedOption.value); // Set only the value
    } else {
      setBarangay(""); // Reset if no option is selected
    }
  };

  const options = [
    { value: "Banaybanay", label: "Banaybanay" },
    { value: "Banlic", label: "Banlic" },
    { value: "Baclaran", label: "Baclaran" },
    { value: "Bigaa", label: "Bigaa" },
    { value: "Butong", label: "Butong" },
    { value: "Casile", label: "Casile" },
    { value: "Diezmo", label: "Diezmo" },
    { value: "Gulod", label: "Gulod" },
    { value: "Mamatid", label: "Mamatid" },
    { value: "Marinig", label: "Marinig" },
    { value: "Niugan", label: "Niugan" },
    { value: "Pittland", label: "Pittland" },
    { value: "Poblacion-Dos", label: "Poblacion-Dos" },
    { value: "Poblacion-Uno", label: "Poblacion-Uno" },
    { value: "Poblacion-Tres", label: "Poblacion-Tres" },
    { value: "Pulo", label: "Pulo" },
    { value: "Sala", label: "Sala" },
  ];

  return (
    <Card className="shadow-lg rounded">
      <Card.Header className="bg-danger text-white fs-4 text-center">
        Add PWD
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={6}>
              <FloatingLabel controlId="floatingFirstName" label="First Name">
                <Form.Control
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="form-control-custom"
                />
              </FloatingLabel>
            </Col>
            <Col md={6}>
              <FloatingLabel controlId="floatingLastName" label="Last Name">
                <Form.Control
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className="form-control-custom"
                />
              </FloatingLabel>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <FloatingLabel controlId="floatingMiddleName" label="Middle Name">
                <Form.Control
                  type="text"
                  placeholder="Middle Name"
                  value={middleName}
                  onChange={(e) => setMiddleName(e.target.value)}
                  required
                  className="form-control-custom"
                />
              </FloatingLabel>
            </Col>
            <Col md={6}>
              <FloatingLabel controlId="floatingGender" label="Gender">
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
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <FloatingLabel controlId="floatingDOB" label="Date of Birth">
                <Form.Control
                  type="date"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  required
                  className="form-control-custom"
                />
              </FloatingLabel>
            </Col>
            <Col md={6}>
              <FloatingLabel controlId="floatingContact" label="Mobile Number">
                <Form.Control
                  type="text"
                  placeholder="Mobile Number"
                  value={contactNum}
                  onChange={(e) => setContactNum(e.target.value)}
                  className="form-control-custom"
                />
              </FloatingLabel>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <FloatingLabel controlId="floatingEmail" label="Email Address">
                <Form.Control
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control-custom"
                />
              </FloatingLabel>
            </Col>
            <Col md={6}>
              <FloatingLabel
                controlId="floatingNationality"
                label="Nationality"
              >
                <Form.Control
                  type="text"
                  placeholder="Nationality"
                  value={nationality}
                  onChange={(e) => setNationality(e.target.value)}
                  className="form-control-custom"
                />
              </FloatingLabel>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <FloatingLabel controlId="floatingAge" label="Age">
                <Form.Control
                  type="number"
                  placeholder="Age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="form-control-custom"
                />
              </FloatingLabel>
            </Col>
            <Col md={6}>
              <FloatingLabel controlId="floatingBloodType" label="Blood Type">
                <Form.Select
                  aria-label="Blood Type"
                  value={bloodType}
                  onChange={(e) => setBloodType(e.target.value)}
                  className="form-control-custom"
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
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <FloatingLabel
                controlId="floatingDisability"
                label="Type of Disability"
              >
                <Form.Select
                  aria-label="Type of Disability"
                  value={disability}
                  onChange={(e) => setDisability(e.target.value)}
                  className="form-control-custom"
                >
                  <option value="">Select Disability Type</option>
                  <option value="psychosocial">Psychosocial Disability</option>
                  <option value="visual">Visual Disability</option>
                  <option value="speech">Speech Disability</option>
                  <option value="mental">Mental Disability</option>
                  <option value="learning">Learning Disability</option>
                  <option value="hearing">Hearing Disability</option>
                  <option value="physical">Physical Disability</option>
                  <option value="intellectual">Intellectual Disability</option>
                </Form.Select>
              </FloatingLabel>
            </Col>
            <Col md={6}>
              <FloatingLabel
                controlId="floatingCivilStatus"
                label="Civil Status"
              >
                <Form.Select
                  aria-label="Civil Status"
                  value={civilStatus}
                  onChange={(e) => setCivilStatus(e.target.value)}
                  className="form-control-custom"
                >
                  <option value="">Select Civil Status</option>
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                  <option value="divorced">Divorced</option>
                  <option value="widowed">Widowed</option>
                </Form.Select>
              </FloatingLabel>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <FloatingLabel
                controlId="floatingCause"
                label="Cause of Disability"
              >
                <Form.Select
                  placeholder="Cause of Disability"
                  value={cause}
                  onChange={(e) => setCause(e.target.value)}
                  className="form-control-custom"
                >
                  <option>Select Cause</option>
                  <option value="acquired">Acquired</option>
                  <option value="inborn">Inborn</option>
                </Form.Select>
              </FloatingLabel>
            </Col>
            <Col md={6}>
              <Select
                options={options}
                value={
                  options.find((option) => option.value === barangay) || null
                } // Set the selected option
                onChange={handleChange} // Use the custom handleChange function
                placeholder="Select Barangay"
                className="basic-single form-control-custom"
                classNamePrefix="select"
                isSearchable // Allow searching
                styles={{
                  control: (base) => ({
                    ...base,
                    minHeight: "56px", // Set minimum height for the control
                  }),
                  menu: (base) => ({
                    ...base,
                    zIndex: 100, // Ensure the dropdown is above other elements
                  }),
                }}
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <FloatingLabel controlId="floatingAddress" label="Address">
                <Form.Control
                  type="text"
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="form-control-custom"
                />
              </FloatingLabel>
            </Col>
            <Col md={6}>
              <FloatingLabel controlId="floatingOccupation" label="Occupation">
                <Form.Control
                  type="text"
                  placeholder="Occupation"
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)}
                  className="form-control-custom"
                />
              </FloatingLabel>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={6}>
              <FloatingLabel
                controlId="floatingEducation"
                label="Education Level"
              >
                <Form.Select
                  placeholder="Education Level"
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                  className="form-control-custom"
                >
                  <option>Select Education</option>
                  <option value="vocational">Vocational</option>
                  <option value="college">College</option>
                  <option value="senior-high">Senior-high</option>
                  <option value="junior-high">Junior-high</option>
                  <option value="elementary">Elementary</option>
                  <option value="kinder">Kinder</option>
                </Form.Select>
              </FloatingLabel>
              <div className="text-center">
                <Button
                  variant="secondary"
                  type="button"
                  className="w-50 mx-auto mt-4"
                  onClick={clearForm}
                >
                  Clear
                </Button>
              </div>
            </Col>
            <Col md={6}>
              <FloatingLabel
                controlId="floatingEmployment"
                label="Employment Status"
              >
                <Form.Select
                  placeholder="Employment Status"
                  value={employment}
                  onChange={(e) => setEmployment(e.target.value)}
                  className="form-control-custom"
                >
                  <option>Select Employment</option>
                  <option value="self-employed">Self-Employed</option>
                  <option value="employed">Employed</option>
                  <option value="unemployed">Unemployed</option>
                  <option value="student">Student</option>
                </Form.Select>
              </FloatingLabel>
              <div className="text-center">
                <Button
                  variant="danger"
                  type="submit"
                  className="w-50 mx-auto mt-4"
                >
                  Register
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default Registration;
