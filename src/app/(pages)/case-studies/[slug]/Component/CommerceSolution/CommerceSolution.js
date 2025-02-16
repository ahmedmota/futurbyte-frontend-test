import React from "react";
import styles from "../CommerceSolution/CommerceSolution.module.css";
import { Container, Row, Col } from "react-bootstrap";
import VerticalSlider from "@/components/VericalSlider/VerticalSlider";
import VericalHorizontalSlider from "@/components/VericalHorizontalSlider/VericalHorizontalSlider";

const CommerceSolution = ({
  title,
  description1,
  description2,
  duration,
  right_logos,
  left_logos,
}) => {
  return (
    <section className={styles.CommerceSolution}>
      <Container>
        <Row>
          <Col xl={7}>
            <div className={styles.endtoend}>
              <h3>{title}</h3>
              <p className="mb-3">{description1}</p>
              <p>{description2}</p>
            </div>
          </Col>
          <Col xl={5}>
            <div className={`${styles.verticalline} myCommerceSlider`}>
              {right_logos && <VerticalSlider slides={right_logos} />}
              {left_logos && <VericalHorizontalSlider slides={left_logos} />}
            </div>
            <h4 className={styles.duration}>{duration}</h4>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default CommerceSolution;
