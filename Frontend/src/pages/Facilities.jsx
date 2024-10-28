import React, { useState, useEffect } from "react";
import { Tabs, Tab, Container, Row, Col, Button, Form } from "react-bootstrap";
import CardFacilities from "../components/CardFacilities";
import axios from "axios";
import AddFacility from "../components/modal/AddFacility";

const Facilities = () => {
  const [addFacility, setAddFacility] = useState(false);
  const [facilities, setFacilities] = useState({
    proFriendly: [],
    antiFriendly: [],
  });

  const handleShow = () => setAddFacility(true);
  const handleClose = () => setAddFacility(false);

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/pwdInfo/get-facilities"
        );
        console.log("API Response Data:", response.data); // Check if picture URL is correct
        const facilitiesData = response.data;

        const proFriendly = facilitiesData.filter(
          (facility) => facility.flag.toString() === "1"
        );
        const antiFriendly = facilitiesData.filter(
          (facility) => facility.flag.toString() === "0"
        );

        setFacilities({ proFriendly, antiFriendly });
      } catch (error) {
        console.error(
          "Error fetching facilities:",
          error.response?.data || error.message
        );
      }
    };

    fetchFacilities();
  }, []);

  const renderCardList = (cards) => {
    if (cards.length === 0) {
      return <p>No facilities available.</p>; // Message when there are no facilities
    }
    return (
      <Row className="g-4">
        {cards.map((card, index) => (
          <Col key={index} md={4}>
            <CardFacilities
              cardTitle={card.facility_name} // Display facility name
              cardText={card.accessibility_features} // Display accessibility features
              cardImg={card.picture} // Use the picture URL from the backend
            />
          </Col>
        ))}
      </Row>
    );
  };

  return (
    <Container className="my-4">
      <div className="d-flex justify-content-end mb-3">
        <Form.Control
          type="text"
          placeholder="Search..."
          className="me-3 w-25"
        />
        <Button variant="primary" onClick={handleShow}>
          Add Facility
        </Button>
      </div>
      <Tabs defaultActiveKey="proFriendly" id="facilities-tab" className="mb-3">
        <Tab eventKey="proFriendly" title="Pro-Friendly">
          {renderCardList(facilities.proFriendly)}
        </Tab>
        <Tab eventKey="antiFriendly" title="Anti-Friendly">
          {renderCardList(facilities.antiFriendly)}
        </Tab>
      </Tabs>
      <AddFacility show={addFacility} handleClose={handleClose} />
    </Container>
  );
};

export default Facilities;
