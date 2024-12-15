import React, { useState, useEffect } from "react";
import { Row, Col, Container, Tabs, Tab, Form, Button } from "react-bootstrap";
import UserCardFacilities from "../components/UserCardFacilities";
import axios from "axios";
import { host } from "../apiRoutes";

const UserFacilities = () => {
  const [facilities, setFacilities] = useState({
    proFriendly: [],
    antiFriendly: [],
  });
  const [searchQuery, setSearchQuery] = useState("");

  const fetchFacilities = async (query = "") => {
    try {
      const response = await axios.get(`${host}/api/pwdInfo/get-facilities`, {
        params: { search: query }, // Pass search query as a parameter
      });
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

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query); // Update state
    fetchFacilities(query); // Fetch filtered facilities
  };

  useEffect(() => {
    fetchFacilities();
  }, []);

  return (
    <Container>
      <div className="d-flex justify-content-between mb-5 pt-5">
        <h1 className="open-sans-bold">Facilities</h1>
        <div className="d-flex justify-content-end w-100">
          <Form.Control
            type="text"
            placeholder="Search..."
            className="me-3 w-25"
            value={searchQuery}
            onChange={handleSearch}
          />
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
              : facilities.proFriendly.map((facility, index) => (
                  <Col key={index} md={4}>
                    <UserCardFacilities facility={facility} />
                  </Col>
                ))}
          </Row>
        </Tab>
        {/* <Tab
          eventKey="antiFriendly"
          title="Anti-Friendly"
          className="custom-tab"
        >
          <Row className="g-4">
            {facilities.antiFriendly.length === 0
              ? "No Anti-Friendly Facilities Available."
              : facilities.antiFriendly.map((facility, index) => (
                  <Col key={index} md={4}>
                    <UserCardFacilities facility={facility} />
                  </Col>
                ))}
          </Row>
        </Tab> */}
      </Tabs>
    </Container>
  );
};

export default UserFacilities;
