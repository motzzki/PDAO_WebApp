import React, { useState, useEffect } from "react";
import axios from "axios";
import { host } from "../apiRoutes";
import Swal from "sweetalert2";
import { Table } from "react-bootstrap";
import searchIcon from "../images/search.svg";

const Arts = () => {
  const [arts, setArts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalClaimed, setTotalClaimed] = useState(0);
  const [totalUnclaimed, setTotalUnclaimed] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchArts();
  }, []);

  const fetchArts = async () => {
    try {
      const response = await axios.get(`${host}/api/user_management/arts`);
      const artsData = response.data.arts;

      setArts(artsData);
      setTotalClaimed(artsData.filter((b) => b.claim_tag === 1).length);
      setTotalUnclaimed(artsData.filter((b) => b.claim_tag === 0).length);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching birthdays:", error);
      setError("Failed to load birthdays");
      setLoading(false);
    }
  };

  const handleClaim = (userId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to register this user.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, register it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.post(
            `${host}/api/user_management/register-arts`,
            {
              userId,
              claimType: "arts",
            }
          );

          Swal.fire("Registered!", response.data.message, "success");
          setArts((prevState) =>
            prevState.map((user) =>
              user.userId === userId ? { ...user, claim_tag: 1 } : user
            )
          );
          setTotalClaimed((prevTotal) => prevTotal + 1);
          fetchArts();
        } catch (error) {
          Swal.fire(
            "Error",
            error.response?.data?.message || "Failed to claim the gift",
            "error"
          );
        }
      }
    });
  };
  const filteredArts = arts.filter((user) =>
    user.first_name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div style={styles.tableContainer}>
      <div style={styles.header}>
        <h1 style={styles.title}>Sign Language Training</h1>
        <div className="d-flex flex-row align-items-center">
          <div style={styles.searchWrapper}>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-control"
              style={styles.searchBar}
            />
            <img
              src={searchIcon}
              alt="search"
              className="position-absolute"
              style={styles.searchIcon}
            />
          </div>
        </div>
      </div>
      <Table striped bordered hover responsive style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableHead}>User ID</th>
            <th style={styles.tableHead}>Name</th>
            <th style={styles.tableHead}>Gender</th>
            <th style={styles.tableHead}>Disability Type</th>
            <th style={styles.tableHead}>Action</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="5" className="text-center">
                Loading...
              </td>
            </tr>
          ) : error ? (
            <tr>
              <td colSpan="5" className="text-center text-danger">
                {error}
              </td>
            </tr>
          ) : (
            filteredArts.map((user) => (
              <tr
                key={user.userId}
                style={styles.tableRow}
                onMouseEnter={onRowHover}
                onMouseLeave={onRowLeave}
              >
                <td>{user.userId}</td>
                <td>{`${user.first_name} ${user.middle_name} ${user.last_name}`}</td>
                <td>{user.gender}</td>
                <td>{user.disability_status.toUpperCase()}</td>
                <td className="text-center">
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleClaim(user.userId)}
                    disabled={user.claim_tag === 1}
                    style={{
                      cursor: user.claim_tag === 1 ? "not-allowed" : "pointer",
                    }}
                  >
                    {user.claim_tag === 1 ? "Registered" : "Register"}
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      <div style={styles.legend}>
        <span className="badge bg-success" style={styles.badge}>
          Registered: {totalClaimed}
        </span>
        <span className="badge bg-danger" style={styles.badge}>
          Not Registered: {totalUnclaimed}
        </span>
      </div>
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
    width: "25rem",
    height: "2.5rem",
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
    backgroundColor: "#ff4d4d",
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
  legend: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginTop: "20px",
  },
  badge: {
    fontSize: "14px",
    padding: "8px 12px",
    borderRadius: "20px",
  },
};

const onRowHover = (e) => {
  e.currentTarget.style.backgroundColor = "#e8f0fe";
};
const onRowLeave = (e) => {
  e.currentTarget.style.backgroundColor = "#ffffff";
};

export default Arts;
