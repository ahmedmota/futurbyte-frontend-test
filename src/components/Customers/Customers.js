"use client";

import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Image from "next/image";
import styles from "@/components/Customers/Customers.module.css";
import leftarr from "../../../public/leftarr.png";
import rightarr from "../../../public/rightarr.png";
import quoteup from "../../../public/quoteup.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Customers = ({ heading, ratingImg, testimonials }) => {
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    pauseOnHover: true,
    autoplaySpeed: 3000,
    nextArrow: <Image src={rightarr} alt="arrow" />,
    prevArrow: <Image src={leftarr} alt="arrow" />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          dots: true,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section>
      <div className={`${styles.customer} customer`}>
        <div className={styles.whatOur}>
          <Container>
            <Row className={styles.ourCus}>
              <Col xl={6}>
                <h2 className="colorBlack font48 fw600">{heading}</h2>
              </Col>
              <Col xl={6} className={styles.googleImage}>
                <Image
                  src={ratingImg}
                  alt="google"
                  className="img-fluid"
                  height={150}
                  width={200}
                />
              </Col>
            </Row>

            <Slider {...sliderSettings}>
              {testimonials.map((testimonial, index) => (
                <div key={index} className={styles.testimonialCard}>
                  <Image alt="quoteup" src={quoteup} className="img-fluid" />
                  <p className={styles.quote}>{testimonial.quote}</p>
                  <p className={styles.author}>{testimonial.author}</p>
                  <p className={styles.designation}>
                    {testimonial.designation}
                  </p>
                </div>
              ))}
            </Slider>
          </Container>
        </div>
      </div>
    </section>
  );
};

export default Customers;
