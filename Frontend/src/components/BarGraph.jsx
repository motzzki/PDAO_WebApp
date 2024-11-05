import React, { useState, useEffect } from "react";
import axios from "axios";
import Chart from "react-apexcharts";
import { host } from "../apiRoutes";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const BarGraph = () => {
  const [barangayData, setBarangayData] = useState([]);

  const fetchBarangayData = async () => {
    try {
      const response = await axios.get(`${host}/api/barangay/get_barangay`);
      setBarangayData(response.data);
    } catch (error) {
      console.error("Error fetching barangay data:", error);
    }
  };

  useEffect(() => {
    fetchBarangayData();
  }, []);

  const barangayChartOptions = {
    series: [
      {
        name: "",
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

  return (
    <Chart
      options={barangayChartOptions}
      series={barangayChartOptions.series}
      type="bar"
      height={350}
    />
  );
};

export default BarGraph;
