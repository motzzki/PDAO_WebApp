import React, { useState } from "react";
import { Button, Form, Modal, Image, Row, Col } from "react-bootstrap";
import axios from "axios";
import "../../App.css"; // Assuming you have a CSS file for styles

const AddFacility = ({ show, handleClose, onSave }) => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [facilityName, setFacilityName] = useState("");
  const [location, setLocation] = useState("");
  const [accessibilityFeatures, setAccessibilityFeatures] = useState("");
  const [flag, setFlag] = useState("");

  const BASE_URL = "http://localhost:8000/api/pwdInfo";

  const resetField = () => {
    setImagePreview(null);
    setFacilityName("");
    setLocation("");
    setAccessibilityFeatures("");
    setFlag("");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    const formData = new FormData();
    formData.append("facility_name", facilityName);
    formData.append("location", location);
    formData.append("accessibility_features", accessibilityFeatures);
    formData.append("flag", flag);
    if (image) {
      formData.append("picture", image); // Append the image file
    }

    try {
      const response = await axios.post(`${BASE_URL}/facilities`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Important for file uploads
        },
      });
      console.log(response.data); // Handle success response
      handleClose();
      resetField();
      onSave();
    } catch (error) {
      console.error("Error adding facility:", error.response.data);
      // Handle error response
    }
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="xl"
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Add Facility</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={8}>
              <Form.Group className="mb-3" controlId="facilityName">
                <Form.Label>Facility Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter facility name"
                  value={facilityName}
                  onChange={(e) => setFacilityName(e.target.value)} // Update state
                  required // Mark as required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="facilityLocation">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)} // Update state
                  required // Mark as required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="accessibilityFeatures">
                <Form.Label>Accessibility Features</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Enter accessibility features"
                  value={accessibilityFeatures}
                  onChange={(e) => setAccessibilityFeatures(e.target.value)} // Update state
                />
              </Form.Group>
              <Form.Label>Pro/Anti Friendly Vicinity</Form.Label>
              <Form.Select
                aria-label="Default select example"
                value={flag}
                onChange={(e) => setFlag(e.target.value)} // Update state
                required // Mark as required
              >
                <option value="">Select</option>
                <option value="1">Pro-Friendly</option>
                <option value="0">Anti-Friendly</option>
              </Form.Select>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3" controlId="imageUpload">
                <Form.Label>Upload Image</Form.Label>
                <div className="image-upload-box">
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="image-input"
                  />
                  <div className="upload-instructions">
                    {imagePreview ? (
                      <Image src={imagePreview} alt="Selected Image" fluid />
                    ) : (
                      <p>Drag & drop your image here, or click to select</p>
                    )}
                  </div>
                </div>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col className="text-end">
              <Button
                variant="secondary"
                onClick={handleClose}
                className="me-2"
              >
                Close
              </Button>
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddFacility;
