import React, { useEffect, useState } from "react";
import { MapContainer, GeoJSON, useMap } from "react-leaflet";
import "leaflet.heat";
import axios from "axios";
import L from "leaflet";
import { barangayBoundaries } from "../Cabuyao"; // Assuming this is your geoJSON data
import { host } from "../apiRoutes";

const categorizeValue = (value, max) => {
  if (value < 0.4 * max) {
    return "Low";
  } else if (value >= 0.4 * max && value <= 0.7 * max) {
    return "Medium";
  } else {
    return "High";
  }
};

const HeatMap = () => {
  const [heatmapData, setHeatmapData] = useState([]);
  const [barangayCounts, setBarangayCounts] = useState({});
  const [barangayCategories, setBarangayCategories] = useState({});
  const [barangayColors, setBarangayColors] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBarangayData = async () => {
      try {
        const response = await axios.get(`${host}/api/barangay/get_barangay`);

        if (response.status === 200) {
          const barangayInfo = response.data;

          const heatData = [];
          const counts = {};
          const categories = {};
          const colors = {};
          let maxValue = 0;

          // Precompute maximum value to determine relative categories
          barangayInfo.forEach(
            (barangay) =>
              (maxValue = Math.max(maxValue, barangay.Registered || 0))
          );

          // Get coordinates once and then map through the barangay info
          const barangayCoordinates = barangayBoundaries.features.reduce(
            (acc, feature) => {
              acc[feature.properties.NAME_3.toLowerCase()] =
                feature.geometry.coordinates[0][0];
              return acc;
            },
            {}
          );

          barangayInfo.forEach((barangay) => {
            const normalizedBarangayName = barangay.barangay.toLowerCase();
            const coordinates = barangayCoordinates[normalizedBarangayName] || [
              0, 0,
            ];

            const count = barangay.Registered || 0;
            const category = categorizeValue(count, maxValue);

            // Set heatmap data
            heatData.push([coordinates[1], coordinates[0], count / 100]); // Scaling down for heatmap

            // Assign categories and colors
            counts[normalizedBarangayName] = count;
            categories[normalizedBarangayName] = category;
            colors[normalizedBarangayName] =
              category === "High"
                ? "#FF5733"
                : category === "Medium"
                ? "#FFFF57"
                : "#33FF57"; // High = Red, Medium = Yellow, Low = Green
          });

          setHeatmapData(heatData);
          setBarangayCounts(counts);
          setBarangayCategories(categories);
          setBarangayColors(colors);
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching barangay data:", error);
        setError("Failed to fetch barangay data. Please try again later.");
      }
    };

    fetchBarangayData();
  }, []);

  const styleFeature = (feature) => {
    const barangayName = feature.properties.NAME_3.toLowerCase();
    return {
      fillColor: barangayColors[barangayName] || "#CCCCCC", // Default to gray if no color assigned
      weight: 2,
      opacity: 1,
      color: "white",
      fillOpacity: 0.7,
    };
  };

  const onEachFeature = (feature, layer) => {
    const barangayName = feature.properties.NAME_3;

    const tooltipContent = `
      <b>${barangayName}</b><br/>
    `;

    layer.bindTooltip(tooltipContent, {
      permanent: true,
      direction: "center",
      offset: [0, 0],
      className: "custom-tooltip",
    });

    layer.on({
      click: () => layer.bindPopup(tooltipContent).openPopup(),
      mouseover: (e) => {
        const layer = e.target;
        layer.setStyle({
          color: "orange",
          weight: 3,
          fillOpacity: 0.5,
        });
        layer.openPopup();
      },
      mouseout: (e) => {
        const layer = e.target;
        layer.setStyle({
          color: "white",
          weight: 2,
          fillOpacity: 0.7,
        });
        layer.closePopup();
      },
    });
  };

  const HeatmapLayer = ({ data }) => {
    const map = useMap();

    useEffect(() => {
      // if (data.length > 0) {
      //   const heat = L.heatLayer(data, {
      //     radius: 25,
      //     blur: 5,
      //     maxZoom: 17,
      //     minOpacity: 0.5,
      //     gradient: {
      //       0: "blue",
      //       0.5: "yellow",
      //       1: "red",
      //     },
      //   });
      //   heat.addTo(map);
      //   return () => {
      //     map.removeLayer(heat);
      //   };
      // }
    }, [data, map]);

    return null;
  };

  const FitBoundsToPolygon = () => {
    const map = useMap();

    useEffect(() => {
      const bounds = L.geoJSON(barangayBoundaries).getBounds();
      map.fitBounds(bounds);
    }, [map]);

    return null;
  };

  return (
    <MapContainer
      zoom={13}
      minZoom={13}
      style={{ height: "100vh", width: "100%" }}
      dragging={false}
    >
      <GeoJSON
        data={barangayBoundaries}
        style={styleFeature}
        onEachFeature={onEachFeature}
      />
      <FitBoundsToPolygon />
      {heatmapData.length > 0 && <HeatmapLayer data={heatmapData} />}
      {error && (
        <div style={{ color: "red", textAlign: "center" }}>{error}</div>
      )}

      {/* Legend */}
      <div
        style={{
          position: "absolute",
          bottom: "10px",
          left: "10px",
          backgroundColor: "white",
          padding: "10px",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
        }}
      >
        <h4>Heatmap Legend</h4>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              background: "#FF5733",
              height: "20px",
              width: "20px",
              marginRight: "10px",
            }}
          />
          High
          <div
            style={{
              background: "#FFFF57",
              height: "20px",
              width: "20px",
              marginRight: "10px",
            }}
          />
          Medium
          <div
            style={{
              background: "#33FF57",
              height: "20px",
              width: "20px",
              marginRight: "10px",
            }}
          />
          Low
          <div
            style={{
              background: "gray",
              height: "20px",
              width: "20px",
              marginRight: "10px",
            }}
          />
          No Data
        </div>
      </div>
    </MapContainer>
  );
};

export default HeatMap;
