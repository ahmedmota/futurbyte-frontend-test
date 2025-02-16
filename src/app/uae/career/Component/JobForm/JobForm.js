"use client";

import cross from "../../../../../../public/cross.svg";
import Offcanvas from "react-bootstrap/Offcanvas";
import uplaod from "../../../../../../public/uplaod.svg";
import { useEffect, useState } from "react";
import styles from "../JobDetails/JobDetails.module.css";
import { Col, Row, Image } from "react-bootstrap";
import arrowright from "../../../../../../public/arrowrighttime.svg";
import { postInternalAPI, submitHubspotForm } from "@/lib/api";
import { mapHubspotData } from "@/lib/helpers/mapHubspotData";
import {
  jobFormStatuses as formStatuses,
  hubspotFormIds,
  NOTIFICATION_TIMER_IN_MS,
} from "@/lib/constants";
import { isFileWithinSizeLimit } from "@/lib/helpers/checkIsFileWithinSizeLimit";
import rightmark from "../../../../../../public/rightmark.svg";

const JobForm = ({ show, setShow }) => {
  const formInitialValues = {
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    country: "",
    state: "",
    place: "",
    apply_for: "",
    designation: "",
    year_of_experience: "",
    message: "",
    attachment: null,
  };

  const [formStatus, setFormStatus] = useState();
  const [formData, setFormData] = useState(formInitialValues);
  const [consentCheck, setConsentCheck] = useState(false);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!isFileWithinSizeLimit(file)) {
      return setFormStatus(formStatuses.FAILED);
    }
    setFormData((pre) => ({ ...pre, attachment: file }));
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
      const attachment = await getFileURL();
      const formPayload = mapHubspotData({ ...formData, attachment });
      const response = await submitHubspotForm(
        hubspotFormIds.CAREER,
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
  const getFileURL = async () => {
    const fileForm = new FormData();
    fileForm.append("file", formData.attachment);
    try {
      const response = await postInternalAPI("/upload", fileForm);
      if (response.success) {
        return response.data.fileURL;
      }
    } catch (err) {
      throw new Error(err);
    }
  };

  useEffect(() => {
    if (formStatus && formStatus !== formStatuses.SUBMITTING) {
      setTimeout(() => {
        setFormStatus(null);
      }, NOTIFICATION_TIMER_IN_MS);
    }
  }, [formStatus]);
  const handleClose = () => setShow(false);

  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      placement={"end"}
      className="OffcanvasMindset"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
          <h5 className={styles.seeMore}>We See You, Not Your CV!</h5>
          <Image
            onClick={handleClose}
            src={cross.src}
            alt="cross"
            className="img-fluid"
          />
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <form className="form-container" onSubmit={handleSubmit}>
          <Row className={`${styles.inputFiled} gx-3 gy-4 m-0`}>
            <Col xl={6}>
              <input
                className="form-input"
                type="text"
                name="firstname"
                placeholder="First Name*"
                value={formData.firstname}
                onChange={handleChange}
                required
              />
            </Col>
            <Col xl={6}>
              <input
                className="form-input"
                type="text"
                name="lastname"
                placeholder="Last Name*"
                value={formData.lastname}
                onChange={handleChange}
                required
              />
            </Col>

            <Col xl={6}>
              <input
                className="form-input"
                type="email"
                name="email"
                placeholder="Email*"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Col>
            <Col xl={6}>
              <input
                className="form-input"
                type="tel"
                name="phone"
                placeholder="Phone Number*"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </Col>
            <Col xl={6}>
              <select
                className={`${styles.selse} form-select`}
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
              >
                <option value="">Country*</option>
                <option value="USA">USA</option>
                <option value="Canada">Canada</option>
              </select>
            </Col>
            <Col xl={6}>
              <select
                className={`${styles.selse} form-select`}
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
              >
                <option value="">Select State*</option>
                <option value="New York">New York</option>
                <option value="California">California</option>
              </select>
            </Col>

            <Col xl={6}>
              <input
                className="form-input"
                type="text"
                name="place"
                placeholder="Place*"
                value={formData.place}
                onChange={handleChange}
                required
              />
            </Col>
            <Col xl={6}>
              <select
                className={`${styles.selse} form-select`}
                name="apply_for"
                value={formData.apply_for}
                onChange={handleChange}
                required
              >
                <option value="">Applying For*</option>
                <option value="Developer">Developer</option>
                <option value="Designer">Designer</option>
              </select>
            </Col>

            <Col xl={6}>
              <div className={styles.customselectwrapper}>
                <select
                  className={`${styles.selse} form-select`}
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  required
                >
                  <option value="">Designation*</option>
                  <option value="Manager">Manager</option>
                  <option value="Team Lead">Team Lead</option>
                </select>
              </div>
            </Col>
            <Col xl={6}>
              <input
                className="form-input"
                type="text"
                name="year_of_experience"
                placeholder="Year of Experience*"
                value={formData.year_of_experience}
                onChange={handleChange}
                required
              />
            </Col>
            <Col xl={12}>
              <textarea
                className="form-textarea"
                name="message"
                placeholder="Enter Message*"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </Col>
            <Col xl={12}>
              <button className={styles.submit} type="submit">
                Submit
                <Image src={arrowright.src} className="img-fluid" alt="arrow" />
              </button>
            </Col>
            <Col xl={12}>
              <div className={styles.attachmentContainer}>
                <label className={styles.attachmentLabel}>
                  <Image src={uplaod.src} alt="upload" className="img-fluid" />
                  <input
                    type="file"
                    name="attachment"
                    accept=".pdf,.doc,.png,.jpeg,.docx"
                    className={styles.attachmentInput}
                    onChange={handleFileChange}
                    required
                  />
                  <div className={styles.postupload}>
                    <h3>Add an attachment*</h3>
                    <p> Max. 10MB. (Type: pdf, doc, png, jpeg, docx)</p>
                  </div>

                  <div>
                    {formData.attachment && <p> {formData.attachment.name}</p>}
                  </div>
                </label>
              </div>
            </Col>
            <Col xl={12}>
              <div className={styles.formconsent}>
                <input
                  type="checkbox"
                  required
                  className="form-check-input"
                  checked={consentCheck}
                  onChange={(e) => setConsentCheck(e.target.checked)}
                />
                <p className={styles.consent}>
                  I have read the privacy policy and consent to the processing
                  of my data for the purpose of handling my enquiry
                </p>
              </div>
            </Col>
          </Row>

          {!!formStatus && (
            <div className={styles.formstatus}>
              <Image
                src={rightmark.src}
                alt="rightmark"
                className="img-fluid"
              />
              {formStatus}
            </div>
          )}
        </form>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default JobForm;
