"use client";

import { useRouter } from 'next/navigation';
import React, { useState } from "react";
import styles from "@/components/GetStartedSection/GetStartedSection.module.css";
import { Container, Row, Col } from "react-bootstrap";
import arrowright from "../../../../../../public/arrowright.png";
import Image from "next/image";
import Link from "next/link";
import tick from "../../../../../../public/tick.png";
import tickHovered from "../../../../../../public/hover-pogo.svg";
import {
  feedbackFormStatuses as formStatuses,
  hubspotFormIds,
  ORIGINS,
} from "@/lib/constants";
import { mapHubspotData } from "@/lib/helpers/mapHubspotData";
import { submitHubspotForm } from "@/lib/api";

const GetStartedSection = ({
  heading,
  description,
  sub_heading,
  items,
  button_label,
  button_link,
}) => {
  const router = useRouter();

  const midIndex = Math.floor(items.length / 2);
  const firstHalf = items.slice(0, midIndex);
  const secondHalf = items.slice(midIndex);
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
        router.push(ORIGINS.UAE + "/thank-you");
      }
    } catch (error) {
      setFormStatus(formStatuses.FAILED);
    }
  };

  return (
    <section className={styles.getStartedSection}>
      <Container>
        <Row className="align-items-center ">
          <Col xl={6} className={styles.leftSection}>
            <h2 className="colorBlack font48 fw600">{heading}</h2>
            <p className="font18 fw400 colorGray">{description}</p>
            <h4 className="font22 fw600 colorBlack">{sub_heading}</h4>
            <div className="d-flex gap-3 ">
              <ul className={styles.benefitList}>
                {firstHalf.map((item, index) => {
                  return (
                    <li
                      key={item.id}
                      className="font18 fw500 colorBlackSeconday d-flex gap-2 align-items-center"
                      onMouseEnter={() => handleMouseEnter(item.id)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <Image
                        src={item.id === hoveredIndex ? tickHovered : tick}
                        alt="bulletList"
                        className="img-fluid"
                      />
                      {item.label}
                    </li>
                  );
                })}
                {secondHalf.map((item, index) => {
                  return (
                    <li
                      key={item.id}
                      className="font18 fw500 colorBlackSeconday d-flex gap-2 align-items-center"
                      onMouseEnter={() => handleMouseEnter(item.id)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <Image
                        src={item.id === hoveredIndex ? tickHovered : tick}
                        alt="bulletList"
                        className="img-fluid"
                      />
                      {item.label}
                    </li>
                  );
                })}
              </ul>
            </div>

            <Link
              className={styles.schedule}
              href={button_link ? ORIGINS.UAE + button_link : "#"}
            >
              {button_label}
              <Image src={arrowright} alt="" className="img-fluid" />
            </Link>
          </Col>

          <Col xl={6} className={styles.rightSection}>
            <h2 className={styles.formTitle}>
              Speak to an <span className={styles.expert}>Expert</span>
            </h2>
            <p className={styles.formSubtitle}>Fill out the below form</p>
            <form
              onSubmit={handleSubmit}
              className={`${styles.form} formscrool`}
            >
              <Row className="gx-3  gy-3">
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
              <p className="mb-0 font18 fw500">How Can I Help You With?</p>
              <select
                name="help_you"
                value={formData.help_you}
                onChange={handleChange}
                className={`${styles.select}`}
                required
              >
                <option value="">How Can I Help You With?</option>
                <option value="Custom Software Development">
                  Custom Software Development
                </option>
                <option value="Cloud Solutions">Cloud Solutions</option>
                <option value="Digital Transformation">
                  Digital Transformation
                </option>
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
