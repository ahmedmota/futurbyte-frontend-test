"use client";

import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import styles from "@/components/VericalHorizontalSlider/VericalHorizontalSlider.module.css";
import Image from "next/image";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "swiper/css/pagination";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { getImageURL } from "@/lib/helpers";
import Link from "next/link";

const VericalHorizontalSlider = ({ slides }) => {
  return (
    <Container>
      <Row>
        <Col md={12}>
          <section className={`${styles.peacenewbird} homvibes newbird`}>
            <div className={styles.slider}>
              <Swiper
                direction={"vertical"}
                slidesPerView={3}
                spaceBetween={50}
                centeredSlides={true}
                autoplay={{
                  delay: 1000,
                  disableOnInteraction: false,
                  reverseDirection: true,
                }}
                speed={1000}
                loop={true}
                navigation={false}
                modules={[Navigation, Autoplay]}
                style={{
                  height: "520px",
                }}
                className="mySwiper"
              >
                {slides?.length &&
                  slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                      <div
                        className={`${styles.slideContent} ${styles.activeSlide}`}
                      >
                        <Link href={slide.anchorLink || "#"} rel={slide.noFollow || "nofollow, noindex"}>
                          <Image
                            alt={slide.alternativeText}
                            className={styles.slideImage}
                            src={slide.url}
                            width={slide.width}
                            height={slide.height}
                          />
                        </Link>
                      </div>
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>
          </section>
        </Col>
      </Row>
    </Container>
  );
};

export default VericalHorizontalSlider;
