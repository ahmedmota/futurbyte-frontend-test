"use client";

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "@/components/LogoSlider/LogoSlider.module.css";
import Image from "next/image";
import { Container } from "react-bootstrap";
import { getImageURL } from "@/lib/helpers";
import Link from "next/link";

const LogoSlider = ({ logos }) => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          // centerMode: true,
          // centerPadding: "10px",
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };

  return (
    <section className="sliderHomeLogo sliderLogosTop marginBottom">
      <Container className={styles["container-slide-logo"]}>
        <Slider {...settings} className={styles.imageSlider}>
          {logos.map((logo) => {
            return (
              <div key={logo.id} className={styles.logoSlider}>
                <Link href={logo.anchorLink || "#"} rel={logo.noFollow || "nofollow, noindex"}>
                  <Image
                    src={logo.url}
                    width={logo.width}
                    height={logo.height}
                    alt={logo.alternativeText}
                    className="img-fluid"
                  />
                </Link>
              </div>
            )
          })}
        </Slider>
      </Container>
    </section>
  );
};

export default LogoSlider;
