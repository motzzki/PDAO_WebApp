import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaWheelchair, FaUsers, FaHouseUser } from "react-icons/fa";
import { MdLiveHelp } from "react-icons/md";
import CardPreview from "../components/CardPreview.jsx";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  return (
    <Container className="mt-4">
      <Row className="g-4">
        <Col
          xs={12}
          sm={6}
          md={6}
          lg={3}
          className="d-flex justify-content-center"
        >
          <CardPreview
            cardTitle="Barangay"
            cardBody="Total:"
            ImageIcon={FaUsers}
          />
        </Col>
        <Col
          xs={12}
          sm={6}
          md={6}
          lg={3}
          className="d-flex justify-content-center"
        >
          <Link to="/registered_pwd">
            <CardPreview
              cardTitle="Registered PWD"
              cardBody="Total:"
              ImageIcon={FaWheelchair}
            />
          </Link>
        </Col>
        <Col
          xs={12}
          sm={6}
          md={12}
          lg={3}
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
          md={12}
          lg={3}
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
