import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import moment from "moment";
import eye from "../images/eye.svg";
import PwdPreview from "../components/modal/PwdPreview";

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
  const [showPwd, setShowPwd] = useState(false);
  const [selectedPwd, setSelectedPwd] = useState(null); // State to hold selected PWD info

  const handleShow = (infos) => {
    setSelectedPwd(infos); // Set selected PWD info (contains userId)
    setShowPwd(true);
  };

  const handleClose = () => setShowPwd(false);

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
            <tr key={infos.userId} style={styles.tableRow}>
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
              <td>
                <img
                  src={eye}
                  onClick={() => handleShow(infos)} // Pass the current user info
                  style={{ cursor: "pointer" }}
                  alt="view"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {selectedPwd && (
        <PwdPreview
          show={showPwd}
          handleClose={handleClose}
          userId={selectedPwd.userId} // Pass userId here
        />
      )}
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
    backgroundColor: "#e0e0e0",
    color: "#333",
    textAlign: "center",
    fontWeight: "bold",
    padding: "12px",
  },
  tableRow: {
    textAlign: "center",
    padding: "10px",
    backgroundColor: "#ffffff",
    transition: "background-color 0.3s",
  },
};

export default RegisteredPwd;
