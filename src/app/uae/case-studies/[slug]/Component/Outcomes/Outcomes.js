import React from "react";
import styles from "../Outcomes/Outcomes.module.css";
import { Container, Row, Col, Image } from "react-bootstrap";
import rightIcon from "../../../../../../../public/rightIcon.png";

const Outcomes = ({ outcomesData, title }) => {
  return (
    <section className={styles.outcomes}>
      <Container>
        <Row>
          <Col xl={12}>
            <h3 className={styles.projectOcto}>{title}</h3>
          </Col>
        </Row>
        <Row className="gy-3">
          {outcomesData.map((outcome) => (
            <Col xl={4} key={outcome.id}>
              <div className={styles.outlong}>
                <Image
                  src={rightIcon.src}
                  className="img-fluid"
                  alt="rightIcon"
                />
                <p>{outcome.text}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Outcomes;
