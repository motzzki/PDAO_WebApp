import React from "react";
import { Container } from "react-bootstrap";

const FooterUser = () => {
  return (
    <footer className="bg-dark text-center text-white mt-4 py-3">
      <Container>
        <p className="mb-1">
          &copy; {new Date().getFullYear()} Persons With Disabilities Affairs Office - PDAO. All rights reserved.
        </p>
        <p>
          <a
            href="#"
            className="text-white text-decoration-none mx-2"
          >
            Privacy Policy
          </a>
          |
          <a
            href="#"
            className="text-white text-decoration-none mx-2"
          >
            Terms of Service
          </a>
        </p>
      </Container>
    </footer>
  );
};

export default FooterUser;
