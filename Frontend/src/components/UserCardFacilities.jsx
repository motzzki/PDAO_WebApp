import React, { useState } from "react";
import { Button, Card, Modal, Form } from "react-bootstrap";
import "../App.css";

const UserCardFacilities = ({ facility }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setIsEditing(false);
    setEditedFacility({ ...facility }); // Reset to original data
    setTempImage(facility.picture); // Reset to original image
  };

  const handleShow = () => setShow(true);

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
            {facility.facility_name}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="modal-body-custom">
          <Form.Group>
            <Form.Label className="modal-label">Location:</Form.Label>
            <p className="modal-text">{facility.location}</p>
          </Form.Group>
          <Form.Group>
            <Form.Label className="modal-label">
              Accessibility Features:
            </Form.Label>

            <p className="modal-text">{facility.accessibility_features}</p>
          </Form.Group>
          <Form.Group>
            <Form.Label className="modal-label">Picture:</Form.Label>

            <img
              src={facility.picture || "defaultImage.jpg"}
              alt="Facility"
              className="img-preview"
            />
          </Form.Group>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default UserCardFacilities;
