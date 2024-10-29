import React from "react";
import { Card } from "react-bootstrap";

const HelpCard = ({ title, img, text, link }) => {
  return (
    <Card className="text-center rounded-5 shadow hover-shadow mb-3">
      {img && typeof img === "string" ? (
        <Card.Img
          variant="top"
          src={img}
          alt={title}
          style={{ maxWidth: "100px", margin: "0 auto" }}
        />
      ) : (
        <div style={{ fontSize: "5rem" }}>{img}</div>
      )}
      <Card.Body>
        <Card.Title className="open-sans-bold">{title}</Card.Title>
        <Card.Text className="open-sans-italic fs-5">{text}</Card.Text>
        <a
          className="open-sans-italic link-danger link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover fs-1"
          href={link ? link : "#"}
          target="_blank"
          rel="noopener noreferrer"
        >
          Click here
        </a>
      </Card.Body>
    </Card>
  );
};

export default HelpCard;
