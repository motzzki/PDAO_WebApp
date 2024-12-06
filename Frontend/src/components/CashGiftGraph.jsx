import React, { useState, useEffect } from "react";
import CanvasJSReact from "@canvasjs/react-charts";
import axios from "axios";
import { host } from "../apiRoutes";
import { Button } from "react-bootstrap"; // Importing Bootstrap Button

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const CashGiftGraph = () => {
  const [birthdaysData, setBirthdaysData] = useState([]); // Store birthdays data
  const [claimedDates, setClaimedDates] = useState([]); // Store claimed dates data
  const [totalClaimed, setTotalClaimed] = useState(0);
  const [totalUnclaimed, setTotalUnclaimed] = useState(0);
  const [chartData, setChartData] = useState([]); // State for drilldown data (dates)
  const [isDrilldown, setIsDrilldown] = useState(false); // State to track drilldown view

  useEffect(() => {
    const fetchCurrentBirthdays = async () => {
      try {
        const response = await axios.get(
          `${host}/api/user_management/current-birthday`
        );
        setBirthdaysData(response.data.birthdays);
        setTotalClaimed(response.data.totalClaimed);
        setTotalUnclaimed(response.data.totalUnclaimed);
      } catch (error) {
        console.error("Error fetching current birthdays data", error);
      }
    };

    fetchCurrentBirthdays();
  }, []);

  useEffect(() => {
    const fetchClaimedDates = async () => {
      try {
        const response = await axios.get(
          `${host}/api/user_management/claimed-dates`
        );
        const data = response.data.claimedDates;

        // Update the data and handle the "Not Claimed" dates
        const updatedData = data.map((date) => {
          // If the claimed_date is 'Not Claimed', we can set a default value or leave it as is
          if (date.claimed_date === "Not Claimed") {
            // Here, we can render a placeholder value like "Not Claimed" or empty string
            date.claimed_date = "Not Claimed"; // Ensure it's marked as "Not Claimed"
          }
          return date;
        });

        setClaimedDates(updatedData);

        // Calculate claimed and unclaimed counts
        const claimed = updatedData.filter(
          (date) => date.claim_tag === 1
        ).length;
        const unclaimed = updatedData.filter(
          (date) => date.claim_tag === 0
        ).length;
      } catch (error) {
        console.error("Error fetching claimed dates", error);
      }
    };

    fetchClaimedDates();
  }, []);

  const handleDrilldown = (e) => {
    const status = e.dataPoint.label;

    const filteredDates = claimedDates.filter((date) => {
      return status === "Claimed" ? date.claim_tag === 1 : date.claim_tag === 0;
    });

    const drilldownData = filteredDates.reduce((acc, date) => {
      const monthYear = new Date(date.claimed_date).toLocaleString("default", {
        month: "short",
        year: "numeric",
      });
      if (!acc[monthYear]) {
        acc[monthYear] = 1;
      } else {
        acc[monthYear] += 1;
      }
      return acc;
    }, {});

    const drilldownDataPoints = Object.keys(drilldownData).map((monthYear) => ({
      label: monthYear,
      y: drilldownData[monthYear],
    }));

    setChartData([
      {
        type: "column",
        indexLabel: "{label}: {y}",
        dataPoints: drilldownDataPoints,
      },
    ]);
    setIsDrilldown(true); // Set drilldown view to true
  };

  const handleBack = () => {
    setIsDrilldown(false); // Return to the original pie chart view
    setChartData([]); // Clear chart data to reset
  };

  const pieChartOptions = {
    animationEnabled: true,
    theme: "light2",
    title: {
      text: "Birthday Cash Gift Claim Status (Pie Chart)",
    },
    data: [
      {
        type: "pie",
        indexLabel: "{label}: {y} ({percent}%)",
        dataPoints: [
          {
            label: "Claimed",
            y: totalClaimed,
            click: handleDrilldown,
          },
          {
            label: "Unclaimed",
            y: totalUnclaimed,
            click: handleDrilldown,
          },
        ],
      },
    ],
  };

  const drilldownBarChartOptions = {
    animationEnabled: true,
    theme: "light2",
    title: {
      text: "Claimed/Unclaimed Dates (Bar Chart)",
    },
    axisX: {
      title: "Month/Year",
    },
    axisY: {
      title: "Total Claims",
    },
    data: [
      {
        type: "column",
        indexLabel: "{label}: {y}",
        dataPoints: chartData.length > 0 ? chartData[0].dataPoints : [],
      },
    ],
  };

  return (
    <div>
      {/* Show the Back Button only when in drilldown view */}
      {isDrilldown && (
        <Button variant="secondary" onClick={handleBack} className="mb-3">
          Back to Pie Chart
        </Button>
      )}

      {chartData.length === 0 ? (
        <CanvasJSChart options={pieChartOptions} />
      ) : (
        <CanvasJSChart options={drilldownBarChartOptions} />
      )}
    </div>
  );
};

export default CashGiftGraph;
