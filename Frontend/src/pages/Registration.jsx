import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Registration = () => {
  return (
    <Card>
      <Card.Header className="open-sans-bold fs-3">Add PWD</Card.Header>
      <Card.Body className="open-sans-regular">
        <Form className="my-2">
          {/* Name Fields */}
          <Row className="mb-3">
            <Col md={4}>
              <FloatingLabel controlId="floatingFirstName" label="First Name">
                <Form.Control type="text" placeholder="First Name" />
              </FloatingLabel>
            </Col>
            <Col md={4}>
              <FloatingLabel controlId="floatingLastName" label="Last Name">
                <Form.Control type="text" placeholder="Last Name" />
              </FloatingLabel>
            </Col>
            <Col md={4}>
              <FloatingLabel controlId="floatingMiddleName" label="Middle Name">
                <Form.Control type="text" placeholder="Middle Name" />
              </FloatingLabel>
            </Col>
          </Row>

          {/* Sex and Date of Birth */}
          <Row className="mb-3">
            <Col md={6}>
              <FloatingLabel controlId="floatingSex" label="Gender">
                <Form.Select aria-label="Gender">
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
                <Form.Control type="date" placeholder="Date of Birth" />
              </Form.Group>
            </Col>
          </Row>

          {/* Mobile Number, Email Address, and Nationality */}
          <Row className="mb-3">
            <Col md={4}>
              <FloatingLabel controlId="floatingMobile" label="Mobile Number">
                <Form.Control type="text" placeholder="Mobile Number" />
              </FloatingLabel>
            </Col>
            <Col md={4}>
              <FloatingLabel controlId="floatingEmail" label="Email Address">
                <Form.Control type="email" placeholder="Email Address" />
              </FloatingLabel>
            </Col>
            <Col md={4}>
              <FloatingLabel
                controlId="floatingNationality"
                label="Nationality"
              >
                <Form.Control type="text" placeholder="Nationality" />
              </FloatingLabel>
            </Col>
          </Row>

          {/* Age, Blood Type, and Occupation */}
          <Row className="mb-3">
            <Col md={4}>
              <FloatingLabel controlId="floatingAge" label="Age">
                <Form.Control type="number" placeholder="Age" />
              </FloatingLabel>
            </Col>
            <Col md={4}>
              <FloatingLabel controlId="floatingBloodType" label="Blood Type">
                <Form.Select aria-label="Blood Type">
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
              <FloatingLabel controlId="floatingOccupation" label="Occupation">
                <Form.Control type="text" placeholder="Occupation" />
              </FloatingLabel>
            </Col>
          </Row>

          {/* Disability Type, Civil Status, Barangay, and Disability Cause */}
          <Row className="mb-3">
            <Col md={6}>
              <FloatingLabel
                controlId="floatingDisabilityType"
                label="Type of Disability (Please check only one)"
              >
                <Form.Select aria-label="Type of Disability">
                  <option value="">Select Disability Type</option>
                  <option value="psychosocial">Psychosocial Disability</option>
                  <option value="visual">Visual Disability</option>
                  <option value="speech">Speech Disability</option>
                  <option value="mental">Mental Disability</option>
                  <option value="learning">Learning Disability</option>
                  <option value="hearing">Hearing Disability</option>
                  <option value="orthopedic">
                    Orthopedic Disability (Musculoskeletal)
                  </option>
                </Form.Select>
              </FloatingLabel>
            </Col>
            <Col md={6}>
              <FloatingLabel
                controlId="floatingCivilStatus"
                label="Civil Status"
              >
                <Form.Select aria-label="Civil Status">
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
                <Form.Select aria-label="Barangay">
                  <option value="">Select Barangay</option>
                  <option value="baclaran">Baclaran</option>
                  <option value="banaybanay">Banaybanay</option>
                  <option value="banlic">Banlic</option>
                  <option value="bigaa">Bigaa</option>
                  <option value="butong">Butong</option>
                  <option value="casile">Casile</option>
                  <option value="diezmo">Diezmo</option>
                  <option value="gulod">Gulod</option>
                  <option value="mamatid">Mamatid</option>
                  <option value="marinig">Marinig</option>
                  <option value="niugan">Niugan</option>
                  <option value="pittland">Pittland</option>
                  <option value="poblacion-uno">Poblacion Uno</option>
                  <option value="poblacion-dos">Poblacion Dos</option>
                  <option value="poblacion-tres">Poblacion Tres</option>
                  <option value="pulo">Pulo</option>
                  <option value="sala">Sala</option>
                  <option value="san-isidro">San Isidro</option>
                </Form.Select>
              </FloatingLabel>
            </Col>
            <Col md={4}>
              <FloatingLabel
                controlId="floatingSelectDisabilityCause"
                label="Cause of Disability"
              >
                <Form.Select aria-label="Cause of Disability">
                  <option value="">Select cause</option>
                  <option value="inborn">Inborn</option>
                  <option value="acquired">Acquired</option>
                </Form.Select>
              </FloatingLabel>
            </Col>
            <Col md={4}>
              <FloatingLabel
                controlId="floatingEducationalAttainment"
                label="Educational Attainment"
              >
                <Form.Select aria-label="Educational Attainment">
                  <option value="">Select Educational Attainment</option>
                  <option value="none">None</option>
                  <option value="kinder">Kindergarten</option>
                  <option value="elem">Elementary</option>
                  <option value="junior-high">Junior High</option>
                  <option value="senior-high">Senior High</option>
                  <option value="college">College</option>
                  <option value="vocational">Vocational</option>
                  <option value="post-graduate">Post Graduate</option>
                </Form.Select>
              </FloatingLabel>
            </Col>
          </Row>

          {/* Employment Status */}
          <Row className="mb-3">
            <Col md={12}>
              <FloatingLabel
                controlId="floatingSelectEmployment"
                label="Employment Status"
              >
                <Form.Select aria-label="Employment Status">
                  <option value="">Select Employment Status</option>
                  <option value="employed">Employed</option>
                  <option value="unemployed">Unemployed</option>
                  <option value="self-employed">Self-Employed</option>
                  <option value="student">Student</option>
                </Form.Select>
              </FloatingLabel>
            </Col>
          </Row>

          {/* Address (Text Area) */}
          <Row className="mb-3">
            <Col md={12}>
              <FloatingLabel controlId="floatingAddress" label="Address">
                <Form.Control as="textarea" placeholder="Address" rows={3} />
              </FloatingLabel>
            </Col>
          </Row>

          <div className="d-flex justify-content-between mt-5">
            <Button size="lg" variant="secondary">
              Clear
            </Button>
            <Button size="lg" variant="primary" type="submit">
              Register
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default Registration;
