import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaWheelchair, FaUsers, FaHouseUser } from "react-icons/fa";
import { MdLiveHelp } from "react-icons/md";
import CardPreview from "../components/CardPreview.jsx";
import { Link } from "react-router-dom";
import axios from "axios";
import { host } from "../apiRoutes.js";

const StaffDashboard = () => {
  const [totalRegistered, setTotalRegistered] = useState("");

  useEffect(() => {
    const getTotal = async () => {
      const total = await fetchTotalRegistered();
      setTotalRegistered(total);
    };
    getTotal();
  }, []);

  const fetchTotalRegistered = async () => {
    try {
      const response = await axios.get(
        `${host}/api/barangay/get_total_registered`
      );
      return response.data.total_registered;
    } catch (error) {
      console.error("Error fetching total registered users:", error);
      return "0"; // Default to zero if there's an error
    }
  };

  const cardStyle = {
    width: "100%",
    maxWidth: "300px",
    height: "200px",
    padding: "15px",
    backgroundColor: "#f8f9fa",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    margin: "10px", // Space between cards
  };

  return (
    <Container className="mt-4">
      <Row className="g-4 justify-content-center">
        <Col xs={12} sm={6} md={6} lg={6}>
          <Link to="/staff/barangay" className="text-decoration-none">
            <CardPreview
              cardTitle="Barangay"
              cardBody="Total: 18"
              ImageIcon={() => <FaUsers className="icon-hover" />} // Apply the hover class
              style={cardStyle}
            />
          </Link>
        </Col>
        <Col xs={12} sm={6} md={6} lg={6}>
          <Link to="/staff/registered_pwd" className="text-decoration-none">
            <CardPreview
              cardTitle="Registered PWD"
              cardBody={`Total: ${totalRegistered}`}
              ImageIcon={() => <FaWheelchair className="icon-hover" />}
              style={cardStyle}
            />
          </Link>
        </Col>
        <Col xs={12} sm={6} md={6} lg={6}>
          <Link to="/staff/facilities" className="text-decoration-none">
            <CardPreview
              cardTitle="Facilities"
              cardBody="Anti/Pro"
              ImageIcon={() => <FaHouseUser className="icon-hover" />} // Apply the hover class
              style={cardStyle}
            />
          </Link>
        </Col>
        <Col xs={12} sm={6} md={6} lg={6}>
          <Link to="/staff/addhelp" className="text-decoration-none">
            <CardPreview
              cardTitle="Help"
              cardBody="Click here for help!"
              ImageIcon={() => <MdLiveHelp className="icon-hover" />} // Apply the hover class
              style={cardStyle}
            />
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default StaffDashboard;
