import React from "react";
import { Card, CardText, Col, Row } from "react-bootstrap";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaGift,
  FaWheelchair,
  FaStethoscope,
  FaAssistiveListeningSystems,
  FaHandsHelping,
  FaPalette,
} from "react-icons/fa";

const assistanceData = [
  {
    title: "CASH GIFT",
    text: "(PWD Birthdays)",
    link: "/admin/cashgift",
    icon: <FaGift size={50} color="#dc3545" />,
  },
  {
    title: "WALKER AND WHEELCHAIR",
    text: "(Physical Disability)",

    link: "/admin/walker",
    icon: <FaWheelchair size={50} color="#dc3545" />,
  },
  {
    title: "MEDICAL MISSION",
    link: "/admin/medical-mission",
    text: "(General Disabilities)",

    icon: <FaStethoscope size={50} color="#dc3545" />,
  },
  {
    title: "HEARING AID",
    link: "/admin/hearing-aid",
    text: "(Hearing Disability)",

    icon: <FaAssistiveListeningSystems size={50} color="#dc3545" />,
  },
  {
    title: "SIGN LANGUAGE TRAINING",
    text: "(Hearing and Speech Disabilities)",

    link: "/admin/sign-language-training",
    icon: <FaHandsHelping size={50} color="#dc3545" />,
  },
  {
    title: "ARTS AND WORKSHOP",
    text: "(Psychosocial, Learning, and Intellectual Disabilities)",

    link: "/admin/arts-workshop",
    icon: <FaPalette size={50} color="#dc3545" />,
  },
];

const styles = {
  card: {
    height: "350px",
    textAlign: "center",
    cursor: "pointer",
    backgroundColor: "#ffffff",
    border: "1px solid #ccc",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  cardHover: {
    transform: "scale(1.05)",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
  },
  cardTitle: {
    fontSize: "1.8rem",
    fontWeight: "bold",
    color: "#333",
    marginTop: "10px",
  },
};

const Assistance = () => {
  return (
    <div className="my-auto p-5">
      <Row xs={1} sm={2} md={3} className="g-4">
        {assistanceData.map((item, index) => (
          <Col key={index}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5 }}
            >
              <Link to={item.link} style={{ textDecoration: "none" }}>
                <Card style={styles.card}>
                  <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                    <Card.Title style={styles.cardTitle}>
                      {item.title}
                    </Card.Title>
                    {item.icon}
                    <CardText className="mt-5 open-sans-bold">
                      {item.text}
                    </CardText>
                  </Card.Body>
                </Card>
              </Link>
            </motion.div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Assistance;
