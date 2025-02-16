import React from "react";
import styles from "@/components/Privileged/Privileged.module.css";
import { Container, Row, Col } from "react-bootstrap";

const Privileged = ({ title, description, calssPri }) => {
  return (
    <section className={`${styles.privileged}  paddingTop`}>
      <Container>
        <Row>
          <Col className={styles["priviledged-inner-col"]} xl={5}>
            <h4 className="font36 fw600 colorBlack  mb-0">{title}</h4>
          </Col>
          <Col className={styles["priviledged-inner-col"]} xl={7}>
            <p
              className={`${styles.businessStrategic} font18 fw400 colorGray mb-0`}
            >
              {description}
            </p>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Privileged;
