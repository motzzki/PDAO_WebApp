import React from "react";
import { Carousel, Image } from "react-bootstrap";
import services1 from "../images/services.jpg";
import services2 from "../images/services1.jpg";
import services3 from "../images/services2.jpg";

const Services = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <div style={{ position: "relative" }}>
          <Image
            src={services1}
            fluid
            className="d-block w-100"
            style={{
              height: "800px", // Increased height
              objectFit: "cover",
              filter: "blur(3px)", // Apply blur effect to the image
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%", // Ensure it spans the entire carousel
              display: "flex",
              alignItems: "center", // Center vertically
              justifyContent: "center", // Center horizontally
            }}
          >
            <Carousel.Caption
              style={{
                color: "white",
                backgroundColor: "rgba(0, 0, 0, 0.7)", // Semi-transparent background for readability
                padding: "20px 40px", // Add balanced padding
                borderRadius: "15px", // Smooth rounded edges
                textAlign: "center", // Center the text
                wordWrap: "break-word",
                maxWidth: "30%", // Limit the width of the background for better appearance
                margin: "0 auto", // Center it horizontally within the parent container
              }}
            >
              <h3
                className="display-2 open-sans-bold text-uppercase"
                style={{
                  fontSize: "clamp(1.5rem, 4vw, 3.5rem)", // Responsive font size
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)", // Add subtle shadow for contrast
                  margin: 0,
                }}
              >
                PWD Events
              </h3>
            </Carousel.Caption>
          </div>
        </div>
      </Carousel.Item>

      <Carousel.Item>
        <div style={{ position: "relative" }}>
          <Image
            src={services2}
            fluid
            className="d-block w-100"
            style={{
              height: "800px", // Increased height
              objectFit: "cover",
              filter: "blur(3px)", // Apply blur effect to the image
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%", // Ensure it spans the entire carousel
              display: "flex",
              alignItems: "center", // Center vertically
              justifyContent: "center", // Center horizontally
            }}
          >
            <Carousel.Caption
              style={{
                color: "white",
                backgroundColor: "rgba(0, 0, 0, 0.7)", // Semi-transparent background for readability
                padding: "20px 40px", // Add balanced padding
                borderRadius: "15px", // Smooth rounded edges
                textAlign: "center", // Center the text
                wordWrap: "break-word",
                maxWidth: "30%", // Limit the width of the background for better appearance
                margin: "0 auto", // Center it horizontally within the parent container
              }}
            >
              <h3
                className="display-2 open-sans-bold text-uppercase"
                style={{
                  fontSize: "clamp(1.5rem, 4vw, 3.5rem)", // Responsive font size
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)", // Add subtle shadow for contrast
                  margin: 0,
                }}
              >
                PWD Registration
              </h3>
            </Carousel.Caption>
          </div>
        </div>
      </Carousel.Item>

      <Carousel.Item>
        <div style={{ position: "relative" }}>
          <Image
            src={services3}
            fluid
            className="d-block w-100"
            style={{
              height: "800px", // Increased height
              objectFit: "cover",
              filter: "blur(3px)", // Apply blur effect to the image
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%", // Ensure it spans the entire carousel
              display: "flex",
              alignItems: "center", // Center vertically
              justifyContent: "center", // Center horizontally
            }}
          >
            <Carousel.Caption
              style={{
                color: "white",
                backgroundColor: "rgba(0, 0, 0, 0.7)", // Semi-transparent background for readability
                padding: "20px 40px", // Add balanced padding
                borderRadius: "15px", // Smooth rounded edges
                textAlign: "center", // Center the text
                wordWrap: "break-word",
                maxWidth: "30%", // Limit the width of the background for better appearance
                margin: "0 auto", // Center it horizontally within the parent container
              }}
            >
              <h3
                className="display-2 open-sans-bold text-uppercase"
                style={{
                  fontSize: "clamp(1.5rem, 4vw, 3.5rem)", // Responsive font size
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)", // Add subtle shadow for contrast
                  margin: 0,
                }}
              >
                PWD Cash Assistance
              </h3>
            </Carousel.Caption>
          </div>
        </div>
      </Carousel.Item>
    </Carousel>
  );
};

export default Services;
