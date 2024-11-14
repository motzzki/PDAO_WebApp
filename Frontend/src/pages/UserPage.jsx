import React, { useState, useEffect } from "react";
import { useAuth } from "../layout/AuthContext.jsx";
import FooterUser from "../components/UserFooter";
import hehe from "../images/hehe.jpg";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Image,
  Badge,
  Card,
  Modal,
} from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import { host } from "../apiRoutes";

const UserPage = () => {
  const { auth } = useAuth();
  const [isFeedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [ratings, setRatings] = useState({
    question1: 0,
    question2: 0,
    question3: 0,
    question4: 0,
    question5: 0,
  });
  const [openFeedback, setOpenFeedback] = useState("");
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    console.log(auth.user)
    setProfileData(auth.user);
  }, [auth]);

  const handleModalClose = () => setFeedbackModalOpen(false);
  const handleModalOpen = () => setFeedbackModalOpen(true);

  const handleRatingChange = (question, rating) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [question]: rating,
    }));
  };

  // Handler for open-ended feedback
  const handleFeedbackChange = (event) => {
    setOpenFeedback(event.target.value);
  };

  // Navigate between pages
  const nextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setPage((prevPage) => prevPage - 1);
  };

  const handleReset = () => {
    // Reset ratings to initial values
    setRatings({
      question1: 0,
      question2: 0,
      question3: 0,
      question4: 0,
      question5: 0,
    });
  
    // Reset openFeedback to an empty string
    setOpenFeedback("");
  
    // Optionally reset the page if you're using multi-step form
    setPage(1);
  };

  const handleSubmitFeedback = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `You want to submit this feedback?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
    });

    if (!result) {
      return;
    }

    try {
      await axios.post(`${host}/api/pwdInfo/submit-feedback`, {
        userId: profileData.id,
        ratings,
        openFeedback
      });

      await Swal.fire(
        "Thank You!",
        `Your feedback has been submitted.`,
        "success"
      );

      handleReset();
      handleModalClose();
    } catch (err) {
      console.log(err)
      Swal.fire(
        "Error!",
        "Failed to submit feedback. Please try again.",
        "error"
      );
    }
  };
  
  return (
    <div className="userpage-container">
      <main>
        <Container>
          <Row className="user-header mb-4">
            <Image
              src={`https://placehold.co/600x300/000000/FFF`}
              fluid
              className="w-100 h-100"
              style={{ objectFit: "cover" }}
              alt="Responsive"
            />
          </Row>

          <Row className="userinfo mb-5">
            <Col lg={8} md={6} className="px-3">
              <h1 className="text-center open-sans-bold mb-3">
                RA No. 7277: Magna Carta for Disabled Persons
              </h1>
              <p className="open-sans-regular fs-5">
                Republic Act No. 7277, otherwise known as the Magna Carta for
                Disabled Persons, was enacted to ensure that persons with
                disabilities have the same rights as all individuals. This
                measure promotes their full participation and integration into
                society. The law clearly articulates the government’s
                responsibility to guarantee equal opportunities and access to
                health services for persons with disabilities.
              </p>
              <p className="open-sans-regular fs-5">
                However, the ideals and goals outlined in Republic Act No.
                7277—such as providing a comprehensive range of accessible
                services—cannot be fully realized without establishing an office
                in every local government unit to address the needs of persons
                with disabilities. Hence, the creation of the Persons with
                Disabilities Affairs Office (PDAO) in every province, city, and
                municipality is essential.
              </p>
              <p className="open-sans-regular fs-5">
                This office will formulate a master plan to institutionalize a
                national health program for persons with disabilities, aiming to
                enhance the delivery of health services to be more comprehensive
                and efficient. Currently, no office exists to cater specifically
                to the needs of persons with disabilities within local
                government units. In summary, this bill seeks to establish a
                PDAO in every province, city, and municipality.
              </p>
            </Col>
            <Col lg={4} md={6} className="my-3">
              <Card className="mb-4">
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Text>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Officia voluptates magnam tempora omnis saepe ducimus
                    corrupti distinctio voluptate dolorem, asperiores
                    consequuntur maiores impedit qui tempore!
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
              <Card className="mb-4">
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Text>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Labore minus laudantium mollitia neque enim totam quidem
                    voluptatibus maiores corrupti, non, dolore minima ex,
                    suscipit delectus.
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row className="about mb-5">
            <Col className="text-center">
              <h1>About Us</h1>
              <p className="my-3 open-sans-regular fs-5">
                The Persons with Disabilities Affairs Office (PDAO) is dedicated
                to promoting the rights and welfare of persons with disabilities
                (PWDs) in our community. Our mission is to foster an inclusive
                environment where PWDs can fully participate in society, access
                essential services, and lead empowered lives.
              </p>
              <p className="my-3 open-sans-regular fs-5">
                We advocate for their needs, facilitate programs for education
                and employment, and work closely with local government and
                organizations to ensure that PWDs receive the support they
                deserve. Together, we strive to break barriers and create a
                society that values and respects every individual.
              </p>
            </Col>
          </Row>

          <Row className="contact-us mb-5">
            <Col className="text-center">
              <h1 className="mb-3">Contact Us</h1>
              <h4 className="open-sans-regular">
                <Badge bg="danger">pdaocabuyaocity2024@gmail.com</Badge>
              </h4>
              <h4>
                <Badge bg="danger">
                  P. Burgos St. (in front of St. Claire Church) Brgy. Poblacion
                  Uno 4025 Cabuyao, Philippines
                </Badge>
              </h4>
              <Form className="mt-4">
                <Form.Group controlId="message" className="mb-3">
                  <Form.Label>Message</Form.Label>
                  <Form.Control as="textarea" rows={4} required />
                </Form.Group>
                <div className="d-flex justify-content-center">
                  <Button variant="danger" type="submit">
                    Send Message
                  </Button>
                </div>
              </Form>
              <h1 className="mb-3 mt-3">Submit a Feedback</h1>
              <h4 className="open-sans-regular">
                <Button variant="danger" onClick={handleModalOpen}>
                  Submit a Feedback
                </Button>
              </h4>
            </Col>
          </Row>

          {/* Feedback Multi-Page Form */}
        <Modal show={isFeedbackModalOpen} onHide={() => { handleReset(); setFeedbackModalOpen(false); }}>
          <Modal.Header>
            <Modal.Title>Feedback Form</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              {/* Page 1: Questions 1 and 2 */}
              {page === 1 && (
                <div>
                  <div className="mb-4">
                    <p>How would you rate our service?</p>
                    <div className="star-rating">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          className={`star ${
                            ratings.question1 >= star ? "filled" : ""
                          }`}
                          onClick={() => handleRatingChange("question1", star)}
                        >
                          &#9733;
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <p>How would you rate the quality of our support?</p>
                    <div className="star-rating">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          className={`star ${
                            ratings.question2 >= star ? "filled" : ""
                          }`}
                          onClick={() => handleRatingChange("question2", star)}
                        >
                          &#9733;
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Page 2: Questions 3 and 4 */}
              {page === 2 && (
                <div>
                  <div className="mb-4">
                    <p>How would you rate our website's user experience?</p>
                    <div className="star-rating">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          className={`star ${
                            ratings.question3 >= star ? "filled" : ""
                          }`}
                          onClick={() => handleRatingChange("question3", star)}
                        >
                          &#9733;
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <p>How would you rate the clarity of the information provided?</p>
                    <div className="star-rating">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          className={`star ${
                            ratings.question4 >= star ? "filled" : ""
                          }`}
                          onClick={() => handleRatingChange("question4", star)}
                        >
                          &#9733;
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Page 3: Question 5 and Open Feedback */}
              {page === 3 && (
                <div>
                  <div className="mb-4">
                    <p>How likely are you to recommend us to others?</p>
                    <div className="star-rating">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          className={`star ${
                            ratings.question5 >= star ? "filled" : ""
                          }`}
                          onClick={() => handleRatingChange("question5", star)}
                        >
                          &#9733;
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <Form.Group controlId="openFeedback">
                      <Form.Label>Any other comments or suggestions?</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        value={openFeedback}
                        onChange={handleFeedbackChange}
                        placeholder="Your feedback here..."
                      />
                    </Form.Group>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="d-flex justify-content-between">
                {page > 1 && (
                  <Button variant="secondary" onClick={prevPage}>
                    Back
                  </Button>
                )}
                {page < 3 ? (
                  <Button variant="danger" onClick={nextPage}>
                    Next
                  </Button>
                ) : (
                  <Button variant="danger" onClick={handleSubmitFeedback}>
                    Submit Feedback
                  </Button>
                )}
              </div>
            </Form>
          </Modal.Body>
        </Modal>
        </Container>
        <FooterUser />
      </main>
    </div>
  );
};

export default UserPage;
