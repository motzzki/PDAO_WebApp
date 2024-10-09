import React from "react";
import FooterUser from "../components/UserFooter";
import hehe from "../images/hehe.jpg";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Image,
  Badge,
  Card,
} from "react-bootstrap";

const UserPage = () => {
  return (
    <div className="userpage-container">
      <main>
        <Container>
          <Row className="user-header mb-4">
            <Image
              src={`https://placehold.co/600x300/000000/FFF`}
              fluid
              className="w-100 h-100"
              style={{ objectFit: "cover" }}
              alt="Responsive"
            />
          </Row>

          <Row className="userinfo mb-5">
            <Col lg={8} md={6} className="px-3">
              <h1 className="text-center open-sans-bold mb-3">
                RA No. 7277: Magna Carta for Disabled Persons
              </h1>
              <p className="open-sans-regular fs-5">
                Republic Act No. 7277, otherwise known as the Magna Carta for
                Disabled Persons, was enacted to ensure that persons with
                disabilities have the same rights as all individuals. This
                measure promotes their full participation and integration into
                society. The law clearly articulates the government’s
                responsibility to guarantee equal opportunities and access to
                health services for persons with disabilities.
              </p>
              <p className="open-sans-regular fs-5">
                However, the ideals and goals outlined in Republic Act No.
                7277—such as providing a comprehensive range of accessible
                services—cannot be fully realized without establishing an office
                in every local government unit to address the needs of persons
                with disabilities. Hence, the creation of the Persons with
                Disabilities Affairs Office (PDAO) in every province, city, and
                municipality is essential.
              </p>
              <p className="open-sans-regular fs-5">
                This office will formulate a master plan to institutionalize a
                national health program for persons with disabilities, aiming to
                enhance the delivery of health services to be more comprehensive
                and efficient. Currently, no office exists to cater specifically
                to the needs of persons with disabilities within local
                government units. In summary, this bill seeks to establish a
                PDAO in every province, city, and municipality.
              </p>
            </Col>
            <Col lg={4} md={6} className="my-3">
              <Card className="mb-4">
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Text>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Officia voluptates magnam tempora omnis saepe ducimus
                    corrupti distinctio voluptate dolorem, asperiores
                    consequuntur maiores impedit qui tempore!
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
              <Card className="mb-4">
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Text>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Labore minus laudantium mollitia neque enim totam quidem
                    voluptatibus maiores corrupti, non, dolore minima ex,
                    suscipit delectus.
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row className="about mb-5">
            <Col className="text-center">
              <h1>About Us</h1>
              <p className="my-3 open-sans-regular fs-5">
                The Persons with Disabilities Affairs Office (PDAO) is dedicated
                to promoting the rights and welfare of persons with disabilities
                (PWDs) in our community. Our mission is to foster an inclusive
                environment where PWDs can fully participate in society, access
                essential services, and lead empowered lives.
              </p>
              <p className="my-3 open-sans-regular fs-5">
                We advocate for their needs, facilitate programs for education
                and employment, and work closely with local government and
                organizations to ensure that PWDs receive the support they
                deserve. Together, we strive to break barriers and create a
                society that values and respects every individual.
              </p>
            </Col>
          </Row>

          <Row className="contact-us mb-5">
            <Col className="text-center">
              <h1 className="mb-3">Contact Us</h1>
              <h4 className="open-sans-regular">
                <Badge bg="danger">pdaocabuyaocity2024@gmail.com</Badge>
              </h4>
              <h4>
                <Badge bg="danger">
                  P. Burgos St. (in front of St. Claire Church) Brgy. Poblacion
                  Uno 4025 Cabuyao, Philippines
                </Badge>
              </h4>
              <Form className="mt-4">
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
