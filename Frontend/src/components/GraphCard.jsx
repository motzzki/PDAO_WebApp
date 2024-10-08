import React from "react";
import Card from "react-bootstrap/Card";

const GraphCard = ({ title, children }) => {
  return (
    <Card className="w-100 h-100">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        {children}
      </Card.Body>
    </Card>
  );
};

export default GraphCard;
