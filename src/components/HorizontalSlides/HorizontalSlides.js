"use client";

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "@/components/HorizontalSlides/HorizontalSlides.module.css";
import Image from "next/image";
import googlelogo from "../../../public/googlelogo.png";
import { getImageURL } from "@/lib/helpers";

import { Container } from "react-bootstrap";
import Link from "next/link";

const HorizontalSlides = ({ slides }) => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
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
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="sliderHomeLogo marginBottom">
      <Container>
        <Slider {...settings} className={styles.imageSlider}>
          {slides.map((s) => {
            return (
              <div className={styles.logoSlider} key={s.documentId}>
                {s ? (
                   <Link href={s.anchorLink || "#"} rel={s.noFollow || "nofollow, noindex"}>
                    <Image
                      className="img-fluid"
                      alt={s.alternativeText || "logo1"}
                      src={getImageURL(s.url)}
                      width={s.width}
                      height={s.height}
                    />
                  </Link>
                ) : (
                  <div className={styles.logoSlider}>
                    <Image src={googlelogo} alt="logo1" className="img-fluid" />
                  </div>
                )}
              </div>
            );
          })}
        </Slider>
      </Container>
    </section>
  );
};

export default HorizontalSlides;
