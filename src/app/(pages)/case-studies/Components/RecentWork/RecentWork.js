"use client";

import React, { useState } from "react";
import { Container, Row, Col, Tab, Nav, Dropdown } from "react-bootstrap";
import styles from "../RecentWork/RecentWork.module.css";
import Image from "next/image";
import arrowright from "../../../../../../public/arrowright.png";
import laptopImage from "../../../../../../public/chap.png";
import Link from "next/link";

const RecentWork = ({ navTabs, title, text, casestudy }) => {
  const [activeTab, setActiveTab] = useState(navTabs[0]?.key || "");
  const handleSelect = (key) => {
    setActiveTab(key);
  };

  const activeWorkData =
    navTabs.find((tab) => tab.key === activeTab)?.workData || [];

  return (
    <section className={styles.recentWorkSection}>
      <Container>
        <h2 className={styles.recentwork}>{title}</h2>
        <p className={styles.privileged}>{text}</p>
        <Tab.Container
          activeKey={activeTab}
          onSelect={(key) => setActiveTab(key)}
        >
          <Nav variant="pills" className={styles.navAll}>
            {navTabs.map((tab) => (
              <Nav.Item key={tab.key} className="navlikAuto">
                <Nav.Link eventKey={tab.key}>
                  {tab.label ? tab.label : "No Data"}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>

          <div className={`${styles.DropDownList} DropDownList`}>
            <h2>{casestudy}</h2>
            <Dropdown>
              <Dropdown.Toggle
                id="dropdown-basic"
                className={styles.dropdownToggle}
              >
                {navTabs.find((tab) => tab.key === activeTab)?.label ||
                  "Select"}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {navTabs.map((tab) => (
                  <Dropdown.Item
                    key={tab.key}
                    eventKey={tab.key}
                    onClick={() => handleSelect(tab.key)}
                  >
                    {tab.label}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <Tab.Content>
            <Tab.Pane eventKey={activeTab}>
              <Row className="gy-5">
                {activeWorkData.map((item, index) => {
                  return (
                    <Col md={12} key={index}>
                      <Row className={styles.workItem}>
                        <Col>
                          <h3 className={styles.title}>
                            {item.title ? item.title : "Lorum Ipsun"}
                          </h3>
                          <p className={styles.textDes}>
                            {item.text
                              ? item.text
                              : "Lorem Ipsum is simply dummy text of the printing and typesetting industry."}
                          </p>
                          <p className={styles.description}>
                            {item.description
                              ? item.description
                              : "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum"}
                          </p>

                          <Link
                            href={item.link || "#"}
                            className={styles.learnMore}
                          >
                            {item.bthLink}
                            <Image
                              alt="arrowright"
                              src={arrowright}
                              className="img-fluid"
                            />
                          </Link>
                        </Col>
                        <Col>
                          <div className={styles.imageCase}>
                            <Image
                              src={item.image ? item.image : laptopImage}
                              width={item.imageData?.width || 500}
                              height={item.imageData?.height || 500}
                              alt={item.imageData?.alternativeText}
                              className="img-fluid w-100"
                            />
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  );
                })}
              </Row>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Container>
    </section>
  );
};

export default RecentWork;
