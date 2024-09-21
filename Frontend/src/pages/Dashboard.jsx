import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaWheelchair, FaUsers, FaHouseUser } from "react-icons/fa";
import { MdLiveHelp } from "react-icons/md";
import CardPreview from "../components/CardPreview.jsx";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
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
        "http://localhost:8000/api/barangay/get_total_registered"
      );
      return response.data.total_registered; // Access the total_registered from the response
    } catch (error) {
      console.error("Error fetching total registered users:", error);
      throw error; // Rethrow the error to handle it later if needed
    }
  };

  return (
    <Container className="mt-4">
      <Row className="g-4">
        <Col
          xs={12}
          sm={6}
          md={6}
          lg={6} // Set to 6 for two cards per row on large screens
          className="d-flex justify-content-center"
        >
          <Link to="/barangay" className="text-decoration-none">
            <CardPreview
              cardTitle="Barangay"
              cardBody="Total: 18"
              ImageIcon={FaUsers}
            />
          </Link>
        </Col>
        <Col
          xs={12}
          sm={6}
          md={6}
          lg={6} // Set to 6 for two cards per row on large screens
          className="d-flex justify-content-center"
        >
          <Link to="/registered_pwd" className="text-decoration-none">
            <CardPreview
              cardTitle="Registered PWD"
              cardBody={`Total: ${totalRegistered}`}
              ImageIcon={FaWheelchair}
            />
          </Link>
        </Col>
        <Col
          xs={12}
          sm={6}
          md={6}
          lg={6} // Set to 6 for two cards per row on large screens
          className="d-flex justify-content-center"
        >
          <CardPreview
            cardTitle="Facilities"
            cardBody="Total:"
            ImageIcon={FaHouseUser}
          />
        </Col>
        <Col
          xs={12}
          sm={6}
          md={6}
          lg={6} // Set to 6 for two cards per row on large screens
          className="d-flex justify-content-center"
        >
          <CardPreview
            cardTitle="Help"
            cardBody="Click here for help!"
            ImageIcon={MdLiveHelp}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
