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
  "Age",
  "Gender",
  "Birthdate",
  "Blood Type",
  "Nationality",
  "Civil Status", // Added Civil Status
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
        `http://localhost:8000/api/pwdInfo/pwd_info`
      );
      setRegisteredUsers(response.data); // Assuming you might want to use this later
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
          {/* Data has been removed */}
          <tr>
            <td colSpan={TABLE_HEAD.length} style={styles.noData}>
              No registered users available.
            </td>
          </tr>
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
