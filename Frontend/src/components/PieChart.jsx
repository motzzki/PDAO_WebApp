import React, { useState, useEffect } from "react";
import axios from "axios";
import Chart from "react-apexcharts";
import { host } from "../apiRoutes";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
const PieChart = () => {
  const [disabilityData, setDisabilityData] = useState([]);

  const fetchDisabilityData = async () => {
    try {
      const response = await axios.get(`${host}/api/barangay/get_disability`);
      setDisabilityData(response.data);
    } catch (error) {
      console.error("Error fetching disability data:", error);
    }
  };

  useEffect(() => {
    fetchDisabilityData();
  }, []);

  const disabilityChartOptions = {
    series: disabilityData.map((data) => data.Num),
    chart: {
      type: "pie",
      height: 350,
    },
    labels: disabilityData.map((data) =>
      capitalizeFirstLetter(data.disability_status)
    ),
    colors: [
      "#00E396",
      "#FF4560",
      "#008FFB",
      "#775DD0",
      "#FEB019",
      "#F8981D",
      "#343131",
      "#4B0082",
    ],

    dataLabels: {
      enabled: true,
    },
    legend: {
      show: true,
    },
  };
  return (
    <Chart
      options={disabilityChartOptions}
      series={disabilityChartOptions.series}
      type="pie"
      height={350}
    />
  );
};

export default PieChart;
