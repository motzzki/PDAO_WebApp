import React, { useEffect, useState } from "react";
import { Card, Table, Pagination, FloatingLabel, Form } from "react-bootstrap";
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
        `http://localhost:8000/api/pwdInfo/pwd_info?page=${page}&limit=7&barangay=${barangay}&order=${order}`
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
    <>
      <Card>
        <Card.Body>
          <div style={styles.searchContainer}>
            <h1 className="fs-2 open-sans-bold" style={styles.header}>
              Registered PWD
            </h1>
            <div
              style={styles.selectContainer}
              className="d-flex justify-content-between align-items-center mb-3"
            >
              <Form.Select
                required
                className="form-control-custom w-auto"
                value={barangay}
                onChange={(e) => {
                  setBarangay(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="">Sort by Barangay</option>
                {options.map((barangayOption) => (
                  <option key={barangayOption} value={barangayOption}>
                    {barangayOption}
                  </option>
                ))}
              </Form.Select>

              <div
                style={styles.searchWrapper}
                className="position-relative w-100"
              >
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={styles.searchBar}
                />
                <img
                  src={searchIcon}
                  alt="search"
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "20px",
                    height: "20px",
                    cursor: "pointer",
                  }}
                />
              </div>
            </div>
          </div>

          <Table striped bordered hover responsive>
            <thead className="fs-5 open-sans-bold">
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th key={head} className="text-center">
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="fs-5 open-sans-regular">
              {filteredPwd.map((infos) => (
                <tr key={infos.userId} className="hover-table-row">
                  <td className="text-center">{infos.userId}</td>
                  <td className="text-left">{infos.first_name}</td>
                  <td className="text-left">{infos.middle_name}</td>
                  <td className="text-left">{infos.last_name}</td>
                  <td className="text-center">{infos.contact_num}</td>
                  <td className="text-left">{infos.email}</td>
                  <td className="text-center">{infos.age}</td>
                  <td className="text-center">{infos.gender}</td>
                  <td className="text-center">
                    {moment(infos.date_of_birth).format("MMM DD, YYYY")}
                  </td>
                  <td className="text-center">{infos.blood_type}</td>
                  <td className="text-left">{infos.nationality}</td>
                  <td className="text-center">
                    <img
                      src={eye}
                      onClick={() => handleShow(infos)}
                      onMouseEnter={() => setHoveredUserId(infos.userId)}
                      onMouseLeave={() => setHoveredUserId(null)}
                      style={{
                        cursor: "pointer",
                        width: "20px",
                        height: "20px",
                      }}
                      alt={`View details for ${infos.first_name} ${infos.last_name}`}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Pagination className="d-flex justify-content-center mt-3">
            {renderPagination()}
          </Pagination>
        </Card.Body>
      </Card>

      {selectedPwd && (
        <PwdPreview
          show={showPwd}
          handleClose={handleClose}
          userId={selectedPwd.userId}
        />
      )}
    </>
  );
};

const styles = {
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
};

export default RegisteredPwd;
