import React from "react";
import { Col, Row, Container } from "react-bootstrap";
import GraphCard from "../components/GraphCard";
import CashGiftGraph from "../components/CashGiftGraph";
import PieChart from "../components/PieChart";
import MonthlyUserChart from "../components/MonthlyUserChart ";
import LineGraph from "../components/LineGraph.jsx";

const Dashboard = () => {
  return (
    <Container fluid>
      <Row className="g-3">
        <Col xs={4} md={6} lg={12}>
          <GraphCard title="Monthly Registered">
            <MonthlyUserChart />
          </GraphCard>
        </Col>
        <Col xs={4} md={6} lg={12}>
          <GraphCard title="Disability Distribution per Barangay">
            <LineGraph />
          </GraphCard>
        </Col>
        <Col xs={12} md={6} lg={4}>
          <GraphCard title="Disability Status Distribution">
            <PieChart />
          </GraphCard>
        </Col>
        <Col xs={12} md={6} lg={8}>
          <GraphCard>
            <CashGiftGraph />
          </GraphCard>
        </Col>
      </Row>
    </Container>
  );
};
{
  /* <LineGraph /> */
}
{
  /* <PieChart /> */
}
{
  /* <CashGiftGraph /> */
}

// Disability Distribution per Barangay

export default Dashboard;
