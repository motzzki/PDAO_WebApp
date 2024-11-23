import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import moment from "moment";
import searchIcon from "../images/search.svg"; // Adjust path as necessary
import { host } from "../apiRoutes";
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
];

const RegisteredUsers = () => {
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchRegistered();
  }, []);

  const fetchRegistered = async () => {
    try {
      const response = await axios.get(
        `${host}/api/user_management/get-employee`
      );
      setRegisteredUsers(response.data);
    } catch (error) {
      console.error("Error fetching user information:", error);
    }
  };

  const filteredUsers = registeredUsers.filter((employee) =>
    `${employee.firstname} ${employee.middlename} ${employee.lastname}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const onRowHover = (e) => {
    e.currentTarget.style.backgroundColor = "#e8f0fe"; // Soft blue on hover
  };

  const onRowLeave = (e) => {
    e.currentTarget.style.backgroundColor = "#ffffff"; // Reset to white
  };

  return (
    <div style={styles.tableContainer}>
      <div style={styles.header}>
        <h1 style={styles.title}>Registered Users</h1>
        <div style={styles.searchWrapper}>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={styles.searchBar}
          />
          <img src={searchIcon} alt="search" style={styles.searchIcon} />
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
          {filteredUsers.length > 0 ? (
            filteredUsers.map((employee) => (
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
                <td>{moment(employee.birthdate).format("MMM DD, YYYY")}</td>
                <td>{employee.username}</td>
                <td>{employee.group_name}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={TABLE_HEAD.length} style={styles.noData}>
                No data available
              </td>
            </tr>
          )}
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
    backgroundColor: "#ff4d4d", // Red background for headers
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
    color: "#888", // Grey color for no data message
  },
};

export default RegisteredUsers;
