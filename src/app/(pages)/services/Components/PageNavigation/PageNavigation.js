"use client";

import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Link from "next/link";
import styles from "../PageNav/PageNav.module.css";

const PageNav = ({ list }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <div className={styles.bussines}>
      <Container>
        <div className={`${styles.appdevelopment} appdevelopment`}>
          {list.map((service) => (
            <Link
              key={service}
              className={`${activeIndex === service ? styles.active : ""}`}
              onClick={() => setActiveIndex(service)}
              href={`#${service.replace(/\s+/g, "")}`}
            >
              {service}
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default PageNav;
