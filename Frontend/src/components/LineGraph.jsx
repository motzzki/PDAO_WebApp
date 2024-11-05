import React, { useState, useEffect } from "react";
import axios from "axios";
import Chart from "react-apexcharts";
import { host } from "../apiRoutes";

const StackedBarGraph = () => {
  const [chartData, setChartData] = useState({ series: [], categories: [] });

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const fetchDisabilityData = async () => {
    try {
      const response = await axios.get(
        `${host}/api/barangay/distributed_disability`
      );
      const data = response.data;

      const groupedData = {};
      data.forEach((item) => {
        if (!groupedData[item.barangay]) {
          groupedData[item.barangay] = {};
        }
        groupedData[item.barangay][item.disability_status] =
          Number(item.user_count) || 0;
      });

      // Log the grouped data for debugging

      const disabilityStatuses = [
        ...new Set(data.map((item) => item.disability_status)),
      ];

      const series = disabilityStatuses.map((status) => ({
        name: status,
        data: Object.values(groupedData).map(
          (barangay) => Number(barangay[status]) || 0 // Ensure number type
        ),
      }));

      const categories = Object.keys(groupedData).map(capitalizeFirstLetter);

      // Log series and categories to verify lengths match

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
      type: "bar",
      height: 350,
      stacked: true, // Enable stacking
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
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "50%",
        dataLabels: {
          position: "top",
        },
      },
    },
    tooltip: {
      y: {
        formatter: (value) => `${value} users`,
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "left",
    },
    fill: {
      opacity: 1,
    },
  };

  return (
    <Chart
      options={chartOptions}
      series={chartData.series}
      type="bar"
      height={350}
    />
  );
};

export default StackedBarGraph;
