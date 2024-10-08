import React, { useState, useEffect } from "react";
import axios from "axios";
import Chart from "react-apexcharts";

const LineGraph = () => {
  const [chartData, setChartData] = useState({ series: [], categories: [] });

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const fetchDisabilityData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/barangay/distributed_disability"
      );
      const data = response.data;

      const groupedData = {};
      data.forEach((item) => {
        if (!groupedData[item.barangay]) {
          groupedData[item.barangay] = {};
        }
        groupedData[item.barangay][item.disability_status] = item.user_count;
      });

      const disabilityStatuses = [
        ...new Set(data.map((item) => item.disability_status)),
      ];

      const series = disabilityStatuses.map((status) => ({
        name: status,
        data: Object.values(groupedData).map(
          (barangay) => barangay[status] || 0
        ),
      }));

      // Capitalize first letter for each barangay
      const categories = Object.keys(groupedData).map(capitalizeFirstLetter);

      setChartData({ series, categories });
    } catch (error) {
      console.error("Error fetching distributed disability data:", error);
    }
  };

  useEffect(() => {
    fetchDisabilityData();
  }, []);

  const chartOptions = {
    chart: {
      type: "line",
      height: 350,
    },
    xaxis: {
      categories: chartData.categories,
      title: {
        text: "Barangay",
      },
    },
    yaxis: {
      title: {
        text: "Number of PWD",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    tooltip: {
      y: {
        formatter: (value) => `${value} users`,
      },
    },
  };

  return (
    <Chart
      options={chartOptions}
      series={chartData.series}
      type="line"
      height={350}
    />
  );
};

export default LineGraph;
