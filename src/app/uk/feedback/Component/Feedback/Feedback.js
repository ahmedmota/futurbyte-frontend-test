"use client";

import React, { useEffect } from "react";
import styles from "../Feedback/Feedback.module.css";
import { Row, Col, Image, Button, Form } from "react-bootstrap";
import feedbackBG from "../../../../../../public/feedback.svg";
import arrowright from "../../../../../../public/arrowrighttime.svg";
import { useState } from "react";
import rightmark from "../../../../../../public/rightmark.svg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import leftarr from "../../../../../../public/feedbackarrow.svg";
import rightarr from "../../../../../../public/feedbackpost.svg";
import {
  feedbackFormStatuses as formStatuses,
  hubspotFormIds,
  NOTIFICATION_TIMER_IN_MS,
  ORIGINS,
} from "@/lib/constants";
import { mapHubspotData } from "@/lib/helpers/mapHubspotData";
import { getData, getOriginData, submitHubspotForm } from "@/lib/api";

const Feedback = () => {
  const formInitialValues = {
    fullName: "",
    email: "",
    phone: "",
    subject: "Development Services",
    message: "",
  };
  const settings = {
    infinite: true,
    dots: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    nextArrow: <Image src={leftarr.src} alt="arrow" />,
    prevArrow: <Image src={rightarr.src} alt="arrow" />,
  };
  const [formData, setFormData] = useState(formInitialValues);
  const [formStatus, setFormStatus] = useState(null);
  const [feedback, setFeedback] = useState([]);
  const [consentCheck, setConsentCheck] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus(formStatuses.SUBMITTING);
    try {
      const formPayload = mapHubspotData(formData);
      const response = await submitHubspotForm(
        hubspotFormIds.FEEDBACK,
        formPayload
      );
      if (response.success) {
        setFormStatus(formStatuses.SUCCESS);
        setFormData(formInitialValues);
        setConsentCheck(false);
      }
    } catch (error) {
      setFormStatus(formStatuses.FAILED);
    }
  };

  useEffect(() => {
    if (formStatus && formStatus !== formStatuses.SUBMITTING) {
      setTimeout(() => {
        setFormStatus(null);
      }, NOTIFICATION_TIMER_IN_MS);
    }
  }, [formStatus]);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const data = await getOriginData(ORIGINS.UK,"/submit-feedback-heading?populate=*");
        setFeedback(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFeedback();
  }, []);
  return (
    <section>
      <Row className={`${styles.feedIcon} w-100`}>
        <Col
          xl={6}
          className={styles.bgImage}
          style={{
            backgroundImage: `url(${feedbackBG.src})`,
            backgroundSize: "cover",
          }}
        >
          <div className={styles.trusted}>
            <h3>{feedback.heading}</h3>
            <div className={styles.leading}>
              {feedback?.icons?.map((i) => (
                <Image
                  className="img-fluid"
                  src={i.url}
                  alt="iamge"
                  key={i.url}
                />
              ))}
            </div>
          </div>
          <div className={styles.testimonialcard}>
            <Slider {...settings} className="sliderSubmit">
              {feedback?.testimonials?.map((testimonial, index) => (
                <div key={index}>
                  <p>{testimonial.description}</p>
                  <h5>{testimonial.designation}</h5>
                  <h4>{testimonial.company_name}</h4>
                </div>
              ))}
            </Slider>
          </div>
        </Col>
        <Col xl={6} lg={12} className="p-0">
          <div className={styles.commets}>
            <h2>We want to know your comments!</h2>
            <div className={styles.formWrapper}>
              <Form onSubmit={handleSubmit} className={styles.sideicon}>
                <Row className="mb-3">
                  <Col md={12}>
                    <Form.Group controlId="fullName">
                      <Form.Control
                        type="text"
                        name="fullName"
                        placeholder="Full Name*"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        className={styles.firstNmae}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-2 gx-3 gy-3">
                  <Col md={6}>
                    <Form.Group controlId="email">
                      <Form.Control
                        type="email"
                        name="email"
                        placeholder="Email*"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className={styles.firstNmae}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="phone">
                      <Form.Control
                        type="tel"
                        name="phone"
                        placeholder="Phone Number*"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className={styles.firstNmae}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={12}>
                    <label className={`${styles.subject} mb-1`}>Subject</label>
                    <Form.Group controlId="subject">
                      <Form.Select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className={styles.firstoption}
                      >
                        <option value="Development Services">
                          Development Services
                        </option>
                        <option value="Design Services">Design Services</option>
                        <option value="Consultation">Consultation</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={12}>
                    <Form.Group controlId="message">
                      <Form.Control
                        as="textarea"
                        name="message"
                        placeholder="Message"
                        rows={3}
                        value={formData.message}
                        onChange={handleChange}
                        className={styles.firsttextarea}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className={`purposr mb-3`}>
                  <Col md={12}>
                    <Form.Group controlId="consent">
                      <Form.Check
                        type="checkbox"
                        label="I agree
                         to the Privacy Policy and give my permission to process my personal data for the purposes specified in the Privacy Policy."
                        className={styles.permission}
                        required
                        checked={consentCheck}
                        onChange={(e) => setConsentCheck(e.target.checked)}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={12}>
                    <Button type="submit" className={styles.sendmessage}>
                      Send Message
                      <Image
                        src={arrowright.src}
                        alt="arrow-right"
                        className="img-fluid"
                      />
                    </Button>
                  </Col>
                </Row>
                <Button type="submit" className={styles.sendmessageBottom}>
                  Send Message
                  <Image
                    src={arrowright.src}
                    alt="arrow-right"
                    className="img-fluid"
                  />
                </Button>
                {formStatus && formStatus !== formStatuses.FAILED && (
                  <div className={styles.formstatus}>
                    <Image
                      src={rightmark.src}
                      alt="rightmark"
                      className="img-fluid"
                    />
                    {formStatus}
                  </div>
                )}

                {formStatus && formStatus === formStatuses.FAILED && (
                  <div
                    className={`${styles.formstatus} ${styles.failedFormStatus}`}
                  >
                    <Image
                      src={rightmark.src}
                      alt="rightmark"
                      className="img-fluid"
                    />
                    {formStatus}
                  </div>
                )}
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    </section>
  );
};

export default Feedback;
