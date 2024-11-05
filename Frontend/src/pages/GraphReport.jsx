import React from "react";
import { Col, Row, Container } from "react-bootstrap";
import GraphCard from "../components/GraphCard.jsx";
import BarGraph from "../components/BarGraph.jsx";
import PieChart from "../components/PieChart.jsx";
import LineGraph from "../components/LineGraph.jsx";
import MonthlyUserChart from "../components/MonthlyUserChart .jsx";

const GraphReport = () => {
  return (
    <Container fluid>
      <Row className="g-3">
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
          <GraphCard title="Monthly Registered">
            <MonthlyUserChart />
          </GraphCard>
        </Col>
      </Row>
    </Container>
  );
};

export default GraphReport;
