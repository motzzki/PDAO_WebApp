import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import searchIcon from "../images/search.svg";
import { host } from "../apiRoutes";
import Swal from "sweetalert2";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";

const BirthdayCashGift = () => {
  const [birthdays, setBirthdays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalClaimed, setTotalClaimed] = useState(0);
  const [totalUnclaimed, setTotalUnclaimed] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleShow = () => setShowModal(true);

  const handleClose = () => {
    setShowModal(false);
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (selectedFile) {
      try {
        const formData = new FormData();
        formData.append("file", selectedFile);

        console.log("Uploading file:", selectedFile);

        const response = await axios.post(
          `${host}/api/pwdInfo/post-sched`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 201) {
          alert("Image uploaded successfully!");
          console.log("Upload response:", response.data);
          handleClose(); // Close the modal after successful upload
        } else {
          alert("Failed to upload image. Please try again.");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("An error occurred while uploading the image.");
      }
    } else {
      alert("Please select a file to upload.");
    }
  };

  useEffect(() => {
    fetchBirthdays();
  }, []);

  const fetchBirthdays = async () => {
    try {
      const response = await axios.get(
        `${host}/api/user_management/current-cashgift`
      );
      const birthdaysData = response.data.birthdays;

      setBirthdays(birthdaysData);
      setTotalClaimed(birthdaysData.filter((b) => b.claim_tag === 1).length);
      setTotalUnclaimed(birthdaysData.filter((b) => b.claim_tag === 0).length);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching birthdays:", error);
      setError("Failed to load birthdays");
      setLoading(false);
    }
  };

  const handleClaim = (userId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to claim the cash gift for this user.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, claim it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.post(
            `${host}/api/user_management/claim`,
            {
              userId,
              claimType: "birthday",
            }
          );

          Swal.fire("Claimed!", response.data.message, "success");
          setBirthdays((prevState) =>
            prevState.map((user) =>
              user.userId === userId ? { ...user, claim_tag: 1 } : user
            )
          );
          setTotalClaimed((prevTotal) => prevTotal + 1);
          fetchBirthdays();
        } catch (error) {
          Swal.fire(
            "Error",
            error.response?.data?.message || "Failed to claim the gift",
            "error"
          );
        }
      }
    });
  };

  const filteredBirthdays = birthdays.filter((user) =>
    user.first_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={styles.tableContainer}>
      <div style={styles.header}>
        <h1 style={styles.title}>Birthday Cash Gift</h1>
        <div className="d-flex flex-row align-items-center">
          <button className="btn btn-danger me-3" onClick={handleShow}>
            Upload Schedule
          </button>
          <div style={styles.searchWrapper}>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-control"
              style={styles.searchBar}
            />
            <img
              src={searchIcon}
              alt="search"
              className="position-absolute"
              style={styles.searchIcon}
            />
          </div>
        </div>
      </div>
      <Table striped bordered hover responsive style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableHead}>User ID</th>
            <th style={styles.tableHead}>Name</th>
            <th style={styles.tableHead}>Gender</th>
            <th style={styles.tableHead}>Date of Birth</th>
            <th style={styles.tableHead}>Action</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="5" className="text-center">
                Loading...
              </td>
            </tr>
          ) : error ? (
            <tr>
              <td colSpan="5" className="text-center text-danger">
                {error}
              </td>
            </tr>
          ) : (
            filteredBirthdays.map((user) => (
              <tr
                key={user.userId}
                style={styles.tableRow}
                onMouseEnter={onRowHover}
                onMouseLeave={onRowLeave}
              >
                <td>{user.userId}</td>
                <td>{`${user.first_name} ${user.middle_name} ${user.last_name}`}</td>
                <td>{user.gender}</td>
                <td>{new Date(user.date_of_birth).toLocaleDateString()}</td>
                <td className="text-center">
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleClaim(user.userId)}
                    disabled={user.claim_tag === 1}
                    style={{
                      cursor: user.claim_tag === 1 ? "not-allowed" : "pointer",
                    }}
                  >
                    {user.claim_tag === 1 ? "Claimed" : "Claim"}
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      {/* Legend for claimed and unclaimed totals */}
      <div style={styles.legend}>
        <span className="badge bg-success" style={styles.badge}>
          Claimed: {totalClaimed}
        </span>
        <span className="badge bg-danger" style={styles.badge}>
          Unclaimed: {totalUnclaimed}
        </span>
      </div>
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Upload Schedule Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpload}>
            <Form.Group controlId="formFile">
              <Form.Label>Select an image to upload:</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </Form.Group>

            {/* Image Preview */}
            {previewUrl && (
              <div className="mt-3 text-center">
                <img
                  src={previewUrl}
                  alt="Preview"
                  style={{
                    width: "100%",
                    maxHeight: "300px",
                    objectFit: "cover",
                  }}
                />
              </div>
            )}
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
    </div>
  );
};

const styles = {
  tableContainer: {
    padding: "20px",
    backgroundColor: "#f8f9fa",
    borderRadius: "12px",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  title: {
    fontSize: "26px",
    fontWeight: "bold",
    color: "#333",
  },
  searchWrapper: {
    position: "relative",
    width: "25rem",
    height: "2.5rem",
  },
  searchBar: {
    padding: "10px",
    borderRadius: "20px",
    border: "1px solid #ddd",
    width: "100%",
    paddingRight: "35px",
    fontSize: "14px",
    backgroundColor: "#fafafa",
  },
  searchIcon: {
    position: "absolute",
    right: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    width: "18px",
    height: "18px",
    cursor: "pointer",
  },
  table: {
    borderCollapse: "separate",
    borderSpacing: "0 8px",
    width: "100%",
    borderRadius: "10px",
    overflow: "hidden",
  },
  tableHead: {
    backgroundColor: "#ff4d4d",
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    padding: "14px",
    fontSize: "16px",
  },
  tableRow: {
    textAlign: "center",
    padding: "12px",
    backgroundColor: "#ffffff",
    transition: "background-color 0.3s",
    borderBottom: "1px solid #eee",
  },
  legend: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginTop: "20px",
  },
  badge: {
    fontSize: "14px",
    padding: "8px 12px",
    borderRadius: "20px",
  },
};

const onRowHover = (e) => {
  e.currentTarget.style.backgroundColor = "#e8f0fe";
};
const onRowLeave = (e) => {
  e.currentTarget.style.backgroundColor = "#ffffff";
};

export default BirthdayCashGift;
