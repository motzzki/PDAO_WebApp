import React from "react";
import { Button, Card } from "react-bootstrap";

const CardFacilities = ({ cardTitle, cardText, cardImg }) => {
  return (
    <Card>
      <Card.Img variant="top" src={cardImg} className="card-img-fixed" />
      <Card.Body>
        <Card.Title>{cardTitle}</Card.Title>
        <Card.Text>{cardText}</Card.Text>
        <Button variant="primary">View more details</Button>
      </Card.Body>
    </Card>
  );
};

export default CardFacilities;
