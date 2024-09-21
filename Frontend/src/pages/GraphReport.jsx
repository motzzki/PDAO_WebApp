import React, { useState, useEffect } from "react";
import axios from "axios";
import Chart from "react-apexcharts";
import { Tab, Tabs } from "react-bootstrap";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const GraphReport = () => {
  const [barangayData, setBarangayData] = useState([]);
  const [disabilityData, setDisabilityData] = useState([]);

  // Fetch barangay data
  const fetchBarangayData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/barangay/get_barangay"
      );
      setBarangayData(response.data);
    } catch (error) {
      console.error("Error fetching barangay data:", error);
    }
  };

  // Fetch disability data
  const fetchDisabilityData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/barangay/get_disability"
      );
      setDisabilityData(response.data);
    } catch (error) {
      console.error("Error fetching disability data:", error);
    }
  };

  useEffect(() => {
    fetchBarangayData();
    fetchDisabilityData();
  }, []);

  // Chart options for the barangay data
  const barangayChartOptions = {
    series: [
      {
        name: "Registered Users",
        data: barangayData.map((data) => data.Registered),
      },
    ],
    chart: {
      type: "bar",
      height: 450,
    },
    plotOptions: {
      bar: {
        distributed: true,
        horizontal: false,
        columnWidth: "50%",
      },
    },
    colors: ["#008FFB"],
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: barangayData.map((data) =>
        capitalizeFirstLetter(data.barangay)
      ),
    },
    legend: {
      show: false,
    },
  };

  // Chart options for the disability data
  const disabilityChartOptions = {
    series: disabilityData.map((data) => data.Num),
    chart: {
      type: "pie",
      height: 450,
    },
    labels: disabilityData.map((data) =>
      capitalizeFirstLetter(data.disability_status)
    ),
    colors: ["#00E396", "#FF4560", "#008FFB", "#775DD0", "#FEB019"],
    dataLabels: {
      enabled: true,
    },
    legend: {
      show: true,
    },
  };

  return (
    <div className="container mt-5">
      <h1 className="open-sans-bold text-center mb-4">Graphical Report</h1>
      <Tabs
        defaultActiveKey="barangays"
        id="graph-report-tabs"
        className="mb-3"
      >
        <Tab eventKey="barangays" title="Barangays">
          <div className="mb-5">
            <h2 className="open-sans-bold text-center mb-3">
              Number of People Registered by Barangay
            </h2>
            <Chart
              options={barangayChartOptions}
              series={barangayChartOptions.series}
              type="bar"
              height={450}
            />
          </div>
        </Tab>
        <Tab eventKey="disabilities" title="Disabilities">
          <div className="mb-5">
            <h2 className="open-sans-bold text-center mb-3">
              Disability Status Distribution
            </h2>
            <Chart
              options={disabilityChartOptions}
              series={disabilityChartOptions.series}
              type="pie"
              height={450}
            />
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

export default GraphReport;
