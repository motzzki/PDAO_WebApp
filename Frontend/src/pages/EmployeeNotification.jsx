import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";
import moment from "moment";

const BASE_URL = "http://localhost:8000/api/notification";

const EmployeeNotification = () => {
  const [notifications, setNotifications] = useState([]);
  const [birthdays, setBirthdays] = useState([]);
  const [errorNotifications, setErrorNotifications] = useState(null);
  const [errorBirthday, setErrorBirthday] = useState(null);

  // Function to fetch notifications
  const fetchNotifications = async (type) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/employeenotif?type=${type}`
      );
      return response.data;
    } catch (err) {
      console.error("Error fetching notifications:", err);
      if (err.response && err.response.status === 404) {
        return [];
      }
      throw new Error("Could not fetch notifications");
    }
  };

  useEffect(() => {
    const fetchAllNotifications = async () => {
      try {
        const expiredIdNotifications = await fetchNotifications("notify_before");
        const expirationNotifications = await fetchNotifications("notify_on_expiration");
        const birthdayNotifications = await fetchNotifications("birthday");

        // Combine expired ID notifications
        setNotifications([
          ...expiredIdNotifications,
          ...expirationNotifications,
        ]);

        if (
          expiredIdNotifications.length === 0 &&
          expirationNotifications.length === 0
        ) {
          setErrorNotifications("No expired IDs found.");
        } else {
          setErrorNotifications(null);
        }

        setBirthdays(birthdayNotifications);
        if (birthdayNotifications.length === 0) {
          setErrorBirthday("No upcoming birthdays found.");
        } else {
          setErrorBirthday(null);
        }
      } catch (error) {
        console.error("Error during fetching notifications:", error);
      }
    };

    fetchAllNotifications();
  }, []);

  // Filter notifications to show only those not older than 1 day (24 hours)
  const filteredNotifications = notifications.filter((item) => {
    const expirationDate = moment(item.timestamp);
    const isOlderThanOneDay = expirationDate.diff(moment(), "days") < -1;
    return !isOlderThanOneDay; // Only include notifications not older than 1 day
  });

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Admin Notifications</h2>

      {/* Display error messages for expired IDs */}
      {errorNotifications && (
        <p style={styles.errorText}>{errorNotifications}</p>
      )}

      <h3 style={styles.subHeader}>Expired IDs</h3>
      <div style={styles.tableContainer}>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th style={styles.tableHead}>ID</th>
              <th style={styles.tableHead}>User Name</th>
              <th style={styles.tableHead}>Expiration Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((item) => (
                <tr key={item.notifId}>
                  <td>{item.userId}</td>
                  <td>{item.message}</td>
                  <td>{moment(item.timestamp).format("MMM DD, YYYY")}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center">
                  No expired IDs
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      <h3 style={styles.subHeader}>Upcoming Birthdays</h3>
      <div style={styles.tableContainer}>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th style={styles.tableHead}>ID</th>
              <th style={styles.tableHead}>User Name</th>
              <th style={styles.tableHead}>Birthday</th>
            </tr>
          </thead>
          <tbody>
            {birthdays.length > 0 ? (
              birthdays.map((user) => (
                <tr key={user.notifId}>
                  <td>{user.userId}</td>
                  <td>{user.message}</td>
                  <td>{moment(user.timestamp).format("MMM DD, YYYY")}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center">
                  No upcoming birthdays
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: "100%",           // Full width for responsiveness
    maxWidth: "1200px",       // Max width for wider layout
    margin: "0 auto",         // Center alignment
    padding: "20px",
    backgroundColor: "#f8f9fa",
    borderRadius: "12px",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
  },
  header: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: "20px",
  },
  subHeader: {
    fontSize: "22px",
    fontWeight: "600",
    color: "#333",
    marginTop: "20px",
  },
  errorText: {
    color: "#ff4d4d",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "10px",
  },
  tableContainer: {
    maxHeight: "22rem",
    overflowY: "auto",
    marginBottom: "20px",
  },
  tableHead: {
    backgroundColor: "#ff4d4d",
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
};

export default EmployeeNotification;
