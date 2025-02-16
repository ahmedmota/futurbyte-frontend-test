"use client";

import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Image from "next/image";
import styles from "@/components/PeopleIndustries/PeopleIndustries.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import VerticalSlider from "../VericalSlider/VerticalSlider";
import VericalHorizontalSlider from "../VericalHorizontalSlider/VericalHorizontalSlider";
import HorizontalSlides from "../HorizontalSlides/HorizontalSlides";
import { getImageURL } from "@/lib/helpers";

const PeopleIndustries = ({ data }) => {
  return (
    <section className="paddingTop paddingBottom">
      <Container className={styles.peopleIndustries}>
        <Row className={styles.spaceIndustries}>
          <Col xl={3}>
            <h3 className={`${styles.dummyText} fw600 font36 colorBlack`}>
              {data.heading}
            </h3>
            <Image
              src={getImageURL(data?.logo?.url)}
              alt={data.logo?.alternativeText}
              className={`${styles.ImageLorem} img-fluid`}
              width={data.logo?.width}
              height={data.logo?.height}
            />
          </Col>
          <Col xl={4} className={styles.starLine}>
            <div className="d-flex justify-content-between">
              <div className={styles.layoutClass}>
                <h3
                  className={`${styles.people} fw600 font22 colorBlackSeconday mb-0`}
                >
                  {data.titles[0].title}
                </h3>
                <p className="fw400 font18 colorGray mb-0">
                  {data.titles[0].description}
                </p>
              </div>
              <div className={styles.layoutClass}>
                <h3
                  className={`${styles.people} fw600 font22 colorBlackSeconday mb-0`}
                >
                  {data.titles[1].title}
                </h3>
                <p className="fw400 font18 colorGray mb-0">
                  {data.titles[1].description}
                </p>
              </div>
            </div>
            <div className="d-flex justify-content-between mt-5">
              <div className={styles.layoutClass}>
                <h3
                  className={`${styles.people} fw600 font22 colorBlackSeconday mb-0`}
                >
                  {data.titles[2].title}
                </h3>
                <p className="fw400 font18 colorGray mb-0">
                  {data.titles[2].description}
                </p>
              </div>
              <div className={styles.deliever}>
                <h3
                  className={`${styles.people} fw600 font22 colorBlackSeconday mb-0`}
                >
                  {data.titles[3].title}
                </h3>
                <p className="fw400 font18 colorGray mb-0">
                  {data.titles[3].description}
                </p>
              </div>
            </div>
          </Col>
          <Col xl={5} className={styles.removeSpace}>
            <div className={`${styles.verticalSlides} d-flex`}>
              {data.right_logos && <VerticalSlider slides={data.right_logos} />}
              {data.left_logos && (
                <VericalHorizontalSlider slides={data.left_logos} />
              )}
            </div>
            <div className={styles.horizontalSlides}>
              {data?.left_logos?.length && data?.right_logos?.length && (
                <HorizontalSlides
                  slides={[...data.right_logos, ...data.left_logos]}
                />
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default PeopleIndustries;
