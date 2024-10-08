import React from "react";
import { Tabs, Tab, Container, Row, Col, Button } from "react-bootstrap";
import CardFacilities from "../components/CardFacilities";
import rose from "../images/rosepwd.jpg";
import ron from "../images/ron.jpg";

const cardData = {
  proFriendly: [
    {
      title: "Card 1",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam sed eius ratione laborum! Nihil ex similique corporis modi ipsa sequi, nisi tempore aspernatur quam odit.",
    },
    {
      title: "Card 2",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam sed eius ratione laborum! Nihil ex similique corporis modi ipsa sequi, nisi tempore aspernatur quam odit.",
      imgSrc: ron,
    },
    {
      title: "Card 3",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam sed eius ratione laborum! Nihil ex similique corporis modi ipsa sequi, nisi tempore aspernatur quam odit.",
      imgSrc: ron,
    },
  ],
  antiFriendly: [
    {
      title: "Card 1",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam sed eius ratione laborum! Nihil ex similique corporis modi ipsa sequi, nisi tempore aspernatur quam odit.",
      imgSrc: rose,
    },
    {
      title: "Card 2",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam sed eius ratione laborum! Nihil ex similique corporis modi ipsa sequi, nisi tempore aspernatur quam odit.",
      imgSrc: rose,
    },
    {
      title: "Card 3",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam sed eius ratione laborum! Nihil ex similique corporis modi ipsa sequi, nisi tempore aspernatur quam odit.",
      imgSrc: rose,
    },
  ],
};

const Facilities = () => {
  const renderCardList = (cards) => {
    return (
      <Row className="g-4">
        {cards.map((card, index) => (
          <Col key={index} md={4}>
            <CardFacilities
              cardTitle={card.title}
              cardText={card.text}
              cardImg={`https://placehold.co/300x300/000000/FFF`}
            />
          </Col>
        ))}
      </Row>
    );
  };

  const handleAddFacility = () => {
    // Functionality for adding a facility goes here
    alert("Add Facility button clicked!");
  };

  return (
    <Container className="my-4" style={{ position: "relative" }}>
      <Tabs defaultActiveKey="proFriendly" id="facilities-tab" className="mb-3">
        <Tab eventKey="proFriendly" title="Pro-Friendly">
          {renderCardList(cardData.proFriendly)}
        </Tab>
        <Tab eventKey="antiFriendly" title="Anti-Friendly">
          {renderCardList(cardData.antiFriendly)}
        </Tab>
      </Tabs>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "20px",
        }}
      >
        <Button variant="primary" onClick={handleAddFacility}>
          Add Facility
        </Button>
      </div>
    </Container>
  );
};

export default Facilities;
