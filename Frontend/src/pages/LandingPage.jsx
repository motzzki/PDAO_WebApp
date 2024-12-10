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

      <section id="services" className="mb-5">
        <Services />
      </section>

      <Image
        src={bgLogo}
        fluid
        className="custom-bg-image"
        alt="Background logo"
      />

      <Footer />
    </Container>
  );
};

export default LandingPage;
