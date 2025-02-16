"use client";

import React from "react";
import { Row, Col, Container, Image } from "react-bootstrap";
import styles from "../CaseLogoSlides/CaseLogoSlides.module.css";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "swiper/css/pagination";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

const CaseLogoSlides = ({ items, ...restProps }) => {
  return (
    <section className={styles.CaseLogo}>
      <Container>
        <Row className="gx-5">
          <Col className="col-md-4 col-6">
            <section className={`${styles.peacehomvibes} homvibes newbird`}>
              <div className={styles.slider}>
                <Swiper
                  direction={"vertical"}
                  slidesPerView={2}
                  spaceBetween={50}
                  centeredSlides={true}
                  autoplay={{
                    delay: 1000,
                    disableOnInteraction: false,
                    reverseDirection: false,
                  }}
                  speed={1000}
                  loop={true}
                  navigation={false}
                  modules={[Navigation, Autoplay]}
                  style={{
                    height: "850px",
                  }}
                  className="mySwiper caseStudiesSlider caseStudiesSliderEffect"
                >
                  {items &&
                    items.map((el, i) => {
                      return (
                        <SwiperSlide key={i}>
                          <div
                            className={`${styles.slideContent} ${styles.activeSlide}`}
                          >
                            <Image
                              src={el.image}
                              alt="Images"
                              className={styles.slideImage}
                            />
                          </div>
                        </SwiperSlide>
                      );
                    })}
                </Swiper>
              </div>
            </section>
          </Col>
          <Col className="col-md-4 col-6">
            <section className={`${styles.peacehomvibes} homvibes newbird`}>
              <div className={styles.slider}>
                <Swiper
                  direction={"vertical"}
                  slidesPerView={2}
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
                    height: "850px",
                  }}
                  className="mySwiper caseStudiesSlider"
                >
                  {items &&
                    items.map((el, i) => {
                      return (
                        <SwiperSlide key={i}>
                          <div
                            className={`${styles.slideContent} ${styles.activeSlide}`}
                          >
                            <Image
                              src={el.image}
                              alt="Images"
                              className={styles.slideImage}
                            />
                          </div>
                        </SwiperSlide>
                      );
                    })}
                </Swiper>
              </div>
            </section>
          </Col>
          <Col className="col-4 d-md-block d-none">
            <section className={`${styles.peacehomvibes} homvibes newbird`}>
              <div className={styles.slider}>
                <Swiper
                  direction={"vertical"}
                  slidesPerView={2}
                  spaceBetween={50}
                  centeredSlides={true}
                  autoplay={{
                    delay: 1000,
                    disableOnInteraction: false,
                    reverseDirection: false,
                  }}
                  speed={1000}
                  loop={true}
                  navigation={false}
                  modules={[Navigation, Autoplay]}
                  style={{
                    height: "850px",
                  }}
                  className="mySwiper caseStudiesSlider caseStudiesSliderEffect"
                >
                  {items &&
                    items.map((el, i) => {
                      return (
                        <SwiperSlide key={i}>
                          <div
                            className={`${styles.slideContent} ${styles.activeSlide}`}
                          >
                            <Image
                              src={el.image}
                              alt="Images"
                              className={styles.slideImage}
                            />
                          </div>
                        </SwiperSlide>
                      );
                    })}
                </Swiper>
              </div>
            </section>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default CaseLogoSlides;
