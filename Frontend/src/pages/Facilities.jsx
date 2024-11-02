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

  const saveFacility = () => {
    handleClose();
    fetchFacilities();
  };

  const fetchFacilities = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/pwdInfo/get-facilities"
      );
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

  useEffect(() => {
    fetchFacilities();
  }, []);

  return (
    <Container>
      <div className="d-flex justify-content-between mb-3 pt-5">
        <h1 className="open-sans-bold">Facilities</h1>
        <div className="d-flex justify-content-end w-100">
          <Form.Control
            type="text"
            placeholder="Search..."
            className="me-3 w-25"
          />
          <Button variant="danger" onClick={handleShow}>
            Add Facility
          </Button>
        </div>
      </div>
      <Tabs
        defaultActiveKey="proFriendly"
        id="facilities-tab"
        className="custom-tabs mb-4"
      >
        <Tab eventKey="proFriendly" title="Pro-Friendly" className="custom-tab">
          <Row className="g-4">
            {facilities.proFriendly.length === 0
              ? "No Pro-Friendly Facilities Available."
              : facilities.proFriendly.map((facility) => (
                  <Col key={facility.facility_id} md={4}>
                    <CardFacilities
                      facility={facility}
                      onSave={fetchFacilities}
                    />
                  </Col>
                ))}
          </Row>
        </Tab>
        <Tab
          eventKey="antiFriendly"
          title="Anti-Friendly"
          className="custom-tab"
        >
          <Row className="g-4">
            {facilities.antiFriendly.length === 0
              ? "No Anti-Friendly Facilities Available."
              : facilities.antiFriendly.map((facility) => (
                  <Col key={facility.facility_id} md={4}>
                    <CardFacilities
                      facility={facility}
                      onSave={fetchFacilities}
                    />
                  </Col>
                ))}
          </Row>
        </Tab>
      </Tabs>

      <AddFacility
        show={addFacility}
        handleClose={handleClose}
        onSave={saveFacility}
      />
    </Container>
  );
};

export default Facilities;
