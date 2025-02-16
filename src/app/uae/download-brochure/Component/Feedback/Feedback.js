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
  attachments,
  brochureFormStatuses as formStatuses,
  hubspotFormIds,
  NOTIFICATION_TIMER_IN_MS,
  ORIGINS,
} from "@/lib/constants";
import { mapHubspotData } from "@/lib/helpers/mapHubspotData";
import { getData, getOriginData, postInternalAPI, submitHubspotForm } from "@/lib/api";

const Feedback = () => {
  const formInitialValues = {
    full_name: "",
    email: "",
    phone: "",
  };

  const consentInitialValues = {
    consent: false,
    promotion: false,
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

  const [formStatus, setFormStatus] = useState(null);
  const [consentChecks, setConsentChecks] = useState(consentInitialValues);
  const [feedback, setFeedback] = useState([]);
  const [formData, setFormData] = useState(formInitialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleConsentChange = (e) => {
    const { name, checked } = e.target;
    setConsentChecks((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus(formStatuses.SUBMITTING);
    try {
      const formPayload = mapHubspotData(formData);
      const attachmentPayload = {
        name: "Brochure.pdf",
        path: attachments.BROCHURE,
      };
      const [hubspotResponse, emailResponse] = await Promise.all([
        submitHubspotForm(hubspotFormIds.DOWNLOAD_BROCHURE, formPayload),
        postInternalAPI(
          "/email",
          JSON.stringify({
            name: formData.full_name,
            to: formData.email,
            attachments: [attachmentPayload],
          })
        ),
      ]);
      if (hubspotResponse.success && emailResponse.success) {
        setFormStatus(formStatuses.SUCCESS);
        setFormData(formInitialValues);
        setConsentChecks({ ...consentInitialValues });
      } else {
        throw new Error();
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
        const data = await getOriginData(ORIGINS.UAE,"/download-our-broucher-heading?populate=*");
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
            <h2>Download Our Brochure</h2>
            <div className={styles.formWrapper}>
              <Form onSubmit={handleSubmit} className={styles.sideicon}>
                <Row className="mb-3">
                  <Col md={12}>
                    <Form.Group controlId="full_name">
                      <Form.Control
                        type="text"
                        name="full_name"
                        placeholder="Full Name*"
                        value={formData.full_name}
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

                <Row className={`purposr mt-3 mb-2`}>
                  <Col md={12}>
                    <Form.Group controlId="consent">
                      <Form.Check
                        key={consentChecks.consent}
                        type="checkbox"
                        checked={consentChecks.consent}
                        name="consent"
                        onChange={handleConsentChange}
                        label="I have read and agree to the Privacy Policy and Terms & Conditions, and consent to the processing of my data."
                        className={styles.permission}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className={`purposr mb-3`}>
                  <Col md={12}>
                    <Form.Group controlId="promotion">
                      <Form.Check
                        type="checkbox"
                        checked={consentChecks.promotion}
                        onChange={handleConsentChange}
                        name="promotion"
                        label="I agree to receive updates, promotional emails, and other communications as per the company’s policy."
                        className={styles.permission}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <Button type="submit" className={styles.sendmessage}>
                      Download
                      <Image
                        src={arrowright.src}
                        alt="arrow-right"
                        className="img-fluid"
                      />
                    </Button>
                  </Col>
                </Row>
                <Button type="submit" className={styles.sendmessageBottom}>
                  Download
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
