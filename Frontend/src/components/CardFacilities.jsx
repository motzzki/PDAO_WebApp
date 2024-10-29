import React, { useState } from "react";
import { Button, Card, Modal, Form } from "react-bootstrap";
import "../App.css";

const CardFacilities = ({ facility }) => {
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

  const handleSubmit = () => {
    // Add function to submit the changes, e.g., updating the server
    console.log("Submitted data:", editedFacility);
    setIsEditing(false);
  };

  return (
    <>
      <Card className="card-container">
        <Card.Img
          variant="top"
          src={facility.picture || "defaultImage.jpg"}
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
          <Form.Group>
            <Form.Label className="modal-label">Flag Status:</Form.Label>
            {isEditing ? (
              <Form.Control
                as="select"
                name="flag"
                value={editedFacility.flag}
                onChange={handleInputChange}
                className="edit-input"
              >
                <option value="1">Active</option>
                <option value="0">Inactive</option>
              </Form.Control>
            ) : (
              <p className="modal-text">
                {facility.flag ? "Active" : "Inactive"}
              </p>
            )}
          </Form.Group>
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
