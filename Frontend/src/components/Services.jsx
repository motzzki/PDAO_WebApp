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
              height: "80vh", // Responsive height
              objectFit: "cover",
              filter: "blur(3px)", // Blur effect remains
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Carousel.Caption
              style={{
                color: "white",
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                padding: "10px 20px",
                borderRadius: "10px",
                textAlign: "center",
                wordWrap: "break-word",
                maxWidth: "80%", // Scales width based on screen size
              }}
            >
              <h3
                className="open-sans-bold text-uppercase"
                style={{
                  fontSize: "clamp(1.5rem, 4vw, 3.5rem)", // Responsive font size
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
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
              height: "80vh", // Responsive height
              objectFit: "cover",
              filter: "blur(3px)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Carousel.Caption
              style={{
                color: "white",
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                padding: "10px 20px",
                borderRadius: "10px",
                textAlign: "center",
                wordWrap: "break-word",
                maxWidth: "80%",
              }}
            >
              <h3
                className="open-sans-bold text-uppercase"
                style={{
                  fontSize: "clamp(1.5rem, 4vw, 3.5rem)",
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
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
              height: "80vh", // Responsive height
              objectFit: "cover",
              filter: "blur(3px)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Carousel.Caption
              style={{
                color: "white",
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                padding: "10px 20px",
                borderRadius: "10px",
                textAlign: "center",
                wordWrap: "break-word",
                maxWidth: "80%",
              }}
            >
              <h3
                className="open-sans-bold text-uppercase"
                style={{
                  fontSize: "clamp(1.5rem, 4vw, 3.5rem)",
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
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
