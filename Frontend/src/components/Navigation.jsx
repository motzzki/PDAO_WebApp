import Reacts from "react";
import { Link } from "react-router-dom";
import Logo from "../images/logopdao.jpg";
import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Form,
  Button,
  Image,
} from "react-bootstrap";

const NavigationBar = () => {
  return (
    <Navbar expand="lg" className="bg-danger py-3">
      <Container fluid>
        <img
          src={Logo}
          alt="Logo"
          className="rounded-circle"
          style={{ width: "50px", height: "50px", marginRight: "10px" }}
        />
        <Navbar.Brand href="#" className="text-white fs-3">
          PDAO
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0 text-white">
            <Nav.Link href="#action1" className="text-white fs-5">
              Home
            </Nav.Link>
            <Nav.Link href="#services" className="text-white fs-5">
              Services
            </Nav.Link>
            {/* <Nav.Link href="#action3" className="text-white fs-5">
              Contact
            </Nav.Link> */}
          </Nav>
          <Form className="d-flex">
            <Link to="/login">
              <Button variant="outline-light" className="fs-5">
                Login
              </Button>
            </Link>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
