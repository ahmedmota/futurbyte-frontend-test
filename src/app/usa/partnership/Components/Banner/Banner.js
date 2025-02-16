import React from "react";
import styles from "./Banner.module.css";
import { Container, Row, Col } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import arrowright from "../../../../../../public/arrowright.png";
import { getImageURL } from "@/lib/helpers";
import { ORIGINS } from "@/lib/constants";

const Banner = (props) => {
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
              {props.heading && (
                <h1 className="text-white font64 text-center fw700">
                  {props.heading}
                </h1>
              )}
              {props.para && (
                <p
                  className={`${styles["para"]} text-white fw400 font22 text-center`}
                >
                  {props.para}
                </p>
              )}
              {props.subPara && (
                <p className="text-white fw600 font22 text-center">
                  {props.subPara}
                </p>
              )}
              <div className={styles.bannerButtons}>
                {props.scheduleBtn && (
                  <Link
                    className={styles.schedule}
                    href={props.scheduleBtnLink ? ORIGINS.US + props.scheduleBtnLink : "#"}
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
                    href={props.ourWorkLink ? ORIGINS.US + props.ourWorkLink : "#"}
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
    </section>
  );
};

export default Banner;
