"use client";

import { useRouter } from 'next/navigation';
import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import styles from "../GetFreeForm/GetFreeForm.module.css";
import Image from "next/image";
import arrowright from "../../../../../../public/arrowright.png";
import {
  feedbackFormStatuses as formStatuses,
  hubspotFormIds,
  ORIGINS,
} from "@/lib/constants";
import { mapHubspotData } from "@/lib/helpers/mapHubspotData";
import { submitHubspotForm } from "@/lib/api";

const GetFreeForm = ({ customerbg, title, desc }) => {

  const router = useRouter();
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
        // Redirect to the Thank You page
        router.push(ORIGINS.US + "/thank-you");
      }
    } catch (error) {
      setFormStatus(formStatuses.FAILED);
    }
  };

  return (
    <section
      style={{
        backgroundImage: `url(${customerbg.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className={styles.contactBg}
    >
      <Container>
        <Row>
          <Col xl={12} className={styles.rightSection}>
            <h2 className={styles.formTitle}>{title}</h2>
            <p className={styles.formSubtitle}>{desc}</p>
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

            {formStatus && (
              <div
                className={`${styles.formStatus} ${formStatus === formStatuses.SUCCESS
                    ? styles.success
                    : styles.failed
                  }`}
              >
                {formStatus === formStatuses.SUBMITTING && "Submitting..."}
                {formStatus === formStatuses.SUCCESS &&
                  "Thank you! Your submission was successful."}
                {formStatus === formStatuses.FAILED &&
                  "Oops! Something went wrong. Please try again."}
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default GetFreeForm;
