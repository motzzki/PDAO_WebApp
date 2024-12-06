import React, { useEffect, useState } from "react";
import axios from "axios";
import { host } from "../apiRoutes";
import { Card, Col, Row } from "react-bootstrap";
import { motion } from "framer-motion";
import searchIcon from "../images/search.svg"; // Ensure the path is correct

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

      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {filteredBarangayInfo?.map((infos) => (
          <Col key={infos.barangay}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card style={styles.card}>
                <Card.Body>
                  <Card.Title style={styles.cardTitle}>
                    {capitalizeFirstLetter(infos.barangay)}
                  </Card.Title>
                  <Card.Text style={styles.cardText}>
                    Registered PWD: {infos.Registered}
                  </Card.Text>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>
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
  card: {
    border: "1px solid #ddd",
    borderRadius: "10px",
    backgroundColor: "#fff",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    textAlign: "center",
  },
  cardTitle: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#333",
  },
  cardText: {
    fontSize: "16px",
    color: "#555",
  },
};

export default Barangay;
