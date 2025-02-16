"use client";
import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import styles from "@/components/ModernBusinesses/ModernBusinesses.module.css";
import Image from "next/image";
import tick from "../../../public/tick.png";
import tickHovered from "../../../public/hover-pogo.svg";
import arrowsright from "../../../public/arrowsright.png";
import whyFuture from "../../../public/whyFuture.png";
import LearnMore from "../LearnMore/LearnMore";
import React, { useState } from "react";
import { motion } from "framer-motion"; // Import framer-motion
import Link from "next/link";

const ModernBusinesses = ({
  tabContent,
  isLearnMore = false,
  title,
  para,
  isBgAllow = false,
  propsClass,
  propsPara,
}) => {
  const firstTab = Object.keys(tabContent)[0];
  const [activeTab, setActiveTab] = useState(firstTab);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Animation variants for framer-motion
  const animationVariants = {
    hidden: { opacity: 0, y: 100 }, // Start off-screen (100px down)
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5, // Set the animation duration to 0.5 seconds
        ease: "easeOut",
      },
    }, // Final state when in view
  };

  return (
    <section
      className={`${styles.digitalSolutions} ${isBgAllow ? styles["bg-allow-modern"] : ""
        } digitalSolutions marginBottom paddingTop paddingBottom`}
    >
      <Container className={styles.digitalSolutionsContainer}>
        {title && <h2 className="text-center fw600 font48">{title}</h2>}
        {para && (
          <p
            className={`${styles.establish} font18 fw400 colorGray text-center`}
          >
            {para}
          </p>
        )}

        {/* Wrap the entire Tab.Container with motion.div for animation */}
        <motion.div
          variants={animationVariants}
          initial="hidden"
          whileInView="visible"
        >
          <Tab.Container
            activeKey={activeTab}
            onSelect={(key) => setActiveTab(key)}
          >
            <div className={styles["nav-menus-wrapper"]}>
              <Nav className={`${styles.navMenus} ${propsClass}`}>
                {Object.keys(tabContent)?.map((key) => (
                  <Nav.Item className={styles["nav-menus-item"]} key={key}>
                    <Nav.Link
                      className={
                        activeTab === key
                          ? `${styles.activeTab} ${styles.navTabs} `
                          : ` ${styles.navTabs}`
                      }
                      eventKey={key}
                    >
                      {tabContent[key].mainButtonLabel}
                    </Nav.Link>
                  </Nav.Item>
                ))}
              </Nav>
            </div>

            <Tab.Content>
              {Object.keys(tabContent)?.map((key) => (
                <Tab.Pane eventKey={key} key={key}>
                  <Row
                    className={`${propsPara ? styles.propsPara : ""
                      } align-items-center gy-4`}
                  >
                    <Col xl={6}>
                      <h4 className="fw600 font36 colorBlack">
                        {tabContent[key].title ? tabContent[key].title : ""}
                      </h4>
                      <p className={`font18 fw400 colorGray mb-3`}>
                        {tabContent[key].description
                          ? tabContent[key].description
                          : "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content"}
                      </p>
                      {tabContent[key].list && (
                        <ul className={styles.bulletList}>
                          {tabContent[key].list.map((item, index) => (
                            <li
                              className="font18 fw400 colorBlackSeconday"
                              key={index}
                              onMouseEnter={() => setHoveredIndex(index)} // Hovering starts
                              onMouseLeave={() => setHoveredIndex(null)} // Hovering ends
                            >
                              <Link href={item.link || "#"}
                                className="font18 fw400 colorBlackSeconday text-decoration-none"

                              >
                                <Image
                                  src={
                                    hoveredIndex === index ? tickHovered : tick
                                  }
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
                          ))}
                        </ul>
                      )}
                      {tabContent[key].learnMoreLabel && (
                        <LearnMore
                          label={tabContent[key].learnMoreLabel}
                          link={
                            tabContent[key].learnMoreLink
                              ? tabContent[key].learnMoreLink
                              : ""
                          }
                        />
                      )}
                    </Col>
                    <Col xl={6}>
                      {tabContent[key].image ? (
                        <div className={styles.stockImage}>
                          <Image
                            src={tabContent[key].image}
                            alt={
                              tabContent[key].imageData?.alternativeText || ""
                            }
                            height={tabContent[key].imageData?.height || 1000}
                            width={tabContent[key].imageData?.width || 1000}
                            className={`${styles.stockImageposi} img-fluid w-100`}
                            priority
                          />
                        </div>
                      ) : (
                        <Image
                          src={whyFuture}
                          alt={whyFuture}
                          height={1000}
                          width={1000}
                          className="img-fluid w-100"
                          priority
                        />
                      )}
                    </Col>
                  </Row>
                </Tab.Pane>
              ))}
            </Tab.Content>
          </Tab.Container>
        </motion.div>
      </Container>
    </section>
  );
};

export default ModernBusinesses;
