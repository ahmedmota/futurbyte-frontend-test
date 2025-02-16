"use client";

// components/SubmitEForm.js
import React, { useState } from "react";
import styles from "./SubmitEForm.module.css";
import Image from "next/image";
import closeCircle from "../../../../../../public/close-circle.svg";
import documentIcon from "./../../../../../../public/document-icon.svg";
import { Button, Form } from "react-bootstrap";
import { submitHubspotForm } from "@/lib/api";
import { hubspotFormIds } from "@/lib/constants";
import successTick from "./../../../../../../public/success-tick.svg";

const SubmitEForm = ({ isOpen, onClose, title, openShowValues, children }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false); // Track success message visibility

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        fields: [
          { name: "full_name", value: formData.name },
          { name: "email", value: formData.email },
          { name: "phone", value: formData.phone },
          { name: "message", value: formData.message },
        ],
      };

      const response = await submitHubspotForm(
        hubspotFormIds.ESTIMATE_FORM,
        payload
      );

      if (response.success) {
        setFormData({ name: "", email: "", phone: "", message: "" });

        // Show success message for 2 seconds
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          onClose(); // Close modal after 2 seconds
        }, 1500);

        openShowValues();
      } else {
        alert("Failed to submit form. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div
      className={`modal fade  ${isOpen ? "show" : ""}`}
      style={{
        display: isOpen ? "block" : "none",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
      tabIndex="-1"
    >
      <div className={`modal-dialog ${styles["submit-e-form"]}`}>
        <button
          className={styles["submit-form-form-close-btn"]}
          type="button"
          onClick={(e) => {
            e.stopPropagation(); // Prevent event from bubbling to modal container
            onClose();
          }}
        >
          <Image
            src={closeCircle.src}
            width={24}
            height={24}
            alt="close-circle"
          />
        </button>
        <div
          className={`modal-content ${styles["submit-e-form-modal-content"]}`}
        >
          <div className={styles["modal-body"]}>
            <Image
              src={documentIcon.src}
              width={80}
              height={80}
              alt="document-icon"
              className={styles["document-icon"]}
            />
            <div className={styles["modal-body-text-div"]}>
              <p>
                Enter Data To Get a{" "}
                <span>Detailed Breakdown of Your App Cost.</span>
              </p>
              <span>Let&apos;s discuss your project today.</span>
            </div>
            <div className={styles["modal-e-form"]}>
              <Form onSubmit={handleSubmit}>
                <div className={styles["first-form-line"]}>
                  <Form.Group className="mb-3" controlId="formName">
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Name*"
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email*"
                      required
                    />
                  </Form.Group>
                </div>
                <Form.Group className="mb-3" controlId="formPhone">
                  <Form.Control
                    type="number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone*"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formMessage">
                  <Form.Control
                    as="textarea"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Message"
                  />
                </Form.Group>
                <Button type="submit" className={styles["submit-e-form-btn"]}>
                  Submit
                </Button>
              </Form>
            </div>
          </div>
        </div>
        {isSubmitted && (
          <div className={styles["success-tick-main"]}>
            <div className={`${styles["success-tick"]}`}>
              <Image
                width={24}
                height={24}
                alt="success-tick"
                src={successTick.src}
              />
              <p>Successfully Submitted</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubmitEForm;
