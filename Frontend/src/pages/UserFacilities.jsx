import React from "react";
import { Row, Col, Container, Tabs, Tab } from "react-bootstrap";
import CardFacilities from "../components/CardFacilities";
import rose from "../images/rosepwd.jpg";
import ron from "../images/ron.jpg";

const cardData = {
  proFriendly: [
    {
      title: "Card 1",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam sed eius ratione laborum! Nihil ex similique corporis modi ipsa sequi, nisi tempore aspernatur quam odit.",
      imgSrc: ron,
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

const UserFacilities = () => {
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

  return (
    <Container className="my-4">
      <h2 className="text-center mb-4">Facilities</h2>
      <Tabs
        defaultActiveKey="proFriendly"
        id="facilities-tabs"
        className="mb-3"
      >
        <Tab eventKey="proFriendly" title="Pro-Friendly">
          {renderCardList(cardData.proFriendly)}
        </Tab>
        <Tab eventKey="antiFriendly" title="Anti-Friendly">
          {renderCardList(cardData.antiFriendly)}
        </Tab>
      </Tabs>
    </Container>
  );
};

export default UserFacilities;
