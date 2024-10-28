import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import HelpCard from "../components/HelpCard";
import { cardData } from "../helpCardDate.jsx";

const AddHelp = () => {
  return (
    <Container>
      <h1 className="text-center open-sans-italic-bold mb-5">
        We are here to help!
      </h1>
      <Row className="g-4">
        {Object.keys(cardData).map((disabilityType, index) => {
          const card = cardData[disabilityType];
          return (
            <Col key={index} md={4}>
              <HelpCard
                title={card.title}
                img={card.img}
                text={card.text}
                link={card.link}
              />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default AddHelp;
