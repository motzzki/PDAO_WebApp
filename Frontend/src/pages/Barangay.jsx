import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import searchIcon from "../images/search.svg"; // Make sure the path is correct

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
      const response = await axios.get(
        `http://localhost:8000/api/barangay/get_barangay`
      );
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
        <h1 style={styles.title}>Barangay</h1>
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
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '10px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.05)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between', // Space between title and search bar
    alignItems: 'center', // Center align items vertically
    marginBottom: '20px',
  },
  title: {
    textAlign: 'left',
    fontSize: '24px',
  },
  searchWrapper: {
    position: 'relative',
    width: '200px', // Adjust width as needed
  },
  searchBar: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '100%',
    paddingRight: '30px', // Add padding to avoid overlap with the icon
  },
  searchIcon: {
    position: 'absolute',
    right: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '20px',
    height: '20px',
    cursor: 'pointer',
  },
  table: {
    borderCollapse: 'collapse',
    width: '100%',
    borderRadius: '10px',
    overflow: 'hidden',
  },
  tableHead: {
    backgroundColor: '#e0e0e0',
    color: '#333',
    textAlign: 'center',
    fontWeight: 'bold',
    padding: '12px',
  },
  tableRow: {
    textAlign: 'center',
    padding: '10px',
    backgroundColor: '#ffffff',
    transition: 'background-color 0.3s',
  },
};

const onRowHover = (e) => {
  e.currentTarget.style.backgroundColor = '#f1f1f1'; // light grey on hover
};
const onRowLeave = (e) => {
  e.currentTarget.style.backgroundColor = '#ffffff'; // reset to white
};

export default Barangay;
