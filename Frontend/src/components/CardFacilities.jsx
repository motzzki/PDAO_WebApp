import React, { useState } from "react";
import { Button, Card, Modal, Form } from "react-bootstrap";
import "../App.css";
import axios from "axios";
import { host } from "../apiRoutes";

const CardFacilities = ({ facility, onSave }) => {
  const [show, setShow] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedFacility, setEditedFacility] = useState({ ...facility });
  const [tempImage, setTempImage] = useState(facility.picture);

  const handleClose = () => {
    setShow(false);
    setIsEditing(false);
    setEditedFacility({ ...facility }); // Reset to original data
    setTempImage(facility.picture); // Reset to original image
  };

  const handleShow = () => setShow(true);

  const handleEditClick = () => setIsEditing(true);

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedFacility({ ...facility });
    setTempImage(facility.picture);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedFacility((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setTempImage(URL.createObjectURL(file));
      setEditedFacility((prev) => ({ ...prev, picture: file }));
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("facility_name", editedFacility.facility_name);
      formData.append("location", editedFacility.location);
      formData.append("flag", editedFacility.flag);
      formData.append(
        "accessibility_features",
        editedFacility.accessibility_features
      );

      // Add the image file if it was changed
      if (editedFacility.picture instanceof File) {
        formData.append("picture", editedFacility.picture);
      }

      await axios.put(
        `${host}/api/pwdInfo/facilities/${facility.facility_id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setIsEditing(false);
      handleClose();
      onSave(); // Close the modal after successful update
    } catch (error) {
      console.error("Error updating facility:", error);
      // Handle error (e.g., show a notification or alert)
    }
  };

  return (
    <>
      <Card className="card-container">
        <Card.Img
          variant="top"
          src={facility.picture}
          className="card-img-fixed"
        />
        <Card.Body className="card-body-custom">
          <Card.Title className="card-title">
            {facility.facility_name}
          </Card.Title>
          <Card.Text className="card-text">{facility.location}</Card.Text>
          <Button
            variant="danger"
            className="view-details-btn"
            onClick={handleShow}
          >
            View more details
          </Button>
        </Card.Body>
      </Card>

      <Modal
        show={show}
        onHide={handleClose}
        centered
        size="lg"
        className="custom-modal"
      >
        <Modal.Header className="modal-header-custom" closeButton>
          <Modal.Title className="modal-title-custom">
            {isEditing ? (
              <>
                <Form.Label className="modal-label">Facility Name:</Form.Label>
                <Form.Control
                  type="text"
                  name="facility_name"
                  value={editedFacility.facility_name}
                  onChange={handleInputChange}
                  className="edit-input"
                />
              </>
            ) : (
              facility.facility_name
            )}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="modal-body-custom">
          <Form.Group>
            <Form.Label className="modal-label">Location:</Form.Label>
            {isEditing ? (
              <Form.Control
                type="text"
                name="location"
                value={editedFacility.location}
                onChange={handleInputChange}
                className="edit-input"
              />
            ) : (
              <p className="modal-text">{facility.location}</p>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label className="modal-label">
              Accessibility Features:
            </Form.Label>
            {isEditing ? (
              <Form.Control
                as="textarea"
                name="accessibility_features"
                rows="3"
                value={editedFacility.accessibility_features}
                onChange={handleInputChange}
                className="edit-input"
              />
            ) : (
              <p className="modal-text">{facility.accessibility_features}</p>
            )}
          </Form.Group>
          {isEditing && (
            <Form.Group>
              <Form.Label className="modal-label">
                Pro/Anti-Friendly Status
              </Form.Label>
              <Form.Control
                as="select"
                name="flag"
                value={editedFacility.flag}
                onChange={handleInputChange}
                className="edit-input"
              >
                <option value="1">Pro-Friendly</option>
                <option value="0">Anti-Friendly</option>
              </Form.Control>
            </Form.Group>
          )}

          <Form.Group>
            <Form.Label className="modal-label">Picture:</Form.Label>
            {isEditing ? (
              <>
                <img
                  src={tempImage || "defaultImage.jpg"}
                  alt="Facility"
                  className="img-preview"
                />
                <Form.Control
                  type="file"
                  className="upload-input"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </>
            ) : (
              <img
                src={facility.picture || "defaultImage.jpg"}
                alt="Facility"
                className="img-preview"
              />
            )}
          </Form.Group>
        </Modal.Body>
        <Modal.Footer className="modal-footer-custom">
          {isEditing ? (
            <>
              <Button
                className="btn-secondary-custom"
                onClick={handleCancelEdit}
              >
                Cancel
              </Button>
              <Button className="btn-primary-custom" onClick={handleSubmit}>
                Submit
              </Button>
            </>
          ) : (
            <Button className="btn-primary-custom" onClick={handleEditClick}>
              Edit
            </Button>
          )}
          <Button className="btn-secondary-custom" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CardFacilities;
