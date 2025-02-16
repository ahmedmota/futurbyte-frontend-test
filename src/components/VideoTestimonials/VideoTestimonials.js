"use client";

import React from "react";
import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./VideoTestimonials.module.css";
import { Container } from "react-bootstrap";
import videotest from "../../../public/videotest.png";
import leftarr from "../../../public/leftarr.png";
import rightarr from "../../../public/rightarr.png";

const VideoTestimonials = ({ heading, testimonials }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
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
    <section className={`${styles.testimonialSection} testimonialSection`}>
      <Container>
        <h2 className={`colorBlack font48 fw600`}>{heading}</h2>
        <Slider {...settings} className={styles.slider}>
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className={styles.card}>
              <div className={styles.imageWrapper}>
                <Image
                  src={testimonial.image}
                  alt={testimonial.imageData.alternativeText}
                  className={`${styles.image} img-fluid`}
                  height={testimonial.imageData.height}
                  width={testimonial.imageData.width}
                />
              </div>
              <h3 className={styles.name}>{testimonial.name}</h3>
              <p className={styles.role}>{testimonial.role}</p>
            </div>
          ))}
        </Slider>
      </Container>
    </section>
  );
};

export default VideoTestimonials;
