import React from "react";
import Navigation from "../components/Navigation.jsx";
import { Col, Container, Image, Row } from "react-bootstrap";
import bgLogo from "../images/bg_pdao.jpg";
import Services from "../components/Services.jsx";
import Teams from "../components/Teams.jsx";
import Footer from "../components/Footer.jsx";

import ron from "../images/ron.jpg";
import jim from "../images/jim.jpg";
import rose from "../images/rose.jpg";

const teamMembers = [
  {
    imgsrc: `https://placehold.co/300x300/000000/FFF`,
    name: "Ronovir",
    bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi at sunt numquam blanditiis voluptas, ratione impedit distinctio nemo nobis cumque dignissimos saepe delectus a id laboriosam dolor tenetur odio cum.",
  },
  {
    imgsrc: `https://placehold.co/300x300/000000/FFF`,
    name: "Jim",
    bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi at sunt numquam blanditiis voluptas, ratione impedit distinctio nemo nobis cumque dignissimos saepe delectus a id laboriosam dolor tenetur odio cum.",
  },
  {
    imgsrc: `https://placehold.co/300x300/000000/FFF`,
    name: "Rose",
    bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi at sunt numquam blanditiis voluptas, ratione impedit distinctio nemo nobis cumque dignissimos saepe delectus a id laboriosam dolor tenetur odio cum.",
  },
];

const LandingPage = () => {
  return (
    <Container fluid className="p-0">
      <Navigation />

      <Image
        src={bgLogo}
        fluid
        className="custom-bg-image"
        alt="Background logo"
      />

      <section id="services" className="mb-5">
        <Services />
      </section>

      <section id="teams" className="py-5">
        <Container>
          <h1 className="text-center mb-5 open-sans-bold">The PWDs</h1>
          <Row className="justify-content-center">
            {teamMembers.map((member, index) => (
              <Col key={index} md={6} lg={4} className="mb-4">
                <div
                  className="team-card d-flex flex-column"
                  style={{ height: "100%" }}
                >
                  <Teams
                    imgsrc={member.imgsrc}
                    name={member.name}
                    bio={member.bio}
                  />
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <Footer />
    </Container>
  );
};

export default LandingPage;
