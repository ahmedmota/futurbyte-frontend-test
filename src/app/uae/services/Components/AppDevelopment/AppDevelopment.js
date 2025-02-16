"use client";

import { Container, Row, Col, Image as ReactImage } from "react-bootstrap";
import styles from "../AppDevelopment/AppDevelopment.module.css";
import Image from "next/image";
import tick from "../../../../../../public/tick.png";
import arrowsright from "../../../../../../public/arrowsright.png";
import Link from "next/link";
import arrowright from "../../../../../../public/arrowright.png";
import { ORIGINS } from "@/lib/constants";

const AppDevelopment = ({
  heading,
  para,
  list,
  imageWeb,
  buttontext,
  buttonLink,
  colright,
  colleft,
  colRightClass,
  colLeftClass,
}) => {
  return (
    <section
      className={`${styles.digitalSolutions} digitalSolutions marginBottom  paddingBottom`}
    >
      <Container>
        <Row className={`${styles.Appdevelopmentrow} align-items-center gy-4`}>
          <Col xl={colright}>
            <div className={` ${colLeftClass ? styles[colLeftClass] : ""}`}>
              <ReactImage
                src={imageWeb}
                alt={`websiteimg`}
                className="img-fluid w-100"
                priority
              />
            </div>
          </Col>
          <Col xl={colleft}>
            <div className={` ${colRightClass ? styles[colRightClass] : ""}`}>
              <h4 className={styles.websiteheading}>{heading}</h4>
              <p className={styles.servicesfocus}>{para}</p>

              {list && list?.length > 0 && (
                <ul className={styles.bulletList}>
                  {list.map((item, index) => (
                    <li key={index} className={styles.listItem}>
                      <Image
                        src={tick}
                        alt="bulletList"
                        className="img-fluid"
                      />
                      {item}
                      <Image
                        src={arrowsright}
                        alt="bulletList"
                        className="img-fluid"
                      />
                    </li>
                  ))}
                </ul>
              )}
              <Link className={styles.LearnMore} href={ORIGINS.UAE + buttonLink}>
                {buttontext}
                <Image
                  alt="arrowright"
                  src={arrowright}
                  className="img-fluid"
                />
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AppDevelopment;
