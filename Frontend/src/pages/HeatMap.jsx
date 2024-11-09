import React, { useEffect, useState } from "react";
import { MapContainer, GeoJSON, useMap } from "react-leaflet";
import "leaflet.heat";
import axios from "axios";
import L from "leaflet";
import { barangayBoundaries } from "../Cabuyao";
import { host } from "../apiRoutes";

// Function to generate a random hex color
const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const HeatMap = () => {
  const [heatmapData, setHeatmapData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBarangayData = async () => {
      try {
        const response = await axios.get(`${host}/api/barangay/get_barangay`);

        if (response.status === 200) {
          const barangayInfo = response.data;

          // Prepare heatmap data based on fetched barangay info
          const heatData = barangayInfo.map((barangay) => {
            const coordinates = getBarangayCoordinates(barangay.barangay);
            return [
              coordinates.lat,
              coordinates.lng,
              (barangay.Registered && barangay.Registered / 100) || 0, // Adjust the intensity
            ];
          });

          setHeatmapData(heatData);
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

  const getBarangayCoordinates = (barangayName) => {
    const feature = barangayBoundaries.features.find((feature) => {
      return feature.properties.NAME_3.toLocaleLowerCase() === barangayName;
    });

    if (feature) {
      const coordinates = feature.geometry.coordinates[0][0];
      return {
        lat: coordinates[1], // latitude
        lng: coordinates[0], // longitude
      };
    }

    return { lat: 0, lng: 0 }; // Default if not found
  };

  // Dynamic style function for GeoJSON features
  const styleFeature = (feature) => {
    return {
      fillColor: getRandomColor(), // Assign a random color to each barangay
      weight: 2, // Border thickness
      opacity: 1, // Border opacity
      color: "white", // Border color
      fillOpacity: 0.7, // Fill opacity
    };
  };

  const onEachFeature = (feature, layer) => {
    // Create a simple tooltip with the Barangay name
    layer.bindTooltip(feature.properties.NAME_3, {
      permanent: true,
      direction: "center",
      offset: [0, 0],
      className: "custom-tooltip", // Use a custom class to target specific tooltips
    });

    layer.on({
      click: () => {
        layer.bindPopup(feature.properties.NAME_3).openPopup();
      },

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
          color: "red",
          weight: 2,
          fillOpacity: 0.2,
        });
        layer.closePopup();
      },
    });
  };

  const HeatmapLayer = ({ data }) => {
    const map = useMap();

    useEffect(() => {
      if (data.length > 0) {
        const heat = L.heatLayer(data, {
          radius: 25,
          blur: 5,
          maxZoom: 17,
          minOpacity: 0.5,
          gradient: {
            0: "blue", // Very low intensity
            0.5: "yellow", // Mid intensity
            1: "red", // High intensity // Very high intensity (contrasting red)
          },
        });
        heat.addTo(map);

        return () => {
          map.removeLayer(heat);
        };
      }
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
      <div
        style={{
          position: "absolute",
          bottom: "10px",
          left: "10px",
          background: "white",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          zIndex: 1000,
        }}
      >
        <h4>Heatmap Legend</h4>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ background: "red", height: "20px", width: "20px" }} />{" "}
          High
          <div
            style={{ background: "orange", height: "20px", width: "20px" }}
          />{" "}
          Medium
          <div
            style={{ background: "yellow", height: "20px", width: "20px" }}
          />{" "}
          Low
          <div
            style={{ background: "lime", height: "20px", width: "20px" }}
          />{" "}
          Very Low
          <div
            style={{ background: "blue", height: "20px", width: "20px" }}
          />{" "}
          No Data
        </div>
      </div>
    </MapContainer>
  );
};

export default HeatMap;
