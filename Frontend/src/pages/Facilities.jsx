import React, { useEffect, useState } from "react";
import { Tabs, Tab, Container, Col, Row } from "react-bootstrap";
import axios from "axios";
import CardFacilities from "../components/CardFacilities";
import rose from "../images/rosepwd.jpg";
import ron from "../images/ron.jpg";

const Facilities = () => {
  return (
    <Tabs
      defaultActiveKey="profile"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="home" title="Pro-Friendly">
        <Row className="g-5">
          <Col md={4}>
            <CardFacilities
              cardTitle="Card 1"
              cardText="Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam sed eius ratione laborum! Nihil ex similique corporis modi ipsa sequi, nisi tempore aspernatur quam odit."
              cardImg={ron}
            />
          </Col>
          <Col md={4}>
            <CardFacilities
              cardTitle="Card 2"
              cardText="Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam sed eius ratione laborum! Nihil ex similique corporis modi ipsa sequi, nisi tempore aspernatur quam odit."
              cardImg={ron}
            />
          </Col>
          <Col md={4}>
            <CardFacilities
              cardTitle="Card 3"
              cardText="Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam sed eius ratione laborum! Nihil ex similique corporis modi ipsa sequi, nisi tempore aspernatur quam odit."
              cardImg={ron}
            />
          </Col>
          <Col md={4}>
            <CardFacilities
              cardTitle="Card 3"
              cardText="Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam sed eius ratione laborum! Nihil ex similique corporis modi ipsa sequi, nisi tempore aspernatur quam odit."
              cardImg={ron}
            />
          </Col>
          <Col md={4}>
            <CardFacilities
              cardTitle="Card 3"
              cardText="Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam sed eius ratione laborum! Nihil ex similique corporis modi ipsa sequi, nisi tempore aspernatur quam odit."
              cardImg={ron}
            />
          </Col>
          <Col md={4}>
            <CardFacilities
              cardTitle="Card 3"
              cardText="Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam sed eius ratione laborum! Nihil ex similique corporis modi ipsa sequi, nisi tempore aspernatur quam odit."
              cardImg={ron}
            />
          </Col>
        </Row>
      </Tab>
      <Tab eventKey="profile" title="Anti-Friendly">
        <Row className="g-5">
          <Col md={4}>
            <CardFacilities
              cardTitle="Card 1"
              cardText="Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam sed eius ratione laborum! Nihil ex similique corporis modi ipsa sequi, nisi tempore aspernatur quam odit."
              cardImg={rose}
            />
          </Col>
          <Col md={4}>
            <CardFacilities
              cardTitle="Card 2"
              cardText="Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam sed eius ratione laborum! Nihil ex similique corporis modi ipsa sequi, nisi tempore aspernatur quam odit."
              cardImg={rose}
            />
          </Col>
          <Col md={4}>
            <CardFacilities
              cardTitle="Card 3"
              cardText="Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam sed eius ratione laborum! Nihil ex similique corporis modi ipsa sequi, nisi tempore aspernatur quam odit."
              cardImg={rose}
            />
          </Col>
        </Row>
      </Tab>
    </Tabs>
  );
};

export default Facilities;
