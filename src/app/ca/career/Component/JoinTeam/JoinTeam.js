"use client";

import React, { useState } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import styles from "../JoinTeam/JoinTeam.module.css";
import you from "../../../../../../public/you.png";
import arroleft from "../../../../../../public/arroleft.png";
import JobForm from "../JobForm/JobForm";

const JoinTeam = ({ data }) => {
  const [show, setShow] = useState(false);
  return (
    <section className={styles.dubai}>
      <Container>
        <Row className={styles.joinourteam}>
          <Col xl={9}>
            <h3>{data.join_the_team_heading}</h3>
            <p>{data.join_the_team_description}</p>
            <button href="#" onClick={() => setShow(true)}>
              {data.join_the_team_button_label}
              <Image alt="arroleft" className="img-fluid" src={arroleft.src} />
            </button>
          </Col>
          <Col xl={3}>
            <Image alt="you" className="img-fluid" src={you.src} />
          </Col>
        </Row>
      </Container>
      <JobForm show={show} setShow={setShow} />
    </section>
  );
};

export default JoinTeam;
