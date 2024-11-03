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
        const expiredIdNotifications = await fetchNotifications(
          "notify_before"
        );
        const expirationNotifications = await fetchNotifications(
          "notify_on_expiration"
        );
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
    <div className="container">
      <h2 className="open-sans-bold mb-3">Admin Notifications</h2>

      {/* Display error messages for expired IDs */}
      {errorNotifications && (
        <p className="text-danger">{errorNotifications}</p>
      )}

      <h3>Expired IDs</h3>
      <div className="mb-5" style={{ maxHeight: "22rem", overflowY: "auto" }}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>User Name</th>
              <th>Expiration Date</th>
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

      <h3>Upcoming Birthdays</h3>
      <div style={{ maxHeight: "22rem", overflowY: "auto" }}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>User Name</th>
              <th>Birthday</th>
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

export default EmployeeNotification;
