import React, { useState } from "react";
import {
  Button,
  Card,
  FloatingLabel,
  Form,
  Row,
  Col,
  ProgressBar,
  Container,
  CardBody,
} from "react-bootstrap";
import Select from "react-select";
import axios from "axios";
import Swal from "sweetalert2";
import { host } from "../apiRoutes";

const Registration = () => {
  const [currentStep, setCurrentStep] = useState(1);
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

  const calculateAge = (dateOfBirth) => {
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    let calculatedAge = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      calculatedAge--;
    }

    return calculatedAge;
  };

  const handleDobChange = (e) => {
    const dateOfBirth = e.target.value;
    setDateOfBirth(dateOfBirth);
    if (dateOfBirth) {
      setAge(calculateAge(dateOfBirth));
    } else {
      setAge("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic field validation
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

    // Email validation (basic regex check)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Contact number validation (must be 11 digits)
    if (!/^\d{11}$/.test(contactNum)) {
      alert("Please enter a valid 11-digit contact number.");
      return;
    }

    // Additional validations for fields like age (must be a positive number)
    if (isNaN(age) || age <= 0) {
      alert("Please enter a valid age.");
      return;
    }

    // Create new user object
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
        `${host}/api/registerPwd/register_pwd`,
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
            "<h3 style='color: #333; font-weight: 600;'>User Registered Successfully</h3>",
          html: `
            <div style="text-align: left; margin-bottom: 10px;">
              <p><strong>Account ID:</strong> <span style="color: #007bff;">${response.data.accountId}</span></p>
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

        // Reset form fields after successful registration
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
      alert("An error occurred while registering the user. Please try again.");
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

  const handleChange = (selectedOption) => {
    if (selectedOption) {
      setBarangay(selectedOption.value); // Set only the value
    } else {
      setBarangay(""); // Reset if no option is selected
    }
  };
  const handleContactNumChange = (e) => {
    const value = e.target.value;
    // Remove all non-numeric characters and limit to 11 digits
    const filteredValue = value.replace(/[^0-9]/g, "").slice(0, 11);
    setContactNum(filteredValue);
  };

  const options = [
    { value: "banaybanay", label: "Banaybanay" },
    { value: "banlic", label: "Banlic" },
    { value: "baclaran", label: "Baclaran" },
    { value: "bigaa", label: "Bigaa" },
    { value: "butong", label: "Butong" },
    { value: "casile", label: "Casile" },
    { value: "diezmo", label: "Diezmo" },
    { value: "gulod", label: "Gulod" },
    { value: "mamatid", label: "Mamatid" },
    { value: "marinig", label: "Marinig" },
    { value: "niugan", label: "Niugan" },
    { value: "pittland", label: "Pittland" },
    { value: "poblacion-dos", label: "Poblacion-Dos" },
    { value: "poblacion-uno", label: "Poblacion-Uno" },
    { value: "poblacion-tres", label: "Poblacion-Tres" },
    { value: "pulo", label: "Pulo" },
    { value: "sala", label: "Sala" },
    { value: "san-isidro", label: "San-isidro" },
  ];

  const progressBarVariant = (step) => {
    switch (step) {
      case 1:
        return "warning";
      case 2:
        return "info";
      case 3:
        return "success";
      default:
        return "primary";
    }
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <Container>
      <h1 className="mb-4 text-center">Registration Form</h1>

      <Row>
        <Col md={14} className="mx-auto">
          <Card>
            <Card.Body>
              <ProgressBar
                now={(currentStep / 3) * 100}
                variant={progressBarVariant(currentStep)}
                label={`Step ${currentStep} of 3`}
                className="mb-3"
              />
              <Form onSubmit={handleSubmit}>
                {currentStep === 1 && (
                  <>
                    <h4 className="text-center mb-3">Personal Information</h4>
                    <div className="">
                      <Form.Group className="mb-3 d-flex justify-content-evenly">
                        <Form.Check
                          type="radio"
                          id="newId"
                          name="option" // All radios with the same name will behave like a group
                          label="New ID"
                        />
                        <Form.Check
                          type="radio"
                          id="renewal"
                          name="option"
                          label="Renewal"
                        />
                        <Form.Check
                          type="radio"
                          id="lostId"
                          name="option"
                          label="Lost ID"
                        />
                        <Form.Check
                          type="radio"
                          id="changeInfo"
                          name="option"
                          label="Change Info"
                        />
                        <Form.Check
                          type="radio"
                          id="transfer"
                          name="option"
                          label="Transfer"
                        />
                      </Form.Group>
                    </div>

                    <Row className="g-4">
                      <Col md={4}>
                        <FloatingLabel
                          controlId="floatingFirstName"
                          label="First Name"
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
                      </Col>
                      <Col md={4}>
                        <FloatingLabel
                          controlId="floatingMiddleName"
                          label="Middle Name"
                        >
                          <Form.Control
                            type="text"
                            placeholder="Middle Name"
                            value={middleName}
                            onChange={(e) => setMiddleName(e.target.value)}
                            onKeyDown={blockNumbers} // Changed to onKeyDown
                            required
                            className="form-control-custom"
                          />
                        </FloatingLabel>
                      </Col>
                      <Col md={4}>
                        <FloatingLabel
                          controlId="floatingLastName"
                          label="Last Name"
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
                      </Col>
                      <Col md={4}>
                        <FloatingLabel
                          controlId="floatingGender"
                          label="Gender"
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
                      </Col>
                      <Col md={4}>
                        <FloatingLabel
                          controlId="floatingDOB"
                          label="Date of Birth"
                        >
                          <Form.Control
                            type="date"
                            value={dateOfBirth}
                            onChange={handleDobChange}
                            required
                            className="form-control-custom"
                          />
                        </FloatingLabel>
                      </Col>
                      <Col md={4}>
                        <FloatingLabel controlId="floatingAge" label="Age">
                          <Form.Control
                            placeholder="Age"
                            value={age}
                            readOnly
                            className="form-control-custom"
                          />
                        </FloatingLabel>
                      </Col>
                      <Col md={6}>
                        <FloatingLabel
                          controlId="floatingOccupation"
                          label="Occupation"
                        >
                          <Form.Control
                            type="text"
                            placeholder="Occupation"
                            value={occupation}
                            onChange={(e) => setOccupation(e.target.value)}
                            onKeyDown={blockNumbers} // Changed to onKeyDown
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
                            onKeyDown={blockNumbers} // Changed to onKeyDown
                            className="form-control-custom"
                          />
                        </FloatingLabel>
                      </Col>
                    </Row>
                    <div className="mt-5 d-flex justify-content-end mb-5">
                      <Button variant="primary" onClick={nextStep}>
                        Next
                      </Button>
                    </div>
                  </>
                )}
                {currentStep === 2 && (
                  <>
                    <h4 className="text-center mb-3">Contact & Address</h4>
                    <Row className="g-4">
                      <Col md={6}>
                        <FloatingLabel
                          controlId="floatingContact"
                          label="Mobile Number"
                        >
                          <Form.Control
                            type="text"
                            placeholder="Mobile Number"
                            value={contactNum}
                            onChange={handleContactNumChange}
                            className="form-control-custom"
                          />
                        </FloatingLabel>
                      </Col>

                      <Col md={6}>
                        <FloatingLabel
                          controlId="floatingEmail"
                          label="Email Address"
                        >
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
                          controlId="floatingAddress"
                          label="Address"
                        >
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
                        <Select
                          options={options}
                          value={
                            options.find(
                              (option) => option.value === barangay
                            ) || null
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
                    <div className="mt-5 d-flex justify-content-between mb-5">
                      <Button
                        variant="secondary"
                        onClick={prevStep}
                        disabled={currentStep === 1}
                      >
                        Previous
                      </Button>
                      <Button
                        variant="primary"
                        onClick={nextStep}
                        disabled={currentStep === 3}
                      >
                        Next
                      </Button>
                      {/* {currentStep === 3 && (
                        <Button type="submit" variant="success">
                          Submit
                        </Button>
                      )} */}
                    </div>
                  </>
                )}
                {currentStep === 3 && (
                  <>
                    <h4 className="text-center mb-4">Health & Status</h4>
                    <Row className="g-4">
                      <Col md={4}>
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
                      <Col md={4}>
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
                      </Col>
                      <Col md={4}>
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
                      </Col>
                      <Col md={4}>
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
                            <option value="psychosocial">
                              Psychosocial Disability
                            </option>
                            <option value="visual">Visual Disability</option>
                            <option value="speech">Speech Disability</option>
                            <option value="mental">Mental Disability</option>
                            <option value="learning">
                              Learning Disability
                            </option>
                            <option value="hearing">Hearing Disability</option>
                            <option value="physical">
                              Physical Disability
                            </option>
                            <option value="intellectual">
                              Intellectual Disability
                            </option>
                          </Form.Select>
                        </FloatingLabel>
                      </Col>
                      <Col md={4}>
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
                      <Col md={4}>
                        <FloatingLabel
                          controlId="floatingBloodType"
                          label="Blood Type"
                        >
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
                    <div className="mt-5 d-flex justify-content-between mb-5">
                      <Button
                        variant="secondary"
                        onClick={prevStep}
                        disabled={currentStep === 1}
                      >
                        Previous
                      </Button>
                      {/* <Button
                    variant="primary"
                    onClick={nextStep}
                    disabled={currentStep === 3}
                  >
                    Next
                  </Button> */}
                      {currentStep === 3 && (
                        <Button type="submit" variant="success">
                          Submit
                        </Button>
                      )}
                    </div>
                  </>
                )}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Registration;
