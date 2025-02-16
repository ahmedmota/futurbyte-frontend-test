"use client";

import React, { useState } from "react";
import { Accordion, Card, Button, Container } from "react-bootstrap";
import styles from "../Faqs/Faqs.module.css";
import faqArrowLeft from "../../../public/side.svg";
import faqArrowLeftActive from "../../../public/faqs-right-inactive.svg";
import Image from "next/image";

const FAQSection = ({ faqData, heading }) => {
  const [activeKey, setActiveKey] = useState(null);

  const handleToggle = (key) => {
    setActiveKey(activeKey === key ? null : key);
  };

  return (
    <section className={styles.onlineFaqs}>
      <Container>
        <h2 className={`${styles.asked} faqs-heading`}>{heading}</h2>
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
                  </Button>
                  {activeKey === index ? (
                    <Image
                      onClick={() => handleToggle(index)}
                      src={faqArrowLeft.src}
                      alt="image"
                      className="img-fluid"
                      width={52}
                      height={52}
                    />
                  ) : (
                    <Image
                      onClick={() => handleToggle(index)}
                      src={faqArrowLeftActive.src}
                      alt="image"
                      className="img-fluid"
                      width={52}
                      height={52}
                    />
                  )}
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
