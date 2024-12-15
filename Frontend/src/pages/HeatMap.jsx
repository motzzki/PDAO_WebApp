import React, { useEffect, useState } from "react";
import { MapContainer, GeoJSON, useMap } from "react-leaflet";
import "leaflet.heat";
import axios from "axios";
import L from "leaflet";
import { barangayBoundaries } from "../Cabuyao"; // Assuming this is your geoJSON data
import Modal from "react-bootstrap/Modal";
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
  const [barangayMarkers, setBarangayMarkers] = useState([]);
  const [error, setError] = useState(null);
  const [modalData, setModalData] = useState(null);

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
          const markers = [];
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

            if (
              barangay.flag === 1 &&
              barangay.barangay_name === barangay.barangay
            ) {
              const regCount = barangay.Registered;
              markers.push({
                name: barangay.facility_name,
                location: barangay.location,
                lat: barangay.latitude,
                lng: barangay.longitude,
                image: barangay.picture,
                count: regCount,
                category,
              });
            } else if (
              barangay.flag === 1 &&
              barangay.barangay_name !== barangay.barangay
            ) {
              const markerExists = markers.some(
                (marker) =>
                  marker.lat === barangay.latitude &&
                  marker.lng === barangay.longitude
              );

              if (!markerExists) {
                markers.push({
                  name: barangay.facility_name,
                  location: barangay.location,
                  lat: barangay.latitude,
                  lng: barangay.longitude,
                  image: barangay.picture,
                  count: 0,
                  category,
                });
              }
            }
          });

          setHeatmapData(heatData);
          setBarangayCounts(counts);
          setBarangayCategories(categories);
          setBarangayColors(colors);
          setBarangayMarkers(markers);
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

  const PinpointsLayer = () => {
    const map = useMap();

    useEffect(() => {
      barangayMarkers.forEach((marker) => {
        const leafletMarker = L.marker([marker.lat, marker.lng])
          .addTo(map)
          .bindTooltip(marker.name, {
            permanent: false,
            direction: "top",
            className: "custom-tooltip",
          });

        leafletMarker.on("click", () => {
          setModalData(marker);
        });
      });

      return () => {
        barangayMarkers.forEach((marker) => {
          map.eachLayer((layer) => {
            if (layer instanceof L.Marker) {
              map.removeLayer(layer);
            }
          });
        });
      };
    }, [barangayMarkers, map]);

    return null;
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
      // click: () => {
      //   setModalData({
      //     name: barangayName,
      //     category: barangayCategories[barangayName.toLowerCase()],
      //     count: barangayCounts[barangayName.toLowerCase()],
      //   });
      // },
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
          weight: 3,
          fillOpacity: 0.7,
        });
        layer.closePopup();
      },
    });
  };

  const closeModal = () => setModalData(null);

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

  const legendItemStyle = (bgColor) => ({
    background: bgColor,
    height: "20px",
    width: "20px",
    borderRadius: "4px",
    marginRight: "10px",
  });

  return (
    <>
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
            bottom: "20px", // Adjusted for better spacing
            left: "20px", // Adjusted for better spacing
            backgroundColor: "#fff",
            padding: "15px",
            boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.15)",
            borderRadius: "12px", // Slightly more rounded corners for modern look
            fontFamily: "'Roboto', sans-serif", // Modern font for readability
            width: "200px", // Fixed width to maintain a neat structure
            fontSize: "14px", // Adjusted font size for better readability
          }}
        >
          <h4
            style={{
              fontSize: "18px",
              marginBottom: "10px",
              fontWeight: "bold",
              color: "#333",
            }}
          >
            Heatmap Legend
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={legendItemStyle("#FF5733")} />
            <span>High</span>

            <div style={legendItemStyle("#FFFF57")} />
            <span>Medium</span>

            <div style={legendItemStyle("#33FF57")} />
            <span>Low</span>

            <div style={legendItemStyle("gray")} />
            <span>No Data</span>
          </div>
        </div>
        <PinpointsLayer />
      </MapContainer>
      {modalData && (
        <Modal
          show={true}
          onHide={closeModal}
          centered
          size="lg"
          className="modern-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title className="modal-title">Facility Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="modal-content">
              <div className="modal-info">
                <p className="modal-info-item">
                  <strong>Name:</strong> {modalData.name}
                </p>
                <p className="modal-info-item">
                  <strong>Location:</strong> {modalData.location}
                </p>
                <p className="modal-info-item">
                  <strong>Category:</strong> {modalData.category}
                </p>
                <p className="modal-info-item">
                  <strong>Registered Count:</strong> {modalData.count}
                </p>
              </div>
              <div className="modal-image">
                <img
                  src={modalData.image}
                  alt={`${modalData.name} Facility`}
                  className="facility-image"
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-primary" onClick={closeModal}>
              Close
            </button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default HeatMap;
