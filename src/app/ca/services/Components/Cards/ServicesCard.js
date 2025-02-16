"use client";

import { Container, Row, Col } from "react-bootstrap";
import styles from "../WebsiteDevelopement/WebsiteDevelopement.module.css";
import Image from "next/image";
import tick from "../../../../../../public/tick.png";
import tickHovered from "../../../../../../public/hover-pogo.svg";

import arrowsright from "../../../../../../public/arrowsright.png";
import websiteimg from "../../../../../../public/websiteimg.png";
import LearnMore from "@/components/LearnMore/LearnMore";
import { useState } from "react";
import Link from "next/link";
import { ORIGINS } from "@/lib/constants";

const ServicesCard = ({
  heading,
  para,
  list,
  imageWeb,
  width,
  height,
  button_link,
  classProps,
  style,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <section className={`${styles.digitalSolutions} ServicesCard`}>
      <Container className="cardBlock">
        <Row
          className={`align-items-center gy-4 gx-xl-5 gx-md-0 d-flex ${style}`}
        >
          <Col xl={5}>
            <h4 className={styles.websiteheading}>{heading}</h4>
            <p className={styles.servicesfocus}>{para}</p>

            {list && list.length > 0 && (
              <ul className={styles.bulletList}>
                {list.map((item, index) => {
                  return (
                    <li
                      key={index}
                      className={styles.listItem}
                      onMouseEnter={() => handleMouseEnter(index)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <Link href={item?.link ? ORIGINS.CA + item?.link : "#"}>
                        <Image
                          src={index === hoveredIndex ? tickHovered : tick}
                          alt="bulletList"
                          className="img-fluid"
                        />
                        {item.label}
                        <Image
                          src={arrowsright}
                          alt="bulletList"
                          className="img-fluid"
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}

            <LearnMore />
          </Col>
          <Col xl={7} className={styles.stulpong}>
            <div className={styles[classProps]}>
              <Image
                src={imageWeb}
                alt={`websiteimg`}
                className="siteImage img-fluid w-100"
                priority
                width={width}
                height={height}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ServicesCard;
