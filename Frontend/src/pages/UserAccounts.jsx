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
import { FaArchive } from "react-icons/fa";
import axios from "axios"; // Ensure Axios is imported
import { host } from "../apiRoutes";
import Swal from "sweetalert2"; // Import SweetAlert2

const UserAccounts = () => {
  // State for storing users and employees data
  const [users, setUsers] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from the backend API
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${host}/api/user_management/users-employees`
        );
        setUsers(response.data.users); // Set users data
        setEmployees(response.data.employees); // Set employees data
      } catch (err) {
        setError("Failed to fetch data");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  // Render loading state
  if (loading) {
    return (
      <Container>
        <div className="d-flex justify-content-center align-items-center">
          <Spinner animation="border" role="status" />
          <span className="ms-2">Loading...</span>
        </div>
      </Container>
    );
  }

  // Render error state
  if (error) {
    return (
      <Container>
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  // Function to return status based on flag value
  const getStatus = (flag) => {
    if (flag === 1) {
      return { status: "Active", colorClass: "text-success" }; // Green for Active
    } else {
      return { status: "Inactive", colorClass: "text-danger" }; // Red for Inactive
    }
  };

  // Function to toggle status with SweetAlert2 confirmation
  const handleToggleStatus = async (id, currentFlag) => {
    // Show confirmation dialog
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Do you want to ${
        currentFlag === 1 ? "disable" : "enable"
      } this account?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: currentFlag === 1 ? "Disable" : "Enable",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        const newFlag = currentFlag === 1 ? 0 : 1; // Toggle between 1 and 0

        // Call the backend API to update the status
        await axios.post(`${host}/api/user_management/toggleStatus`, {
          id,
          flag: currentFlag,
        });

        // Update the state to reflect the new status in the UI
        if (employees.some((emp) => emp.employeeId === id)) {
          setEmployees((prevEmployees) =>
            prevEmployees.map((employee) =>
              employee.employeeId === id
                ? { ...employee, flag: newFlag }
                : employee
            )
          );
        } else if (users.some((user) => user.userId === id)) {
          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user.userId === id ? { ...user, flagUser: newFlag } : user
            )
          );
        }

        Swal.fire(
          "Updated!",
          `The account has been ${currentFlag === 1 ? "disabled" : "enabled"}.`,
          "success"
        );
      } catch (err) {
        setError("Failed to update status");
        console.error("Error updating status:", err);
        Swal.fire(
          "Error!",
          "Failed to update the status. Please try again.",
          "error"
        );
      }
    }
  };

  return (
    <Container>
      <div className="d-flex justify-content-between mb-3 pt-5">
        <h1 className="open-sans-bold">User Accounts</h1>
        <div className="d-flex justify-content-end w-75">
          <Form.Control
            type="text"
            placeholder="Search..."
            className="me-3 w-25"
          />
        </div>
      </div>

      <Tabs
        defaultActiveKey="Staffs"
        id="facilities-tab"
        className="custom-tabs mb-4"
      >
        <Tab eventKey="Staffs" title="Staff Accounts" className="custom-tab">
          <div style={{ overflowX: "auto", width: "100%" }}>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Username</th>
                  <th>Contact</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => {
                  const { status, colorClass } = getStatus(employee.flag);
                  return (
                    <tr key={employee.employeeId}>
                      <td>{employee.firstname}</td>
                      <td>{employee.lastname}</td>
                      <td>{employee.username}</td>
                      <td>{employee.contactnum}</td>
                      <td>{employee.email}</td>
                      <td className={colorClass}>{status}</td>
                      <td className="text-center">
                        <button
                          className="btn btn-secondary"
                          onClick={() =>
                            handleToggleStatus(
                              employee.employeeId,
                              employee.flag
                            )
                          }
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
          <div style={{ overflowX: "auto", width: "100%" }}>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Account ID</th>
                  <th>Contact</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => {
                  const { status, colorClass } = getStatus(user.flagUser);
                  return (
                    <tr key={user.userId}>
                      <td>{user.first_name}</td>
                      <td>{user.last_name}</td>
                      <td>{user.accountId}</td>
                      <td>{user.contact_num}</td>
                      <td>{user.email}</td>
                      <td className={colorClass}>{status}</td>
                      <td className="text-center">
                        <button
                          className="btn btn-secondary"
                          onClick={() =>
                            handleToggleStatus(user.userId, user.flagUser)
                          }
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
    </Container>
  );
};

export default UserAccounts;
