import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4">
      <Container>
        <Row>
          <Col className="text-center">
            <h5>Person with Disability Affairs Office - Cabuyao</h5>
            <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
            <p>P. Burgos St. Brgy.Poblacion Uno, City of Cabuyao. Laguna</p>
            <p>pdaocabuyaocity2024@gmail.com</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
