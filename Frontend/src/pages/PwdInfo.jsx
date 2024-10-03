import React, { useState, useEffect } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { useAuth } from '../layout/AuthContext';

const PwdInfo = () => {
    const { getLoggedUser } = useAuth();
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const data = await getLoggedUser();
                console.log(data); // Log the fetched data
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
        { label: "First Name", value: profileData.first_name || 'N/A' },
        { label: "Middle Name", value: profileData.middle_name || 'N/A' },
        { label: "Last Name", value: profileData.last_name || 'N/A' },
        { label: "Email", value: profileData.email || 'N/A' },
        { label: "Blood Type", value: profileData.blood_type || 'N/A' },
        { label: "Contact Number", value: profileData.contact_num || 'N/A' },
        { label: "Age", value: profileData.age ? `${profileData.age} years` : 'N/A' },
        { label: "Gender", value: profileData.gender || 'N/A' },
        { label: "Date of Birth", value: profileData.date_of_birth ? new Date(profileData.date_of_birth).toLocaleDateString() : 'N/A' },
    ];

    // Prepare background fields
    const backgroundFields = [
        { label: "Disability Type", value: profileData.disability_status || 'N/A' },
        { label: "Cause of Disability", value: profileData.cause_status || 'N/A' },
        { label: "Civil Status", value: profileData.civilStatus || 'N/A' },
        { label: "Educational Status", value: profileData.educational_status || 'N/A' },
        { label: "Employment Status", value: profileData.employment_status || 'N/A' },
        { label: "Occupation", value: profileData.occupation_name || 'N/A' },
        { label: "Barangay", value: profileData.barangay || 'N/A' },
        { label: "House Address", value: profileData.house_address || 'N/A' },
    ];

    // Split the background fields into two equal columns
    const midIndex = Math.ceil(backgroundFields.length / 2);
    const leftBackgroundFields = backgroundFields.slice(0, midIndex);
    const rightBackgroundFields = backgroundFields.slice(midIndex);

    return (
        <div className='d-grid gap-5'>
            <div className="container">
                <Card className="shadow-lg border-0 rounded mt-3">
                    <Card.Header className="bg-danger text-white text-center py-3">
                        <h4>My Profile</h4>
                    </Card.Header>
                    <Card.Body>
                        <Row>
                            <Col sm={6} className="mb-4">
                                {profileFields.slice(0, 5).map((field, index) => (
                                    <p key={index}>
                                        <strong>{field.label}:</strong> <span className="text-muted">{field.value}</span>
                                    </p>
                                ))}
                            </Col>
                            <Col sm={6} className="mb-4">
                                {profileFields.slice(5).map((field, index) => (
                                    <p key={index}>
                                        <strong>{field.label}:</strong> <span className="text-muted">{field.value}</span>
                                    </p>
                                ))}
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </div>

            <div className="container">
                <Card className="shadow-lg border-0 rounded ">
                    <Card.Header className="bg-danger text-white text-center py-3">
                        <h4>Background Status</h4>
                    </Card.Header>
                    <Card.Body>
                        <Row>
                            <Col sm={6} className="mb-4">
                                {leftBackgroundFields.map((field, index) => (
                                    <p key={index}>
                                        <strong>{field.label}:</strong> <span className="text-muted">{field.value}</span>
                                    </p>
                                ))}
                            </Col>
                            <Col sm={6} className="mb-4">
                                {rightBackgroundFields.map((field, index) => (
                                    <p key={index}>
                                        <strong>{field.label}:</strong> <span className="text-muted">{field.value}</span>
                                    </p>
                                ))}
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </div>

            <div className="container">
                <Card className="shadow-lg border-0 rounded ">
                    <Card.Header className="bg-danger text-white text-center py-3">
                        <h4>Help!</h4>
                    </Card.Header>
                    <Card.Body>
                       <h1>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus, veniam corporis! Labore iure dolorem provident officia et quisquam voluptatibus, mollitia accusantium voluptate eum ipsa. Corporis quos reprehenderit facilis necessitatibus eveniet!</h1>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}

export default PwdInfo;
