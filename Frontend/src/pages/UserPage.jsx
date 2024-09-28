import React from "react";
import FooterUser from "../components/UserFooter";
import hehe from "../images/hehe.jpg";
import { Container, Row, Col, Button, Form, Image } from "react-bootstrap";

const UserPage = () => {
  return (
    <div className="userpage-container">
      <main>
        <Container>
          <Row className="user-header mb-4">
            <Image
              src={hehe}
              fluid
              className="w-100 h-100"
              style={{ objectFit: "cover" }}
              alt="Responsive"
            />
          </Row>

          <Row className="userinfo mb-5">
            <Col lg={8} md={6} className="px-3">
              <h1 className="text-center">Welcome to the User Page</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Praesent vitae nisi in nulla fermentum commodo. Integer quis
                magna sit amet libero commodo dapibus. Phasellus sit amet odio
                vel purus auctor tincidunt. Vivamus sollicitudin, velit non
                laoreet cursus, sapien ante convallis nunc, et fermentum velit
                arcu a elit. Duis in est libero. Cras auctor, erat vitae viverra
                consectetur, ante sapien suscipit ex, a gravida felis ligula et
                massa.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Praesent vitae nisi in nulla fermentum commodo. Integer quis
                magna sit amet libero commodo dapibus. Phasellus sit amet odio
                vel purus auctor tincidunt. Vivamus sollicitudin, velit non
                laoreet cursus, sapien ante convallis nunc, et fermentum velit
                arcu a elit. Duis in est libero. Cras auctor, erat vitae viverra
                consectetur, ante sapien suscipit ex, a gravida felis ligula et
                massa.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Praesent vitae nisi in nulla fermentum commodo. Integer quis
                magna sit amet libero commodo dapibus. Phasellus sit amet odio
                vel purus auctor tincidunt. Vivamus sollicitudin, velit non
                laoreet cursus, sapien ante convallis nunc, et fermentum velit
                arcu a elit. Duis in est libero. Cras auctor, erat vitae viverra
                consectetur, ante sapien suscipit ex, a gravida felis ligula et
                massa.
              </p>
            </Col>
            <Col lg={4} md={6} className="my-3">
              <Image src={hehe} fluid alt="Responsive" />
            </Col>
          </Row>

          <Row className="about mb-5">
            <Col className="text-center">
              <h1>ABOUT US</h1>
              <p className="my-3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Praesent vitae nisi in nulla fermentum commodo. Integer quis
                magna sit amet libero commodo dapibus. Phasellus sit amet odio
                vel purus auctor tincidunt. Vivamus sollicitudin, velit non
                laoreet cursus, sapien ante convallis nunc, et fermentum velit
                arcu a elit. Duis in est libero. Cras auctor, erat vitae viverra
                consectetur, ante sapien suscipit ex, a gravida felis ligula et
                massa.
              </p>
            </Col>
          </Row>

          <Row className="contact-us mb-5">
            <Col className="text-center">
              <h1>Contact Us</h1>
              <Form className="mt-4">
                <Form.Group controlId="name" className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" required />
                </Form.Group>
                <Form.Group controlId="email" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" required />
                </Form.Group>
                <Form.Group controlId="message" className="mb-3">
                  <Form.Label>Message</Form.Label>
                  <Form.Control as="textarea" rows={4} required />
                </Form.Group>
                <div className="d-flex justify-content-center">
                  <Button variant="danger" type="submit">
                    Send Message
                  </Button>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
        <FooterUser />
      </main>
    </div>
  );
};

export default UserPage;
