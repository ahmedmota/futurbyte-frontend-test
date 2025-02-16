"use client";

import React from "react";
import styles from "@/components/Career/Career.module.css";
import { Container } from "react-bootstrap";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";
import Link from "next/link";
import { getCompleteURL } from "@/lib/helpers/getCompleteURL";

const Career = ({ heading, description, jobs }) => {
  return (
    <section id="career-page" className={styles.careerStyle}>
      <Container className="d-md-block d-none">
        <div className="container d-flex justify-content-center align-items-center ">
          <div className="text-center">
            <h2 className={styles.heading}>{heading}</h2>
          </div>
        </div>
        <div className="container d-flex justify-content-center align-items-center ">
          <div className="text-center">
            <h6 className={styles.headdescriptioning}>{description}</h6>
          </div>
        </div>
        <div className="container my-3">
          <div className="row g-4">
            {jobs.map((job, index) => (
              <div className="col-lg-4 col-md-6" key={index}>
                <div className={`${styles.jobCard} ${styles.parent}`}>
                  <div className="d-flex align-items-center mb-1">
                    <div className={`${styles.dotlong} d-flex flex-row p-0`}>
                      <span className={`${styles.jobId} badge rounded-pill`}>
                        {job.id}
                      </span>
                    </div>
                    <span className={`${styles.jobLocation}`}>
                      {job.location}
                    </span>
                    <span className={`${styles.jobType}`}>{job.type}</span>
                  </div>
                  <hr />
                  <h6 className={styles.titlejob}>{job.title}</h6>
                  <p className={`${styles.jobTypedes}`}>{job.description}</p>
                  <Link
                    href={getCompleteURL(job.link) || "#"}
                    className={`${styles.applyNow} ${styles.jobApply}`}
                  >
                    Apply Now &gt;
                  </Link>
                  <hr />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
      <Container className="d-md-none d-block">
        <div className="container d-flex justify-content-center align-items-center ">
          <div className="text-center">
            <h2 className={styles.heading}>{heading}</h2>
          </div>
        </div>
        <div className="container d-flex justify-content-center align-items-center ">
          <div className="text-center">
            <h6 className={styles.headdescriptioning}>{description}</h6>
          </div>
        </div>
        <div className="container my-3">
          <div className="row">
            <Swiper
              className="swiperCareer"
              modules={[Pagination]}
              slidesPerView={1}
              spaceBetween={0}
              onSlideChange={() => console.log("slide change")}
              onSwiper={(swiper) => console.log(swiper)}
              pagination={{
                clickable: true,
              }}
              loop={true}
            >
              {jobs.map((job, index) => (
                <SwiperSlide key={index}>
                  <div className="col-12">
                    <div className={`${styles.jobCard} ${styles.parent}`}>
                      <div className="d-flex align-items-center mb-1">
                        <div
                          className={`${styles.dotlong} d-flex flex-row p-0`}
                        >
                          <span
                            className={`${styles.jobId} badge rounded-pill`}
                          >
                            {job.id}
                          </span>
                        </div>
                        <span className={`${styles.jobLocation}`}>
                          {job.location}
                        </span>
                        <span className={`${styles.jobType}`}>{job.type}</span>
                      </div>
                      <hr />
                      <h6 className={styles.titlejob}>{job.title}</h6>
                      <p className={`${styles.jobTypedes}`}>
                        {job.description}
                      </p>
                      <a
                        href={job.link}
                        className={`${styles.applyNow} ${styles.jobApply}`}
                      >
                        Apply Now &gt;
                      </a>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Career;
