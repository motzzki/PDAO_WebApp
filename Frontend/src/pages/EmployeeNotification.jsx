import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";
import moment from "moment";

const BASE_URL = "http://localhost:8000/api/notification";

const EmployeeNotification = () => {
  const [expiredIds, setExpiredIds] = useState([]);
  const [birthdays, setBirthdays] = useState([]);
  const [errorExpired, setErrorExpired] = useState(null);
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
        const expiredIdNotifications = await fetchNotifications("expired_id");
        setExpiredIds(expiredIdNotifications);
        if (expiredIdNotifications.length === 0) {
          setErrorExpired("No expired IDs found.");
        } else {
          setErrorExpired(null);
        }

        const birthdayNotifications = await fetchNotifications("birthday");
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

  return (
    <div className="container">
      <h2 className="open-sans-bold mb-3">Admin Notifications</h2>

      {/* Display error messages */}
      {errorExpired && <p className="text-danger">{errorExpired}</p>}
      {errorBirthday && <p className="text-danger">{errorBirthday}</p>}

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
            {expiredIds.length > 0 ? (
              expiredIds.map((item) => (
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
