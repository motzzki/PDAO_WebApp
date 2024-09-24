import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import moment from "moment";

const TABLE_HEAD = [
  "User Id",
  "First Name",
  "Middle Name",
  "Last Name",
  "Contact Number",
  "Email",
  "Gender",
  "Birthdate",
  "Username",
  "User Role",
  "Action",
];

const RegisteredUsers = () => {
  const [registeredUsers, setRegisteredUsers] = useState([]);

  useEffect(() => {
    fetchRegistered();
  }, []);

  const fetchRegistered = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/user_management/get-employee`
      );
      setRegisteredUsers(response.data);
    } catch (error) {
      console.error("Error fetching PWD information:", error);
    }
  };

  const onRowHover = (e) => {
    e.currentTarget.style.backgroundColor = "#f1f1f1"; // light grey on hover
  };

  const onRowLeave = (e) => {
    e.currentTarget.style.backgroundColor = "#ffffff"; // reset to white
  };

  return (
    <div style={styles.tableContainer}>
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
          {registeredUsers.map((employee) => (
            <tr
              key={employee.employeeId}
              style={styles.tableRow}
              onMouseEnter={onRowHover}
              onMouseLeave={onRowLeave}
            >
              <td>{employee.employeeId}</td>
              <td>{employee.firstname}</td>
              <td>{employee.middlename}</td>
              <td>{employee.lastname}</td>
              <td>{employee.contactnum}</td>
              <td>{employee.email}</td>
              <td>{employee.gender}</td>
              <td>{employee.birthdate}</td>
              <td>{employee.username}</td>
              <td>{employee.group_name}</td>
            </tr>
          ))}
        </tbody>
      </Table>
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
  table: {
    borderCollapse: "collapse",
    width: "100%",
    borderRadius: "10px",
    overflow: "hidden",
  },
  tableHead: {
    backgroundColor: "#e0e0e0", // light gray background for table headers
    color: "#333", // dark text color for good contrast
    textAlign: "center",
    fontWeight: "bold",
    padding: "12px",
  },
  noData: {
    textAlign: "center",
    padding: "20px",
    color: "#888", // grey color for no data message
  },
};

export default RegisteredUsers;
