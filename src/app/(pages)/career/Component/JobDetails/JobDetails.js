"use client";
import React, { useState } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import styles from "../JobDetails/JobDetails.module.css";
import Link from "next/link";
import arrowright from "../../../../../../public/arrowrighttime.svg";
import meta from "../../../../../../public/meta.svg";
import linkdin from "../../../../../../public/in.svg";
import copy from "../../../../../../public/copy.svg";
import { getFormattedDate } from "@/lib/helpers";
import JobForm from "../JobForm/JobForm";
import { usePathname } from "next/navigation";

const JobDetails = ({ data }) => {
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  const copyJob = async () => {
    const fullUrl = `${process.env.NEXT_PUBLIC_FE_ORIGIN}/${pathname}`;
    await navigator.clipboard.writeText(fullUrl);
  };

  return (
    <section className={styles.dubai}>
      <Container className={styles.jobDetails}>
        <Row className={styles.school}>
          <Col xl={8} md={12} className={styles.spacingLayout}>
            <div className={styles.applyNow}>
              <h3 className="w-75">{data.job_title}</h3>
              <Link href="#" onClick={handleShow}>
                {data.apply_now_button_label}
                <Image
                  alt="arrowright"
                  src={arrowright.src}
                  className="img-fluid"
                />
              </Link>
            </div>
            <div className={styles.applynowset}>
              <div className={styles.engineer}>
                <p>share</p>
                <Link href={data.facebook_url || "#"}>
                  <Image src={meta.src} alt="meta" className="img-fluid" />
                </Link>
                <Link href={data.linkedin_url || "#"}>
                  <Image src={linkdin.src} alt="meta" className="img-fluid" />
                </Link>
                <Link href="#">
                  <Image
                    src={copy.src}
                    alt="meta"
                    className="img-fluid"
                    onClick={copyJob}
                  />
                </Link>
              </div>
              <div className={styles.overview}>
                <p>
                  <span>Posted</span>
                  {getFormattedDate(data.publishedAt)}
                </p>
              </div>
            </div>
            <div className={styles.brief}>
              <div>
                {data.country && <p>{data.country}</p>}
                {data.city && <h4>{data.city}</h4>}
              </div>
              {data.experience && (
                <div className={styles.experiencequiet}>
                  <p>Experience</p>
                  <h4>{data.experience}</h4>
                </div>
              )}
              {data.work_level && (
                <div className={styles.experienceLevel}>
                  <p>Work Level</p>
                  <h4>{data.work_level}</h4>
                </div>
              )}
              {data.employee_type && (
                <div>
                  <p>Employee Type</p>
                  <h4>{data.employee_type}</h4>
                </div>
              )}
            </div>
            {data.job_description && (
              <div
                className={styles.jobover}
                dangerouslySetInnerHTML={{ __html: data.job_description }}
              ></div>
            )}
          </Col>
        </Row>
      </Container>

      <JobForm show={show} setShow={setShow} />
      <div className={styles.applyNowBottom}>
        <Link href="#" onClick={handleShow}>
          {data.apply_now_button_label}
          <Image alt="arrowright" src={arrowright.src} className="img-fluid" />
        </Link>
      </div>
    </section>
  );
};

export default JobDetails;
