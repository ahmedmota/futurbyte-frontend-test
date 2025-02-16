import React from "react";
import styles from "../AboutStitches/AboutStitches.module.css";
import { Container, Row, Col, Image } from "react-bootstrap";

const AboutStitches = ({ title, description, map }) => {
  return (
    <section className={styles.designing}>
      <Container>
        <Row>
          <Col xl={12}>
            <div className={styles.stitches}>
              <h3>{title} </h3>
              <p>{description}</p>
              <Image src={map} className="img-fluid" alt="Map" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutStitches;
