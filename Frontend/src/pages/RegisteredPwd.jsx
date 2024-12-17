import React, { useEffect, useState } from "react";
import { Card, Table, Pagination, Form } from "react-bootstrap";
import axios from "axios";
import moment from "moment";
import eye from "../images/eye.svg";
import searchIcon from "../images/search.svg";
import PwdPreview from "../components/modal/PwdPreview";
import { host } from "../apiRoutes";

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
  "Created At",
  "Action",
];

const RegisteredPwd = () => {
  const [registeredPwd, setRegisteredPwd] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [selectedPwd, setSelectedPwd] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [barangay, setBarangay] = useState("");
  const [disability_status, setDisability] = useState("");
  const [order, setOrder] = useState("asc");

  const handleShow = (infos) => {
    setSelectedPwd(infos);
    setShowPwd(true);
  };

  const handleClose = () => setShowPwd(false);

  useEffect(() => {
    fetchRegistered(currentPage, barangay, order, disability_status);
  }, [currentPage, barangay, order, disability_status]);

  const fetchRegistered = async (page, barangay, order, disability_status) => {
    try {
      // Dynamically build query parameters based on selected filters
      let url = `${host}/api/pwdInfo/pwd_info?page=${page}&limit=15&order=${order}`;

      if (barangay) {
        url += `&barangay=${barangay}`;
      }

      if (disability_status) {
        url += `&disability_status=${disability_status}`;
      }

      const response = await axios.get(url);

      // Set state with the fetched data
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
    "San-isidro",
  ];

  const disability = [
    "Physical",
    "Hearing",
    "Visual",
    "Mental",
    "Psychosocial",
    "Speech",
    "Learning",
    "Intellectual",
  ];

  return (
    <>
      <Card style={styles.cardContainer}>
        <Card.Body>
          <div style={styles.searchContainer}>
            <h1 style={styles.header}>Registered PWD</h1>
            <div className="d-flex flex-row gap-3">
              <div className="mb-3">
                <Form.Select
                  required
                  value={disability_status}
                  onChange={(e) => {
                    setDisability(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="form-select"
                >
                  <option value="">Sort by Disability</option>
                  {disability.map((disabilityOption) => (
                    <option key={disabilityOption} value={disabilityOption}>
                      {disabilityOption}
                    </option>
                  ))}
                </Form.Select>
              </div>

              <div className="mb-3">
                <Form.Select
                  required
                  value={barangay}
                  onChange={(e) => {
                    setBarangay(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="form-select"
                >
                  <option value="">Sort by Barangay</option>
                  {options.map((barangayOption) => (
                    <option key={barangayOption} value={barangayOption}>
                      {barangayOption}
                    </option>
                  ))}
                </Form.Select>
              </div>

              <div className="mb-3">
                <div className="d-flex align-items-center">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="form-control"
                  />
                </div>
              </div>
            </div>
          </div>

          <Table striped bordered hover responsive>
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="text-center"
                    style={styles.tableHead}
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredPwd.map((infos) => (
                <tr key={infos.userId}>
                  <td className="text-center">{infos.userId}</td>
                  <td>{infos.first_name}</td>
                  <td>{infos.middle_name}</td>
                  <td>{infos.last_name}</td>
                  <td className="text-center">{infos.contact_num}</td>
                  <td>{infos.email}</td>
                  <td className="text-center">{infos.age}</td>
                  <td className="text-center">{infos.gender}</td>
                  <td className="text-center">
                    {moment(infos.date_of_birth).format("MMM DD, YYYY")}
                  </td>
                  <td className="text-center">{infos.blood_type}</td>
                  <td>{infos.nationality}</td>
                  <td> {moment(infos.created_at).format("MMM DD, YYYY")}</td>
                  <td className="text-center">
                    <img
                      src={eye}
                      onClick={() => handleShow(infos)}
                      style={styles.eyeIcon}
                      alt="View details"
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
  cardContainer: {
    padding: "20px",
    backgroundColor: "#f8f9fa",
    borderRadius: "12px",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
  },
  searchContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "15px",
  },
  header: {
    fontSize: "26px",
    fontWeight: "bold",
    color: "#333",
    margin: 0,
  },
  selectContainer: {
    display: "flex",
    flexDirection: "column", // Stack elements vertically
    gap: "10px", // Add space between elements
    width: "100%",
  },
  select: {
    padding: "8px",
    borderRadius: "5px",
  },
  searchWrapper: {
    position: "relative",
    width: "200px",
  },
  searchBar: {
    padding: "10px",
    borderRadius: "20px",
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
  tableHead: {
    backgroundColor: "#ff4d4d", // Red background for the header
    color: "#fff", // White text color for good contrast
    fontWeight: "bold",
  },
  eyeIcon: {
    cursor: "pointer",
    width: "20px",
    height: "20px",
  },
};

export default RegisteredPwd;
