"use client";

import React, { useState } from "react";
import styles from "@/components/Banner/Banner.module.css";
import { Container, Row, Col } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import arrowright from "../../../public/arrowrighttime.svg";
import { getImageURL } from "@/lib/helpers";
import { useEffect, useRef } from "react";
// import Typewriter from "react-typewriter-effect";
import { ReactTyped } from "react-typed";
import FormWithCanvas from "../FormWithCanvas/FormWithCanvas";

const Banner = ({ addLink = true, isCareerPage = false, addForm = false, ...props }) => {
  const textRef = useRef(null);
  const [animatedTextWidth, setAnimatedTextWidth] = useState(0);

  const [showOffcanvas, setShowOffcanvas] = useState(false);

  // Handle offcanvas close
  const handleCloseOffcanvas = () => setShowOffcanvas(false);

  // Handle offcanvas open
  const handleShowOffcanvas = () => setShowOffcanvas(true);

  return (
    <section
      style={{ backgroundImage: `url(${getImageURL(props.bannerimg)})` }}
      className={`${styles.banner} ${props.propsClass ? styles[props.propsClass] : ""
        }  ${props.marginBottom ? "" : "marginBottom"}`}
    >
      <div className={styles.bannerImage}></div>
      <Container>
        <Row>
          <Col xl={12}>
            <div className={`${styles.bannerContainer} bannerContainer`}>
              {props.isAnimate && props.heading && (
                <h1
                  className={`text-white font64 text-center fw700 position-relative ${styles["top-animated-text-main"]}`}
                >
                  <span className={styles["animated-text"]}>
                    <span> {props.title_first_text} </span>
                    <ReactTyped
                      strings={[props.title_middle_text]} // You can pass an array of strings if you want to type multiple lines or words
                      typeSpeed={70}
                      backSpeed={70}
                      loop
                    />
                  </span>
                  <span className={styles["animated-text-md"]}>
                    <span> {props.title_first_text} </span>
                    <br />
                    <ReactTyped
                      strings={[props.title_middle_text]} // You can pass an array of strings if you want to type multiple lines or words
                      typeSpeed={70}
                      backSpeed={70}
                      loop
                    />
                  </span>
                  <span>
                    {"\n"}
                    {props.title_end_text}
                  </span>
                </h1>
              )}
              {!props.isAnimate && props.heading && (
                <h1 className="text-white font64 text-center fw700">
                  {props.heading}
                </h1>
              )}
              {props.para && (
                <p className="text-white fw400 font22 text-center">
                  {props.para}
                </p>
              )}
              <div className={styles.bannerButtons}>
                {props.scheduleBtn && (
                  <Link
                    className={styles.schedule}
                    href={isCareerPage ? "#career-page" : addLink ? props.scheduleLink ? props.scheduleLink : "https://calendly.com/bytefutur/30min" : "#"}
                    onClick={addForm ? (e) => {
                      e.preventDefault();
                      handleShowOffcanvas();
                    } : null}
                  >
                    {props.scheduleBtn}
                    <Image
                      src={arrowright}
                      alt="arrow-right"
                      className="img-fluid"
                    />
                  </Link>
                )}
                {props.OurWork && (
                  <Link
                    className={styles.seeOurWork}
                    href={props.ourWorkLink || "#"}
                  >
                    {props.OurWork}
                    <Image
                      src={arrowright}
                      alt="our-work"
                      className="img-fluid"
                    />
                  </Link>
                )}
              </div>
              {props.bannerLogos?.length && (
                <div className={styles.bannerLogos}>
                  {!!props.bannerLogos?.length &&
                    props.bannerlogos?.map(
                      ({ url, alternativeText, height, width, id }) => (
                        <Image
                          key={id}
                          src={getImageURL(url)}
                          height={height}
                          width={width}
                          alt={alternativeText || "Logo"}
                          className="img-fluid"
                        />
                      )
                    )}
                </div>
              )}
            </div>
          </Col>
        </Row>
      </Container>
      {addForm && <FormWithCanvas showOffcanvas={showOffcanvas} handleCloseOffcanvas={handleCloseOffcanvas} handleShowOffcanvas={handleShowOffcanvas} />}
    </section>
  );
};

export default Banner;
