import React, { useEffect, useState } from "react";
import {
  Container,
  Form,
  Spinner,
  Alert,
  Table,
  Tabs,
  Tab,
} from "react-bootstrap";
import axios from "axios";
import { host } from "../apiRoutes";
import Swal from "sweetalert2";
import searchIcon from "../images/search.svg"; // Ensure the path is correct

const UserAccounts = () => {
  const [users, setUsers] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${host}/api/user_management/users-employees`);
        setUsers(response.data.users);
        setEmployees(response.data.employees);
      } catch (err) {
        setError("Failed to fetch data");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getStatus = (flag) => {
    return flag === 1
      ? { status: "Active", colorClass: "text-success" }
      : { status: "Inactive", colorClass: "text-danger" };
  };

  const handleToggleStatus = async (id, currentFlag) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Do you want to ${currentFlag === 1 ? "disable" : "enable"} this account?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: currentFlag === 1 ? "Disable" : "Enable",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        const newFlag = currentFlag === 1 ? 0 : 1;
        await axios.post(`${host}/api/user_management/toggleStatus`, { id, flag: newFlag });

        setEmployees((prevEmployees) =>
          prevEmployees.map((employee) =>
            employee.employeeId === id ? { ...employee, flag: newFlag } : employee
          )
        );
        setUsers((prevUsers) =>
          prevUsers.map((user) => (user.userId === id ? { ...user, flagUser: newFlag } : user))
        );

        Swal.fire("Updated!", `The account has been ${currentFlag === 1 ? "disabled" : "enabled"}.`, "success");
      } catch (err) {
        setError("Failed to update status");
        Swal.fire("Error!", "Failed to update the status. Please try again.", "error");
      }
    }
  };

  const filteredEmployees = employees.filter((emp) =>
    `${emp.firstname} ${emp.lastname}`.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredUsers = users.filter((user) =>
    `${user.first_name} ${user.last_name}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container>
      <div style={styles.header}>
        <h1 style={styles.title}>User Accounts</h1>
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

      {loading ? (
        <div className="d-flex justify-content-center align-items-center">
          <Spinner animation="border" role="status" />
          <span className="ms-2">Loading...</span>
        </div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <Tabs defaultActiveKey="Staffs" id="facilities-tab" className="custom-tabs mb-4">
          <Tab eventKey="Staffs" title="Staff Accounts" className="custom-tab">
            <div style={styles.tableContainer}>
              <Table striped bordered hover responsive style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.tableHead}>First Name</th>
                    <th style={styles.tableHead}>Last Name</th>
                    <th style={styles.tableHead}>Username</th>
                    <th style={styles.tableHead}>Contact</th>
                    <th style={styles.tableHead}>Email</th>
                    <th style={styles.tableHead}>Status</th>
                    <th style={styles.tableHead}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEmployees.map((employee) => {
                    const { status, colorClass } = getStatus(employee.flag);
                    return (
                      <tr key={employee.employeeId} style={styles.tableRow} onMouseEnter={onRowHover} onMouseLeave={onRowLeave}>
                        <td>{employee.firstname}</td>
                        <td>{employee.lastname}</td>
                        <td>{employee.username}</td>
                        <td>{employee.contactnum}</td>
                        <td>{employee.email}</td>
                        <td className={colorClass}>{status}</td>
                        <td className="text-center">
                          <button
                            className="btn btn-danger" // Red button
                            onClick={() => handleToggleStatus(employee.employeeId, employee.flag)}
                          >
                            {employee.flag === 1 ? "Disable" : "Enable"}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          </Tab>
          <Tab eventKey="pwdAccounts" title="PWD Accounts" className="custom-tab">
            <div style={styles.tableContainer}>
              <Table striped bordered hover responsive style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.tableHead}>First Name</th>
                    <th style={styles.tableHead}>Last Name</th>
                    <th style={styles.tableHead}>Account ID</th>
                    <th style={styles.tableHead}>Contact</th>
                    <th style={styles.tableHead}>Email</th>
                    <th style={styles.tableHead}>Status</th>
                    <th style={styles.tableHead}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => {
                    const { status, colorClass } = getStatus(user.flagUser);
                    return (
                      <tr key={user.userId} style={styles.tableRow} onMouseEnter={onRowHover} onMouseLeave={onRowLeave}>
                        <td>{user.first_name}</td>
                        <td>{user.last_name}</td>
                        <td>{user.accountId}</td>
                        <td>{user.contact_num}</td>
                        <td>{user.email}</td>
                        <td className={colorClass}>{status}</td>
                        <td className="text-center">
                          <button
                            className="btn btn-danger" // Red button
                            onClick={() => handleToggleStatus(user.userId, user.flagUser)}
                          >
                            {user.flagUser === 1 ? "Disable" : "Enable"}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          </Tab>
        </Tabs>
      )}
    </Container>
  );
};

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    paddingTop: "20px",
  },
  title: {
    fontSize: "26px",
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
  tableContainer: {
    padding: "20px",
    backgroundColor: "#f8f9fa",
    borderRadius: "12px",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
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
    borderBottom: "1px solid #ddd",
  },
};

function onRowHover(e) {
  e.currentTarget.style.backgroundColor = "#f1f1f1";
}

function onRowLeave(e) {
  e.currentTarget.style.backgroundColor = "#ffffff";
}

export default UserAccounts;

