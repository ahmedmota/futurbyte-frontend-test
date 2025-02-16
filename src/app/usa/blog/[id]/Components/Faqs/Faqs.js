"use client";

import React, { useState } from "react";
import { Accordion, Card, Button, Container } from "react-bootstrap";
import styles from "../Faqs/Faqs.module.css";
import arrowDown from "../../../../../../../public/arrow-down.svg";
import arrowUp from "../../../../../../../public/arrow-up.svg";
import Image from "next/image";

const FAQSection = ({ faqData, heading }) => {
  const [activeKey, setActiveKey] = useState(null);

  const handleToggle = (key) => {
    setActiveKey(activeKey === key ? null : key);
  };

  return (
    <section className={styles.onlineFaqs}>
      <Container className={styles["blog-detail-faqs-container"]}>
        <h2 className={styles.asked}>{heading}</h2>
        <Accordion activeKey={activeKey}>
          {!!faqData?.length &&
            faqData.map((faq, index) => (
              <Card
                key={index}
                className={`mb-3 ${
                  activeKey === index ? styles.activeCard : styles.inactiveCard
                }`}
              >
                <Card.Header className={styles.headercard}>
                  <Button
                    variant="link"
                    className={`w-100 text-start ${
                      activeKey === index ? styles.afterfaqs : styles.beforefaq
                    }`}
                    onClick={() => handleToggle(index)}
                  >
                    {faq.question}
                    {activeKey === index ? (
                      <Image
                        onClick={() => handleToggle(index)}
                        src={arrowUp.src}
                        alt="image"
                        className="img-fluid"
                        width={20}
                        height={20}
                      />
                    ) : (
                      <Image
                        onClick={() => handleToggle(index)}
                        src={arrowDown.src}
                        alt="image"
                        className="img-fluid"
                        width={20}
                        height={20}
                      />
                    )}
                  </Button>
                </Card.Header>
                <Accordion.Collapse eventKey={index}>
                  <Card.Body className={styles.faqsanwser}>
                    <p>{faq.answer}</p>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            ))}
        </Accordion>
      </Container>
    </section>
  );
};

export default FAQSection;
