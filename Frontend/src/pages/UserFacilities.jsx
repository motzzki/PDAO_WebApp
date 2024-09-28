import React from "react";
import { Button, Card, Row, Col, Container } from "react-bootstrap";
import hehe from "../images/hehe.jpg";
import FooterUser from "../components/UserFooter";

const cardsData = Array.from({ length: 12 }, (_, index) => ({
  title: `Card Title ${index + 1}`,
  text: `Some quick example text for card ${index + 1}.`,
  imgSrc: hehe,
}));

const UserFacilities = () => {
  return (
    <div>
      <Container className="my-4">
        <h1 className="text-center mb-5">Facilities</h1>
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {cardsData.map((card, index) => (
            <Col key={index}>
              <Card className="h-100 shadow-sm">
                <Card.Img
                  variant="top"
                  src={card.imgSrc}
                  style={{ height: "200px", objectFit: "cover" }}
                  alt={`Facility ${index + 1}`}
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{card.title}</Card.Title>
                  <Card.Text>{card.text}</Card.Text>
                  <Button
                    variant="primary"
                    className="mt-auto align-self-start"
                  >
                    View More
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <FooterUser />
    </div>
  );
};

export default UserFacilities;
