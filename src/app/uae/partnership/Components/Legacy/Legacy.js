"use client";

import { useState, useEffect } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import CountUp from "react-countup";
import impactBgMain from "../../../../../../public/impact-bg.svg";
import { useInView } from "react-intersection-observer"; // Import the hook from the package
import styles from "./Legacy.module.css";

const LegacyComponent = ({ counter, description, imgSrc, ...restProps }) => {
  const [startCounting, setStartCounting] = useState(false);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  useEffect(() => {
    if (inView) {
      setStartCounting(true);
    }
  }, [inView]);

  return (
    <div ref={ref} className={`d-flex ${styles["legacy-main-c"]}`}>
      <div className={`w-60 ${styles["legacy-c-img-main"]}`}>
        {imgSrc && (
          <Image
            src={imgSrc}
            className={`${styles["legacy-c-img"]}`}
            alt={counter ? counter : "legacy-img"}
          />
        )}
      </div>
      <div className={`w-40 ${styles["legacy-c-content-main"]}`}>
        {counter && startCounting && (
          <h1>
            <CountUp end={counter} duration={5} />+
          </h1>
        )}
        {description && <p>{description}</p>}
      </div>
    </div>
  );
};

const Legacy = ({ title, description, items, ...restProps }) => {
  return (
    <div
      className="py-5"
      style={{ backgroundImage: `url(${impactBgMain.src})` }}
    >
      <Container>
        <Row>
          <Col className="col-12">
            <div className={`${styles["legacy-main"]} gap-2`}>
              {title && <h1>{title}</h1>}
              {description && <p>{description}</p>}
            </div>
          </Col>
          {items &&
            items.map((el, i) => {
              return (
                <Col lg={6} className="mb-lg-0 mb-3" key={i}>
                  <LegacyComponent
                    counter={el.counter}
                    description={el.description}
                    imgSrc={el.image}
                  />
                </Col>
              );
            })}
        </Row>
      </Container>
    </div>
  );
};

export default Legacy;
