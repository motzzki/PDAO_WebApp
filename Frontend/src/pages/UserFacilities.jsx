import React, { useState, useEffect } from "react";
import { Row, Col, Container, Tabs, Tab, Form, Button } from "react-bootstrap";
import UserCardFacilities from "../components/UserCardFacilities";
import axios from "axios";

const UserFacilities = () => {
  const [facilities, setFacilities] = useState({
    proFriendly: [],
    antiFriendly: [],
  });

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
  // const renderCardList = (cards) => {
  //   if (cards.length === 0) {
  //     return <p>No facilities available.</p>; // Message when there are no facilities
  //   }
  //   return (
  //     <Row className="g-4">
  //       {cards.map((card, index) => (
  //         <Col key={index} md={4}>
  //           <CardFacilities
  //             // cardTitle={card.facility_name} // Display facility name
  //             // cardText={card.accessibility_features} // Display accessibility features
  //             // cardImg={card.picture}
  //             facility={card}
  //           />
  //         </Col>
  //       ))}
  //     </Row>
  //   );
  // };

  return (
    <Container className="my-4">
      <div className="d-flex justify-content-between mb-3">
        <h1 className="open-sans-bold">Facilities</h1>
        <div className="d-flex justify-content-end w-100">
          <Form.Control
            type="text"
            placeholder="Search..."
            className="me-3 w-25"
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
        <Tab
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
        </Tab>
      </Tabs>
    </Container>
  );
};

export default UserFacilities;
