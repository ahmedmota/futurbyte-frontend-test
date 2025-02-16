"use client";

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "@/components/ProvidingDigital/ProvidingDigital.module.css";
import Image from "next/image";
import automotive from "../../../public/automotive.png";
import leftarr from "../../../public/leftarr.png";
import rightarr from "../../../public/rightarr.png";

import { Container } from "react-bootstrap";
import { getImageURL } from "@/lib/helpers";

const ProvidingDigital = ({ data }) => {
  const ProvidingDigital = {
    infinite: true,
    dots: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    nextArrow: <Image src={rightarr} alt="arrow" />,
    prevArrow: <Image src={leftarr} alt="arrow" />,
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
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <section
      className={`${styles.sliderProdive} sliderProdive paddingTop paddingBottom marginBottom`}
    >
      <Container>
        <h2 className="fw600 font48 text-center colorBlack">{data.heading}</h2>
        <Slider {...ProvidingDigital}>
          {data.icons.map((item) => (
            <div className={styles.provideSlider} key={item.documentId}>
              <Image
                src={item.icon ? getImageURL(item.icon.url) : automotive}
                alt={item.alternativeText}
                className="img-fluid"
                height={item.icon.height}
                width={item.icon.width}
              />
              <p className="fw500 font18">{item.text}</p>
            </div>
          ))}
        </Slider>
      </Container>
    </section>
  );
};

export default ProvidingDigital;
