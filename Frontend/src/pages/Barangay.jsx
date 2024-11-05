import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import searchIcon from "../images/search.svg"; // Make sure the path is correct
import { host } from "../apiRoutes";
const TABLE_HEAD = ["Barangay", "Registered PWD"];

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const Barangay = () => {
  const [barangayInfo, setBarangayInfo] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchBarangayInfo();
  }, []);

  const fetchBarangayInfo = async () => {
    try {
      const response = await axios.get(`${host}/api/barangay/get_barangay`);
      setBarangayInfo(response.data);
    } catch (error) {
      console.error("Error fetching barangay information:", error);
    }
  };

  const filteredBarangayInfo = barangayInfo.filter((infos) =>
    capitalizeFirstLetter(infos.barangay)
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div style={styles.tableContainer}>
      <div style={styles.header}>
        <h1 style={styles.title}>Barangay Information</h1>
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
          {filteredBarangayInfo?.map((infos) => (
            <tr
              key={infos.barangay}
              style={styles.tableRow}
              onMouseEnter={onRowHover}
              onMouseLeave={onRowLeave}
            >
              <td>{capitalizeFirstLetter(infos.barangay)}</td>
              <td>{infos.Registered}</td>
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
    borderRadius: "12px",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
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
  table: {
    borderCollapse: "separate",
    borderSpacing: "0 8px",
    width: "100%",
    borderRadius: "10px",
    overflow: "hidden",
  },
  tableHead: {
    backgroundColor: "#ff4d4d", // Red background for the header
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
    borderBottom: "1px solid #eee",
  },
  tableRowOdd: {
    backgroundColor: "#f9f9f9",
  },
};

const onRowHover = (e) => {
  e.currentTarget.style.backgroundColor = "#e8f0fe"; // soft blue on hover
};
const onRowLeave = (e) => {
  e.currentTarget.style.backgroundColor = "#ffffff"; // reset to white
};

export default Barangay;
