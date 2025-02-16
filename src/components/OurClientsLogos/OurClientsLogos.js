"use client";

import React from "react";
import styles from "@/components/OurClientsLogos/OurClientsLogos.module.css";
import { Container, Col, Row } from "react-bootstrap";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import eazioLogo from "../../../public/eazio_logo.png";
import leftarr from "../../../public/leftarr.png";
import rightarr from "../../../public/rightarr.png";

const OurClientsLogos = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    nextArrow: <Image src={rightarr} alt="arrow" />,
    prevArrow: <Image src={leftarr} alt="arrow" />,
  };

  return (
    <>
      <section className="paddingTop">
        <Container>
          <Row>
            <Col x-={4}>
              <div className={`${styles.card} pt-5 card m-3 p-5`}>
                <Image
                  src={eazioLogo}
                  alt="Edsidera Logo"
                  className="logo-img"
                />
              </div>
            </Col>
            <Col x-={4}>
              <div className={`${styles.card} pt-5 card m-3 p-5`}>
                <Image
                  src={eazioLogo}
                  alt="Edsidera Logo"
                  className="logo-img"
                />
              </div>
            </Col>
            <Col x-={4}>
              <div className={`${styles.card} pt-5 card m-3 p-5`}>
                <Image
                  src={eazioLogo}
                  alt="Edsidera Logo"
                  className="logo-img"
                />
              </div>
            </Col>
            <Col x-={4}>
              <div className={`${styles.card} pt-5 card m-3 p-5`}>
                <Image
                  src={eazioLogo}
                  alt="Edsidera Logo"
                  className="logo-img"
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col x-={4}>
              <div className={`${styles.card} pt-5 card m-3 p-5`}>
                <Image
                  src={eazioLogo}
                  alt="Edsidera Logo"
                  className="logo-img"
                />
              </div>
            </Col>
            <Col x-={4}>
              <div className={`${styles.card} pt-5 card m-3 p-5`}>
                <Image
                  src={eazioLogo}
                  alt="Edsidera Logo"
                  className="logo-img"
                />
              </div>
            </Col>
            <Col x-={4}>
              <div className={`${styles.card} pt-5 card m-3 p-5`}>
                <Image
                  src={eazioLogo}
                  alt="Edsidera Logo"
                  className="logo-img"
                />
              </div>
            </Col>
            <Col x-={4}>
              <div className={`${styles.card} pt-5 card m-3 p-5`}>
                <Image
                  src={eazioLogo}
                  alt="Edsidera Logo"
                  className="logo-img"
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col x-={4}>
              <div className={`${styles.card} pt-5 card m-3 p-5`}>
                <Image
                  src={eazioLogo}
                  alt="Edsidera Logo"
                  className="logo-img"
                />
              </div>
            </Col>
            <Col x-={4}>
              <div className={`${styles.card} pt-5 card m-3 p-5`}>
                <Image
                  src={eazioLogo}
                  alt="Edsidera Logo"
                  className="logo-img"
                />
              </div>
            </Col>
            <Col x-={4}>
              <div className={`${styles.card} pt-5 card m-3 p-5`}>
                <Image
                  src={eazioLogo}
                  alt="Edsidera Logo"
                  className="logo-img"
                />
              </div>
            </Col>
            <Col x-={4}>
              <div className={`${styles.card} pt-5 card m-3 p-5`}>
                <Image
                  src={eazioLogo}
                  alt="Edsidera Logo"
                  className="logo-img"
                />
              </div>
            </Col>
          </Row>
        </Container>

        <Container>
          <div class="container d-flex justify-content-center align-items-center">
            <div class="text-center">
              <h1 class="fw-bold">
                We are recognised for our <br></br> exceptional website
                services!
              </h1>
            </div>
          </div>
          <div class="container d-flex justify-content-center align-items-center p-4">
            <div class="text-center">
              <h5 class="fw-light">
                We have helped businesses from multiple industries improve their
                search engine rankings <br></br> and increase their organic lead
                count by up to 60%.
              </h5>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default OurClientsLogos;
