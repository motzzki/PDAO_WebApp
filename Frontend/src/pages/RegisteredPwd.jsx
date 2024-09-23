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
  "Action",
];

const RegisteredPwd = () => {
  const [registeredPwd, setRegisteredPwd] = useState([]);

  useEffect(() => {
    fetchRegistered();
  }, []);

  const fetchRegistered = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/pwdInfo/pwd_info`
      );
      setRegisteredPwd(response.data);
    } catch (error) {
      console.error("Error fetching PWD information:", error);
    }
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
          {registeredPwd?.map((infos) => (
            <tr
              key={infos.userId}
              style={styles.tableRow}
              onMouseEnter={onRowHover}
              onMouseLeave={onRowLeave}
            >
              <td>{infos.userId}</td>
              <td>{infos.first_name}</td>
              <td>{infos.middle_name}</td>
              <td>{infos.last_name}</td>
              <td>{infos.contact_num}</td>
              <td>{infos.email}</td>
              <td>{infos.age}</td>
              <td>{infos.gender}</td>
              <td>{moment(infos.date_of_birth).format("MMM DD, YYYY")}</td>
              <td>{infos.blood_type}</td>
              <td>{infos.nationality}</td>
              <td>{}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

const styles = {
  tableContainer: {
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '10px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.05)',
  },
  table: {
    borderCollapse: 'collapse',
    width: '100%',
    borderRadius: '10px',
    overflow: 'hidden',
  },
  tableHead: {
    backgroundColor: '#e0e0e0', // light gray background for table headers
    color: '#333', // dark text color for good contrast
    textAlign: 'center',
    fontWeight: 'bold',
    padding: '12px',
  },
  tableRow: {
    textAlign: 'center',
    padding: '10px',
    backgroundColor: '#ffffff', // white background for rows
    transition: 'background-color 0.3s',
  },
  tableRowHover: {
    backgroundColor: '#f1f1f1', // light grey hover effect
  },
};

const onRowHover = (e) => {
  e.currentTarget.style.backgroundColor = '#f1f1f1'; // light grey on hover
};
const onRowLeave = (e) => {
  e.currentTarget.style.backgroundColor = '#ffffff'; // reset to white
};

export default RegisteredPwd;


