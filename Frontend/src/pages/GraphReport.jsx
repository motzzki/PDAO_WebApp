import React, { useState, useEffect } from "react";
import axios from "axios";
import Chart from "react-apexcharts";
import { Tab, Tabs } from "react-bootstrap"; // Import Tabs and Tab components

const GraphReport = () => {
  const [cityData, setCityData] = useState([]);
  const [departmentData, setDepartmentData] = useState([]);

  useEffect(() => {
    // Fetch users data
    axios
      .get("https://dummyjson.com/users")
      .then((response) => {
        const users = response.data.users;

        // Extract cities from the user data
        const cityList = users.map((user) => user.address.city);

        // Create an object to count how many users live in each city
        const cityCount = cityList.reduce((acc, city) => {
          acc[city] = (acc[city] || 0) + 1;
          return acc;
        }, {});

        // Convert the cityCount object into an array of city names and counts
        const formattedCityData = Object.entries(cityCount).map(
          ([city, count]) => ({ city, count })
        );

        // Prepare department data
        const departmentList = users.map((user) => user.company.department); // Extract departments
        const departmentCount = departmentList.reduce((acc, dept) => {
          acc[dept] = (acc[dept] || 0) + 1;
          return acc;
        }, {});

        const formattedDepartmentData = Object.entries(departmentCount).map(
          ([department, count]) => ({ name: department, value: count })
        );

        // Set the data
        setCityData(formattedCityData);
        setDepartmentData(formattedDepartmentData);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  // Chart options for city data
  const cityChartOptions = {
    series: [
      {
        name: "Number of Residents",
        data: cityData.map((data) => data.count), // Use the count of people living in each city
      },
    ],
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        distributed: true, // Different colors for each city
        horizontal: false,
        columnWidth: "50%",
      },
    },
    colors: ["#00E396", "#FF4560", "#008FFB", "#775DD0", "#FEB019"],
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: cityData.map((data) => data.city), // Display city names on x-axis
    },
    legend: {
      show: false,
    },
  };

  // Chart options for department data
  const departmentChartOptions = {
    series: departmentData.map((data) => data.value),
    chart: {
      type: "pie",
      height: 350,
    },
    labels: departmentData.map((data) => data.name),
    colors: ["#00E396", "#FF4560", "#008FFB", "#775DD0", "#FEB019"],
    dataLabels: {
      enabled: true,
    },
    legend: {
      show: true,
    },
  };

  return (
    <div>
      <h1 className="open-sans-bold">Graph Report</h1>
      <Tabs defaultActiveKey="cities" id="graph-report-tabs" className="mb-3">
        <Tab eventKey="cities" title="Barangays">
          <div>
            <h2 className="open-sans-bold">Number of People Registered</h2>
            <Chart
              options={cityChartOptions}
              series={cityChartOptions.series}
              type="bar"
              height={350}
            />
          </div>
        </Tab>
        <Tab eventKey="departments" title="Disabilities">
          <div>
            <h2 className="open-sans-bold">Percentage of Disabilities</h2>
            <Chart
              options={departmentChartOptions}
              series={departmentChartOptions.series}
              type="pie"
              height={350}
            />
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

export default GraphReport;
