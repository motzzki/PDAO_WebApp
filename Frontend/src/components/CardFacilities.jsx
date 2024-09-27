import React from "react";
import { Button, Card, Col } from "react-bootstrap";
import rose from "../images/rosepwd.jpg";

const CardFacilities = ({ cardTitle, cardText, cardImg }) => {
  return (
    <Card>
      <Card.Img variant="top" src={cardImg} />
      <Card.Body>
        <Card.Title>{cardTitle}</Card.Title>
        <Card.Text>{cardText}</Card.Text>
        <Button variant="primary">View more details</Button>
      </Card.Body>
    </Card>
  );
};

export default CardFacilities;
