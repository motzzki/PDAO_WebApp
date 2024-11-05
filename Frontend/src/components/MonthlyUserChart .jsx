import React, { useState, useEffect } from "react";
import axios from "axios";
import Chart from "react-apexcharts";
import { host } from "../apiRoutes";

const MonthlyUserChart = () => {
  const [chartData, setChartData] = useState({ series: [], categories: [] });

  const fetchMonthlyUserData = async () => {
    try {
      const response = await axios.get(`${host}/api/barangay/monthly-enlist`);
      const data = response.data;

      const categories = data.map((item) => item.month);
      const series = [
        { name: "Users Created", data: data.map((item) => item.user_count) },
      ];

      setChartData({ categories, series });
    } catch (error) {
      console.error("Error fetching monthly user data:", error);
    }
  };

  useEffect(() => {
    fetchMonthlyUserData();
  }, []);

  const chartOptions = {
    chart: {
      type: "line",
      height: 350,
    },
    xaxis: {
      categories: chartData.categories,
      title: {
        text: "Month",
      },
    },
    yaxis: {
      title: {
        text: "Number of Users Created",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
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

export default MonthlyUserChart;
