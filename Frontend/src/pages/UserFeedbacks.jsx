import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import { host } from "../apiRoutes"; // Make sure host is properly configured

const TABLE_HEAD = [
  "Account ID", // Added Account ID to table header
  "Question 1",
  "Question 2",
  "Question 3",
  "Question 4",
  "Question 5",
  "Suggestion",
  "Average Rating",
  "Action",
];

const UserFeedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]); // Default value is an empty array
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [isFeedbackModalOpen, setFeedbackModalOpen] = useState(false);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get(`${host}/api/user_management/user-feedbacks`);
      setFeedbacks(response.data.user_feedbacks || response.data); // Make sure it's an array
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    }
  };

  const filteredFeedbacks = feedbacks.filter((feedback) =>
    feedback.suggestion.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openFeedbackModal = (feedback) => {
    setSelectedFeedback(feedback); // Set the selected feedback
    setFeedbackModalOpen(true); // Open the modal
  };

  const closeFeedbackModal = () => {
    setFeedbackModalOpen(false);
    setSelectedFeedback(null); // Reset the selected feedback
  };

  const onRowHover = (e) => {
    e.currentTarget.style.backgroundColor = "#e8f0fe"; // Soft blue on hover
  };

  const onRowLeave = (e) => {
    e.currentTarget.style.backgroundColor = "#ffffff"; // Reset to white
  };

  const calculateAverageRating = (feedback) => {
    const ratings = [
      feedback.question1,
      feedback.question2,
      feedback.question3,
      feedback.question4,
      feedback.question5,
    ];

    // Calculate the sum of ratings
    const sum = ratings.reduce((acc, rating) => acc + rating, 0);

    // Calculate the average
    return (sum / ratings.length).toFixed(2); // rounded to 2 decimal places
  };

  return (
    <div style={styles.tableContainer}>
      <div style={styles.header}>
        <h1 style={styles.title}>User Feedbacks</h1>
        <div style={styles.searchWrapper}>
          <input
            type="text"
            placeholder="Search by suggestion..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={styles.searchBar}
          />
        </div>
      </div>
      <Table striped bordered hover responsive style={styles.table}>
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th key={head} style={styles.tableHead}>
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredFeedbacks.length > 0 ? (
            filteredFeedbacks.map((feedback) => (
              <tr
                key={feedback.feedbackId}
                style={styles.tableRow}
                onMouseEnter={onRowHover}
                onMouseLeave={onRowLeave}
              >
                <td className="fs-4">{feedback.accountId}</td>
                <td className="fs-4">{feedback.question1}</td>
                <td className="fs-4">{feedback.question2}</td>
                <td className="fs-4">{feedback.question3}</td>
                <td className="fs-4">{feedback.question4}</td>
                <td className="fs-4">{feedback.question5}</td>
                <td className="fs-4">{feedback.suggestion.length === 0 ? "N/A" : feedback.suggestion}</td>
                <td className="fs-4">{calculateAverageRating(feedback)}</td>
                <td style={{ display: 'flex', justifyContent: 'center',         alignItems: 'center' }}>
                    <Button
                        className="btn btn-danger"
                        onClick={() => openFeedbackModal(feedback)}
                    >
                        View Details
                    </Button>
                    </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={TABLE_HEAD.length} style={styles.noData}>
                No feedback available
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Feedback Modal */}
      <Modal show={isFeedbackModalOpen} onHide={closeFeedbackModal}>
        <Modal.Header closeButton>
          <Modal.Title>Feedback Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedFeedback && (
            <Form>
              {/* Displaying accountId in Modal */}
              <div className="mb-4">
                <p><strong>Account ID:</strong> {selectedFeedback.accountId}</p>
              </div>

              {/* Question 1 */}
              <div className="mb-4">
                <p>How would you rate our service?</p>
                <div className="star-rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`star ${
                        selectedFeedback.question1 >= star ? "filled" : ""
                      }`}
                    >
                      &#9733;
                    </span>
                  ))}
                </div>
              </div>

              {/* Question 2 */}
              <div className="mb-4">
                <p>How would you rate the quality of our support?</p>
                <div className="star-rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`star ${
                        selectedFeedback.question2 >= star ? "filled" : ""
                      }`}
                    >
                      &#9733;
                    </span>
                  ))}
                </div>
              </div>

              {/* Question 3 */}
              <div className="mb-4">
                <p>How would you rate our website's user experience?</p>
                <div className="star-rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`star ${
                        selectedFeedback.question3 >= star ? "filled" : ""
                      }`}
                    >
                      &#9733;
                    </span>
                  ))}
                </div>
              </div>

              {/* Question 4 */}
              <div className="mb-4">
                <p>How would you rate the clarity of the information provided?</p>
                <div className="star-rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`star ${
                        selectedFeedback.question4 >= star ? "filled" : ""
                      }`}
                    >
                      &#9733;
                    </span>
                  ))}
                </div>
              </div>

              {/* Question 5 */}
              <div className="mb-4">
                <p>How likely are you to recommend us to others?</p>
                <div className="star-rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`star ${
                        selectedFeedback.question5 >= star ? "filled" : ""
                      }`}
                    >
                      &#9733;
                    </span>
                  ))}
                </div>
              </div>

              {/* Suggestion */}
              <div className="mb-4">
                <Form.Group controlId="suggestion">
                  <Form.Label>Additional Comments or Suggestions:</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={selectedFeedback.suggestion}
                    readOnly
                  />
                </Form.Group>
              </div>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeFeedbackModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

const styles = {
  tableContainer: {
    padding: "20px",
    backgroundColor: "#f8f9fa",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.05)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
  },
  searchWrapper: {
    position: "relative",
    width: "220px",
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
    padding: "12px",
  },
  tableRow: {
    textAlign: "center",
    padding: "12px",
    backgroundColor: "#ffffff",
    transition: "background-color 0.3s",
    borderBottom: "1px solid #eee",
  },
  noData: {
    textAlign: "center",
    padding: "20px",
    color: "#888",
  },
};

export default UserFeedbacks;
