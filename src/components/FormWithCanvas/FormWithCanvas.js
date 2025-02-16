"use client";

import React, { useState } from "react";
import { Offcanvas, Row, Col } from "react-bootstrap";
import Image from "next/image";
import styles from "./style.module.css";
import { submitHubspotForm } from "@/lib/api"; // Import your API function
import { mapHubspotData } from "@/lib/helpers/mapHubspotData"; // Import your data mapping function
import { hubspotFormIds, feedbackFormStatuses as formStatuses } from "@/lib/constants"; // Import your form IDs
import { useRouter } from "next/navigation";

const FormWithCanvas = ({ showOffcanvas, handleCloseOffcanvas, handleShowOffcanvas }) => {
    const origin = typeof window !== "undefined" ? localStorage.getItem("currentOrigin") : "";

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

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormStatus(formStatuses.SUBMITTING);
        try {
            const formPayload = mapHubspotData(formData); // Map form data to Hubspot format
            const response = await submitHubspotForm(
                hubspotFormIds.GET_STARTED, // Use your form ID
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
                handleCloseOffcanvas();
                router.push(origin + "/thank-you");
            }
        } catch (error) {
            setFormStatus(formStatuses.FAILED);
            // alert("Form submission failed. Please try again."); // Replace with your error handling logic
        }
    };

    return (
        <>
            {/* Offcanvas containing the form */}
            <Offcanvas className="homeBannerForm" backdropClassName="banner-form" show={showOffcanvas} onHide={handleCloseOffcanvas} placement="end">
                <Offcanvas.Header className={styles.offcanvasHeader} closeButton>

                </Offcanvas.Header>
                <Offcanvas.Body className={styles.offcanvasBody}>
                    <Offcanvas.Title className={styles.formTitle}>
                        Let's connect to discuss <span className={styles.expert}>your project.</span>
                    </Offcanvas.Title>
                    <div>
                        <p className={styles.formSubtitle}>Fill out the below form</p>
                        <form onSubmit={handleSubmit} className={`${styles.form} formscrool`}>
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
                                <Image src="/arrowright.png" alt="" width={20} height={20} />
                            </button>
                        </form>
                    </div>
                </Offcanvas.Body>
                {formStatus && (
                    <div
                        className={`${styles['form-status-div']} ${styles.formStatus} ${formStatus === formStatuses.SUCCESS
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
            </Offcanvas>
        </>
    );
};

export default FormWithCanvas;