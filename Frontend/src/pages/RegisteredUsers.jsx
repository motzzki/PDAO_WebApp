import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import moment from "moment";
import searchIcon from "../images/search.svg"; // Adjust path as necessary

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
  const [searchQuery, setSearchQuery] = useState("");

 

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
      console.error("Error fetching user information:", error);
    }
  };

  const filteredUsers = registeredUsers.filter((employee) =>
    `${employee.firstname} ${employee.middlename} ${employee.lastname}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const onRowHover = (e) => {
    e.currentTarget.style.backgroundColor = "#f1f1f1"; // light grey on hover
  };

  const onRowLeave = (e) => {
    e.currentTarget.style.backgroundColor = "#ffffff"; // reset to white
  };

  return (
    <div style={styles.tableContainer}>
      <div style={styles.searchContainer}>
        <h1 style={styles.header}>Registered Employee</h1>
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
  searchContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between", // Keep space between header and search
    marginBottom: "15px",
  },
  searchWrapper: {
    position: "relative",
    width: "200px", // Adjust width as needed
  },
  searchBar: {
    padding: "10px",
    paddingRight: "30px", // Space for the icon
    borderRadius: "5px",
    border: "1px solid #ccc",
    width: "100%",
  },
  searchIcon: {
    position: "absolute",
    right: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    width: "20px",
    height: "20px",
    cursor: "pointer",
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
  header: {
    margin: 0,
    fontSize: "20px", // Adjust font size as needed
    flexGrow: 1, // Allow header to take available space
  },
};

export default RegisteredUsers;
