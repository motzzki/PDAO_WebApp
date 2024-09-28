import UserHeader from "../components/UserHeader";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import hehe from "../images/hehe.jpg";
import { Row, Col } from "react-bootstrap";
import FooterUser from "../components/UserFooter";

const cardsData = Array.from({ length: 30 }, (_, index) => ({
  title: `Card Title ${index + 1}`,
  text: `Some quick example text for card ${index + 1}.`,
  imgSrc: hehe,
}));

const UserFacilities = () => {
  return (
    <div>
      <div className="m-2 userFacility">
        <h1 className="text-center m-4">Facilities</h1>
        <Row xs={2} md={4} lg={5} className="g-4">
          {cardsData.map((card, index) => (
            <Col key={index}>
              <Card>
                <Card.Img variant="top" src={card.imgSrc} />
                <Card.Body>
                  <Card.Title>{card.title}</Card.Title>
                  <Card.Text>{card.text}</Card.Text>
                  <Button variant="primary">View more details</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
      <FooterUser />
    </div>
  );
};

export default UserFacilities;
