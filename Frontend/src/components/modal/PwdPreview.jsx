import React, { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import axios from "axios";

const TABLE_HEAD = [
  "User Id",
  "Disability Status",
  "Cause Status",
  "Civil Status",
  "Educational Status",
  "Employee Status",
  "Occupation Name",
  "House Address",
  "Barangay",
];

const PwdPreview = ({ show, handleClose, userId }) => {
  const [previewPwd, setPreviewPwd] = useState([]);

  useEffect(() => {
    if (userId) {
      fetchRegistered(userId);
    }
  }, [userId]);

  const fetchRegistered = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/pwdInfo/pwd_details/${userId}`
      );
      setPreviewPwd(response.data); // Wrap in array to match table rendering
    } catch (error) {
      console.error("Error fetching PWD details:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>User Information</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th key={head}>{head}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {previewPwd.map((infos) => (
              <tr key={infos.userId}>
                <td>{infos.userId}</td>
                <td>{infos.disability_status}</td>
                <td>{infos.cause_status}</td>
                <td>{infos.civilStatus}</td>
                <td>{infos.educational_status}</td>
                <td>{infos.employment_status}</td>
                <td>{infos.occupation_name}</td>
                <td>{infos.house_address}</td>
                <td>{infos.barangay}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PwdPreview;
