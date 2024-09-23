import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";

const TABLE_HEAD = ["Pro-Friendly", "Anti-Friendly"];

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const Facilities = () => {
  const [facilityInfo, setFacilityInfo] = useState([]);

  useEffect(() => {
    fetchFacilityInfo();
  }, []);

  const fetchFacilityInfo = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/facilities/get_facilities` // Updated endpoint for facilities
      );
      setFacilityInfo(response.data);
    } catch (error) {
      console.error("Error fetching facility information:", error);
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
          {facilityInfo?.map((info) => (
            <tr
              key={info.facilityName} // Assuming the facility has a unique name
              style={styles.tableRow}
              onMouseEnter={onRowHover}
              onMouseLeave={onRowLeave}
            >
              <td>{capitalizeFirstLetter(info.facilityName)}</td>
              <td>{info.registeredPWD}</td>{" "}
              {/* Adjusted property names if needed */}
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
  tableRow: {
    textAlign: "center",
    padding: "10px",
    backgroundColor: "#ffffff", // white background for rows
    transition: "background-color 0.3s",
  },
};

const onRowHover = (e) => {
  e.currentTarget.style.backgroundColor = "#f1f1f1"; // light grey on hover
};

const onRowLeave = (e) => {
  e.currentTarget.style.backgroundColor = "#ffffff"; // reset to white
};

export default Facilities;
