import React from "react";
import { Card } from "react-bootstrap";

const CardPreview = ({ cardTitle, cardBody, ImageIcon }) => {
  return (
    <Card
      style={{ width: "40rem", textAlign: "center", cursor: "pointer" }}
      className="rounded-5 shadow hover-shadow"
    >
      <Card.Body className="open-sans-bold">
        <div style={{ fontSize: "10rem", color: "#007bff" }}>
          <ImageIcon />
        </div>
        <Card.Title className="open-sans-bold">{cardTitle}</Card.Title>
        <Card.Text>{cardBody}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default CardPreview;
