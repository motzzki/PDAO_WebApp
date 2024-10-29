import React, { useState, useEffect } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { useAuth } from "../layout/AuthContext";
import HelpCard from "../components/HelpCard";
import { cardData } from "../helpCardDate.jsx";

const PwdInfo = () => {
  const { getLoggedUser } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getLoggedUser();
        setProfileData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [getLoggedUser]);

  // Handle loading and error states
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!profileData) return <div>No profile data available.</div>;

  // Prepare profile fields
  const profileFields = [
    { label: "First Name", value: profileData.first_name || "N/A" },
    { label: "Middle Name", value: profileData.middle_name || "N/A" },
    { label: "Last Name", value: profileData.last_name || "N/A" },
    { label: "Email", value: profileData.email || "N/A" },
    { label: "Blood Type", value: profileData.blood_type || "N/A" },
    { label: "Contact Number", value: profileData.contact_num || "N/A" },
    {
      label: "Age",
      value: profileData.age ? `${profileData.age} years` : "N/A",
    },
    { label: "Gender", value: profileData.gender || "N/A" },
    {
      label: "Date of Birth",
      value: profileData.date_of_birth
        ? new Date(profileData.date_of_birth).toLocaleDateString()
        : "N/A",
    },
  ];

  // Prepare background fields
  const backgroundFields = [
    { label: "Disability Type", value: profileData.disability_status || "N/A" },
    { label: "Cause of Disability", value: profileData.cause_status || "N/A" },
    { label: "Civil Status", value: profileData.civilStatus || "N/A" },
    {
      label: "Educational Status",
      value: profileData.educational_status || "N/A",
    },
    {
      label: "Employment Status",
      value: profileData.employment_status || "N/A",
    },
    { label: "Occupation", value: profileData.occupation_name || "N/A" },
    { label: "Barangay", value: profileData.barangay || "N/A" },
    { label: "House Address", value: profileData.house_address || "N/A" },
  ];

  const disabilityType = profileData.disability_status || "N/A";

  const helpCardData = cardData[disabilityType]
    ? {
        title: cardData[disabilityType].title,
        img: cardData[disabilityType].img,
        text: cardData[disabilityType].text,
        link: cardData[disabilityType].link,
      }
    : {
        title: "No Help Available",
        img: cardData.img,
        text: "No information available for this disability type.",
        link: "#",
      };

  return (
    <div className="d-grid gap-5">
      <div className="container">
        <Card className="shadow-lg border-0 rounded mt-3">
          <Card.Header className="outer-card text-white text-center py-4">
            <h4 className="mb-0 open-sans-bold">My Profile</h4>
          </Card.Header>
          <Card.Body>
            <Row className="d-flex">
              <Col md={6} className="mb-4">
                <Card className="inner-card flex-grow-1">
                  <Card.Header className="custom-danger text-white py-3">
                    <h5 className="mb-0">Personal Information</h5>
                  </Card.Header>
                  <Card.Body>
                    {profileFields.map((field, index) => (
                      <div key={index} className="mb-3">
                        <strong className="open-sans-bold">
                          {field.label}:
                        </strong>{" "}
                        <span className="text-muted open-sans-regular">
                          {field.value}
                        </span>
                      </div>
                    ))}
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6} className="mb-4">
                <Card className="inner-card flex-grow-1">
                  <Card.Header className="custom-danger text-white py-3">
                    <h5 className="mb-0">Background Status</h5>
                  </Card.Header>
                  <Card.Body>
                    {backgroundFields.map((field, index) => (
                      <div key={index} className="mb-3">
                        <strong className="open-sans-bold">
                          {field.label}:
                        </strong>{" "}
                        <span className="text-muted open-sans-regular">
                          {field.value}
                        </span>
                      </div>
                    ))}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </div>

      <div className="container">
        <h1 className="text-center open-sans-bold mb-3">Help</h1>
        <HelpCard
          title={helpCardData.title}
          img={helpCardData.img}
          text={helpCardData.text}
          link={helpCardData.link}
        />
      </div>
    </div>
  );
};

export default PwdInfo;
