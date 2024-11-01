import React from "react";
import { Table } from "react-bootstrap";

const EmployeeNotification = () => {
  const expiredIds = [
    { id: 1, userName: "John Doe", expirationDate: "2024-10-31" },
    { id: 2, userName: "Jane Smith", expirationDate: "2024-11-15" },
    { id: 3, userName: "Alice Johnson", expirationDate: "2024-11-20" },
    // Add more sample data to demonstrate scrolling
    { id: 4, userName: "Bob Brown", expirationDate: "2024-12-01" },
    { id: 5, userName: "Emma Watson", expirationDate: "2024-12-10" },
    { id: 6, userName: "Liam Neeson", expirationDate: "2024-12-15" },
    { id: 7, userName: "Noah Wilson", expirationDate: "2024-12-20" },
    { id: 7, userName: "Noah Wilson", expirationDate: "2024-12-20" },
    { id: 7, userName: "Noah Wilson", expirationDate: "2024-12-20" },
    { id: 7, userName: "Noah Wilson", expirationDate: "2024-12-20" },
  ];

  const birthdays = [
    { id: 1, userName: "Mark Brown", birthday: "2024-11-05" },
    { id: 2, userName: "Samantha White", birthday: "2024-11-12" },
    { id: 3, userName: "Steve Wilson", birthday: "2024-11-20" },
    // Add more sample data to demonstrate scrolling
    { id: 4, userName: "Olivia Brown", birthday: "2024-11-25" },
    { id: 5, userName: "Isabella Smith", birthday: "2024-12-01" },
    { id: 6, userName: "Mason Johnson", birthday: "2024-12-10" },
    { id: 7, userName: "Sophia Lee", birthday: "2024-12-15" },
    { id: 7, userName: "Sophia Lee", birthday: "2024-12-15" },
    { id: 7, userName: "Sophia Lee", birthday: "2024-12-15" },
    { id: 7, userName: "Sophia Lee", birthday: "2024-12-15" },
    { id: 7, userName: "Sophia Lee", birthday: "2024-12-15" },
    { id: 7, userName: "Sophia Lee", birthday: "2024-12-15" },
    { id: 7, userName: "Sophia Lee", birthday: "2024-12-15" },
  ];

  return (
    <div className="container">
      <h2 className="open-sans-bold mb-3">Admin Notifications</h2>

      {/* Table for Expired IDs */}
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
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.userName}</td>
                  <td>{item.expirationDate}</td>
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

      {/* Table for Birthdays */}
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
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.userName}</td>
                  <td>{user.birthday}</td>
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
