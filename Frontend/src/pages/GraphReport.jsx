import React, { useState, useEffect } from "react";
import axios from "axios";
import Chart from "react-apexcharts";

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
        name:"",
        data: barangayData.map((data) => data.Registered),
      },
    ],
    chart: {
      type: "bar",
      height: 350,
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
    tooltip: {
      y: {
        formatter: (value, { seriesIndex, dataPointIndex }) => {
          const barangay = barangayData[dataPointIndex].barangay;
          const registered = barangayData[dataPointIndex].Registered;
          return `${capitalizeFirstLetter(barangay)}: ${registered} registered`;
        },
      },
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
      height: 350,
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
    <div className="container mt-1">
      <h1 className="open-sans-bold text-center mb-4">Graphical Report</h1>
      <div className="mb-5">
        <h2 className="open-sans-bold text-center mb-3">
          Number of People Registered by Barangay
        </h2>
        <Chart
          options={barangayChartOptions}
          series={barangayChartOptions.series}
          type="bar"
          height={350}
        />
      </div>
      <div className="mb-5 mt-3">
        <h2 className="open-sans-bold text-center mb-5">
          Disability Status Distribution
        </h2>
        <Chart
          options={disabilityChartOptions}
          series={disabilityChartOptions.series}
          type="pie"
          height={350}
        />
      </div>
    </div>
  );
};

export default GraphReport;
