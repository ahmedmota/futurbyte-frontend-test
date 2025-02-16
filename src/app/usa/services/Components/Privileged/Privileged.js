import React from "react";
import styles from "../Privileged/Privileged.module.css";
import { Container, Row, Col } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import arrowright from "../../../../../../public/arrowright.png";

const Privileged = ({ title, description }) => {
  return (
    <section className={`${styles.privileged}`}>
      <Container>
        <Row className="align-items-center">
          <Col xl={4}>
            <h4 className="font36 fw600 colorBlack  mb-0">{title}</h4>
          </Col>
          <Col xl={5}>
            <p
              className={`${styles.businessStrategic} font18 fw400 colorGray mb-0`}
            >
              {description}
            </p>
          </Col>
          <Col xl={3}>
            <Link className={styles.consultancy} href="#">
              Schedule Free Consultancy
              <Image src={arrowright} className="img-fluid" alt="arrowright" />
            </Link>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Privileged;
