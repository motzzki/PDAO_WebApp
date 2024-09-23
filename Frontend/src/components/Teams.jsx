import React from "react";
import { Button, Card } from "react-bootstrap";

const Teams = ({ name, bio, imgsrc }) => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={imgsrc} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{bio}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Teams;
