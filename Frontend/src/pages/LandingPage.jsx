import React from "react";
import Navigation from "../components/Navigation.jsx";
import { Col, Container, Image, Row } from "react-bootstrap";
import bgLogo from "../images/bg_pdao.jpg";
import Services from "../components/Services.jsx";
import Teams from "../components/Teams.jsx";
import Ron from "../images/ron.jpg";
import Jim from "../images/jim.jpg";
import Rose from "../images/rose.jpg";
import Footer from "../components/Footer.jsx";

const LandingPage = () => {
  return (
    <Container fluid className="p-0">
      <Navigation />
      <Image src={bgLogo} fluid className="custom-bg-image" />
      <div id="services" className="mb-5">
        <Services />
      </div>
      <div id="teams">
        <Container>
          <h1 className="text-center mb-5 open-sans-bold">The PWDs</h1>
          <Row className="justify-content-center">
            <Col md={4} className="mb-4">
              <div
                className="team-card d-flex flex-column"
                style={{ height: "100%" }}
              >
                <Teams
                  imgsrc={Ron}
                  name="Ronovir"
                  bio="Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi at sunt numquam blanditiis voluptas, ratione impedit distinctio nemo nobis cumque dignissimos saepe delectus a id laboriosam dolor tenetur odio cum."
                />
              </div>
            </Col>
            <Col md={4} className="mb-4">
              <div
                className="team-card d-flex flex-column"
                style={{ height: "100%" }}
              >
                <Teams
                  imgsrc={Jim}
                  name="Jim"
                  bio="Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi at sunt numquam blanditiis voluptas, ratione impedit distinctio nemo nobis cumque dignissimos saepe delectus a id laboriosam dolor tenetur odio cum."
                />
              </div>
            </Col>
            <Col md={4} className="mb-4">
              <div
                className="team-card d-flex flex-column"
                style={{ height: "100%" }}
              >
                <Teams
                  imgsrc={Rose}
                  name="Rose"
                  bio="Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi at sunt numquam blanditiis voluptas, ratione impedit distinctio nemo nobis cumque dignissimos saepe delectus a id laboriosam dolor tenetur odio cum."
                />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer /> {/* Render the Footer component here */}
    </Container>
  );
};

export default LandingPage;
