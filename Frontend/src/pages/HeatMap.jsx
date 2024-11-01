import React, { useEffect, useState } from "react";
import { MapContainer, GeoJSON, useMap } from "react-leaflet";
import "leaflet.heat";
import axios from "axios";
import L from "leaflet";
import { barangayBoundaries } from "../Cabuyao";

const HeatMap = () => {
  const [heatmapData, setHeatmapData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBarangayData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/barangay/get_barangay"
        );

        if (response.status === 200) {
          const barangayInfo = response.data;

          // Prepare heatmap data based on fetched barangay info
          const heatData = barangayInfo.map((barangay) => {
            const coordinates = getBarangayCoordinates(barangay.barangay);
            return [
              coordinates.lat,
              coordinates.lng,
              barangay.Registered / 100, // Adjust the intensity
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
    const feature = barangayBoundaries.features.find(
      (feature) => feature.properties.NAME_3 === barangayName
    );

    if (feature) {
      const coordinates = feature.geometry.coordinates[0][0];
      return {
        lat: coordinates[1], // latitude
        lng: coordinates[0], // longitude
      };
    }

    return { lat: 0, lng: 0 }; // Default if not found
  };

  const onEachFeature = (feature, layer) => {
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
          blur: 15,
          maxZoom: 17,
          gradient: {
            0.2: "blue",
            0.4: "lime",
            0.6: "yellow",
            0.8: "orange",
            1: "red",
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
        style={{ color: "red", weight: 2, fillOpacity: 0.2 }}
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
