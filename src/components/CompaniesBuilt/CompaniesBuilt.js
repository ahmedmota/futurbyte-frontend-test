"use client";

import React from "react";
import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "../CompaniesBuilt/CompaniesBuilt.module.css";
import leftarr from "../../../public/leftarr.png";
import rightarr from "../../../public/rightarr.png";
import { Container } from "react-bootstrap";
import { getImageURL } from "@/lib/helpers";
import Link from "next/link";

const CompaniesBuilt = ({ heading, slides }) => {
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
    <section
      className={`${styles.sliderCompaniesBuilt} sliderCompaniesBuilt paddingTop paddingBottom marginTop`}
    >
      <Container>
        <h2 className="text-center fw600 font48 colorBlack">{heading}</h2>
        <Slider {...sliderSettings}>
          {slides.map((slide) => (
            <div key={slide.id} className={styles.slide}>
              <Link className={styles.edsidera} href={slide.slug}>
                <Image
                  alt={slide.companyLogo.alternativeText}
                  src={getImageURL(slide.companyLogo.url)}
                  height={slide.companyLogo.height}
                  width={slide.companyLogo.width}
                  className={`${styles.edsideralog} img-fluid`}
                />
                <div className={styles.compinieslogo}>
                  <Image
                    className="img-fluid"
                    alt={slide.productLogo.alternativeText}
                    src={getImageURL(slide.productLogo.url)}
                    height={slide.productLogo.height}
                    width={slide.productLogo.width}
                  />
                </div>
                <Image
                  alt={slide.productImage.alternativeText}
                  src={getImageURL(slide.productImage.url)}
                  height={slide.productImage.height}
                  width={slide.productImage.width}
                  className={`${styles.edsiderLaptop} img-fluid`}
                />
              </Link>
              <h3 className="fw500 font18 colorBlack">{slide.title}</h3>
              <p className={`${styles.readymode} font18 fw400 colorGray`}>
                {slide.description}
              </p>
              <div className={styles.clientCommitment}>
                {slide.subSections.map((ss) => (
                  <div key={ss.id}>
                    <p className="mb-0 font18 fw600 colorBlackSeconday">
                      {ss.title}
                    </p>
                    <p className="mb-0 font18 fw400 colorGray">
                      {ss.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </Slider>
      </Container>
    </section>
  );
};

export default CompaniesBuilt;
