import React, { useEffect, useState } from "react";
import { Table, Pagination, FloatingLabel, Form } from "react-bootstrap";
import axios from "axios";
import moment from "moment";
import eye from "../images/eye.svg";
import searchIcon from "../images/search.svg";
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
  const [searchQuery, setSearchQuery] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [selectedPwd, setSelectedPwd] = useState(null);
  const [hoveredUserId, setHoveredUserId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // For pagination
  const [totalPages, setTotalPages] = useState(1); // Total pages from server
  const [barangay, setBarangay] = useState(""); // State to hold selected barangay
  const [order, setOrder] = useState("asc"); // State to hold sorting order

  const handleShow = (infos) => {
    setSelectedPwd(infos);
    setShowPwd(true);
  };

  const handleClose = () => setShowPwd(false);

  useEffect(() => {
    fetchRegistered(currentPage, barangay, order);
  }, [currentPage, barangay, order]);

  const fetchRegistered = async (page, barangay, order) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/pwdInfo/pwd_info?page=${page}&limit=15&barangay=${barangay}&order=${order}`
      );
      setRegisteredPwd(response.data.data);
      setTotalPages(response.data.pagination.totalPages);
    } catch (error) {
      console.error("Error fetching PWD information:", error);
    }
  };

  const filteredPwd = registeredPwd.filter((infos) =>
    `${infos.first_name} ${infos.middle_name} ${infos.last_name}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPagination = () => {
    let items = [];
    for (let page = 1; page <= totalPages; page++) {
      items.push(
        <Pagination.Item
          key={page}
          active={page === currentPage}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </Pagination.Item>
      );
    }
    return items;
  };

  const options = [
    "Banaybanay",
    "Banlic",
    "Baclaran",
    "Bigaa",
    "Butong",
    "Casile",
    "Diezmo",
    "Gulod",
    "Mamatid",
    "Marinig",
    "Niugan",
    "Pittland",
    "Poblacion-Dos",
    "Poblacion-Uno",
    "Poblacion-tres",
    "Pulo",
    "Sala",
  ];

  return (
    <div style={styles.tableContainer}>
      <div style={styles.searchContainer}>
        <h1 className="fs-2 open-sans-bold" style={styles.header}>
          Registered PWD
        </h1>
        <div style={styles.selectContainer}>
          <Form.Select
            required
            className="form-control-custom"
            value={barangay}
            onChange={(e) => {
              setBarangay(e.target.value);
              setCurrentPage(1); // Reset to page 1 when filtering
            }}
          >
            <option value="">Sort by Barangay</option>
            {options.map((barangayOption) => (
              <option key={barangayOption} value={barangayOption}>
                {barangayOption}
              </option>
            ))}
          </Form.Select>

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
      </div>
      <Table striped bordered hover responsive style={styles.table}>
        <thead className="fs-5 open-sans-bold">
          <tr>
            {TABLE_HEAD.map((head) => (
              <th key={head} style={styles.tableHead}>
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="fs-5 open-sans-regular">
          {filteredPwd.map((infos) => (
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
              <td style={{ position: "relative" }}>
                <img
                  src={eye}
                  onClick={() => handleShow(infos)}
                  onMouseEnter={() => setHoveredUserId(infos.userId)}
                  onMouseLeave={() => setHoveredUserId(null)}
                  style={{ cursor: "pointer" }}
                  alt="view"
                />
                {hoveredUserId === infos.userId && (
                  <div style={styles.tooltip}>See Details</div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination className="d-flex justify-content-center mt-3">
        {renderPagination()}
      </Pagination>

      {selectedPwd && (
        <PwdPreview
          show={showPwd}
          handleClose={handleClose}
          userId={selectedPwd.userId}
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
  searchContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "15px",
  },
  selectContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px", // Add some space between the select and search input
  },
  header: {
    margin: 0,
    fontSize: "20px",
  },
  searchWrapper: {
    position: "relative",
    width: "200px",
  },
  searchBar: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    width: "100%",
    paddingRight: "30px",
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
  tooltip: {
    position: "absolute",
    bottom: "25px",
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    color: "white",
    padding: "5px 10px",
    borderRadius: "5px",
    fontSize: "12px",
    zIndex: 10,
  },
};

export default RegisteredPwd;
