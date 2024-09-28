import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={6} className="text-center mb-3">
            <h5>Person with Disability Affairs Office - Cabuyao</h5>
            <address>
              P. Burgos St. Brgy.Poblacion Uno, City of Cabuyao. Laguna <br />
              <a
                href="mailto:pdaocabuyaocity2024@gmail.com"
                className="text-light"
              >
                pdaocabuyaocity2024@gmail.com
              </a>
            </address>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col xs={12} md={6} className="text-center">
            <p className="mb-0">
              &copy; {new Date().getFullYear()} All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
