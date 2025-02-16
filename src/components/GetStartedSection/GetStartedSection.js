"use client";

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from "react";
import styles from "@/components/GetStartedSection/GetStartedSection.module.css";
import { Container, Row, Col } from "react-bootstrap";
import arrowright from "../../../public/arrowright.png";
import Image from "next/image";
import Link from "next/link";
import tick from "../../../public/tick.png";
import tickHovered from "../../../public/hover-pogo.svg";
import {
  feedbackFormStatuses as formStatuses,
  hubspotFormIds,
  NOTIFICATION_TIMER_IN_MS,
} from "@/lib/constants";
import { mapHubspotData } from "@/lib/helpers/mapHubspotData";
import { submitHubspotForm } from "@/lib/api";

const GetStartedSection = ({
  heading,
  description,
  subHeading,
  buttonLabel,
  buttonLink,
  benefits,
}) => {
  const origin = typeof window !== "undefined" ? localStorage.getItem("currentOrigin") : "";
  const router = useRouter();

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    company: "",
    company_email_address: "",
    help_you: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState(null);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

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
        hubspotFormIds.GET_STARTED,
        formPayload
      );
      if (response.success) {
        setFormStatus(formStatuses.SUCCESS);
        setFormData({
          firstname: "",
          lastname: "",
          phone: "",
          company: "",
          company_email_address: "",
          help_you: "",
          message: "",
        });
        router.push(origin + "/thank-you");
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

  return (
    <section className={styles.getStartedSection}>
      <Container className={styles["top-get-start-container"]}>
        <Row className={`align-items-center ${styles["top-get-start"]}`}>
          <Col xl={6} className={styles.leftSection}>
            <h2 className="colorBlack font48 fw600">{heading}</h2>
            <p className="font18 fw400 colorGray">{description}</p>
            <h4 className="font22 fw600 colorBlack">{subHeading}</h4>
            <div className="d-flex gap-3">
              <ul className={styles.benefitList}>
                {benefits?.length &&
                  benefits.map((b, index) => (
                    <li
                      key={b.label}
                      className={`font18 fw500 colorBlackSeconday d-flex gap-2 align-items-center  ${hoveredIndex === index ? styles.activeTab : ""
                        }`}
                      onMouseEnter={() => handleMouseEnter(b.id)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <Image
                        src={b.id === hoveredIndex ? tickHovered : tick}
                        alt="bulletLists"
                        className="img-fluid"
                      />
                      {b.label}
                    </li>
                  ))}
              </ul>
            </div>

            {buttonLabel && (
              <Link
                className={styles.schedule}
                href={buttonLink ? buttonLink : "#"}
              >
                {buttonLabel}
                <Image src={arrowright} alt="" className="img-fluid" />
              </Link>
            )}
          </Col>

          <Col xl={6} className={styles.rightSection}>
            <h2 className={styles.formTitle}>
              Let's connect to discuss <span className={styles.expert}>your project.</span>
            </h2>
            <p className={styles.formSubtitle}>Fill out the below form</p>
            <form
              onSubmit={handleSubmit}
              className={`${styles.form} formscrool`}
            >
              <Row className="gx-3 gy-3">
                <Col md={6} className={styles.inputGroup}>
                  <input
                    type="text"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                    placeholder="First Name*"
                    required
                  />
                </Col>
                <Col md={6} className={styles.inputGroup}>
                  <input
                    type="text"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                    placeholder="Last Name*"
                    required
                  />
                </Col>
              </Row>
              <Row className="gx-3 gy-3">
                <Col md={6} className={styles.inputGroup}>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone*"
                    required
                  />
                </Col>
                <Col md={6} className={styles.inputGroup}>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Company Name*"
                    required
                  />
                </Col>
              </Row>

              <input
                type="email"
                name="company_email_address"
                value={formData.company_email_address}
                onChange={handleChange}
                placeholder="Company email address*"
                required
              />
              <p className="mb-0 font18 fw500">How can we help you?</p>
              <select
                name="help_you"
                value={formData.help_you}
                onChange={handleChange}
                className={`${styles.select}`}
                required
              >
                <option value="">How can we help you?</option>
                <option value="App Development">App Development</option>
                <option value="Web Development">Web Development</option>
                <option value="Cloud Solution">Cloud Solution</option>
                <option value="Custom Solution">Custom Solution</option>
                <option value="Digital Transformation">Digital Transformation</option>
                <option value="SEO">SEO</option>
                <option value="Others">Others</option>
              </select>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Message"
                rows="4"
                className="mb-3"
                required
              ></textarea>
              <button type="submit" className={styles.submitButton}>
                Submit Details
                <Image src={arrowright} alt="" className="img-fluid" />
              </button>
            </form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default GetStartedSection;
