"use client";

import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import styles from "@/components/OurExpertise/OurExpertise.module.css";
import { useState, useEffect } from "react";
import Image from "next/image";
import line from "./../../../public/line.svg";
import lineMdRight from "./../../../public/md-line-right.svg";
import lineMdLeft from "./../../../public/md-line-left.svg";

const OurExpertise = ({ heading, tabData }) => {
  const [activeTab, setActiveTab] = useState(tabData[0].key);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);

  useEffect(() => {
    if (isAutoScrolling) {
      const autoScroll = setInterval(() => {
        setActiveTab((prevTab) => {
          const currentIndex = tabData.findIndex((tab) => tab.key === prevTab);
          const nextIndex = (currentIndex + 1) % tabData.length;
          return tabData[nextIndex].key;
        });
      }, 2000);

      return () => clearInterval(autoScroll);
    }
  }, [isAutoScrolling, tabData]);

  const handleTabClick = (key) => {
    setIsAutoScrolling(false);
    setActiveTab(key);
  };

  return (
    <section className={`${styles.expertiseSection} paddingTop paddingBottom`}>
      <Container>
        <h2 className={styles.expertise}>{heading}</h2>
        <Tab.Container activeKey={activeTab} onSelect={handleTabClick}>
          <Row className={styles.expertiseModal}>
            <Col md={3}>
              <Nav className={`${styles.sideNav} sideNav`}>
                {tabData.map((tab) => (
                  <Nav.Item key={tab.key}>
                    <Nav.Link
                      className={`${styles.tabLink} ${
                        activeTab === tab.key ? styles.activeTab : ""
                      }`}
                      eventKey={tab.key}
                    >
                      {tab.title}
                    </Nav.Link>
                  </Nav.Item>
                ))}
              </Nav>
            </Col>
            <Col md={9}>
              <Tab.Content>
                {tabData.map((tab) => (
                  <Tab.Pane eventKey={tab.key} key={tab.key}>
                    <Row>
                      {tab.sections.map((section, index) => (
                        <Col md={12} key={index}>
                          <div className={styles["expertise-name-main"]}>
                            <Image
                              width={100}
                              height={2}
                              src={lineMdLeft.src}
                              alt="line"
                              className={styles["expertise-line-md"]}
                            />
                            <h4 className={styles.name}>
                              {section.name}
                              {/* <span className={styles.sectionExpertise}></span> */}
                            </h4>
                            <Image
                              width={100}
                              height={2}
                              src={lineMdRight.src}
                              alt="line"
                              className={styles["expertise-line-md"]}
                            />
                            <Image
                              width={100}
                              height={2}
                              src={line.src}
                              alt="line"
                              className={styles["expertise-line"]}
                            />
                          </div>
                          <div className={styles.expertiseTools}>
                            {section.tools.map((tool, i) => (
                              <div className={styles.toolItem} key={i}>
                                <Image
                                  src={tool.imgSrc}
                                  alt={tool.imgData?.alternativeText}
                                  className={styles.toolImage}
                                  height={20}
                                  width={20}
                                />
                                <span>{tool.name}</span>
                              </div>
                            ))}
                          </div>
                        </Col>
                      ))}
                    </Row>
                  </Tab.Pane>
                ))}
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Container>
    </section>
  );
};

export default OurExpertise;
