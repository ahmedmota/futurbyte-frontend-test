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
          {!!list?.length &&
            list.map((service, i) =>
              service?.tabName ? (
                <Link
                  key={i}
                  className={`${styles["focused-link"]} ${
                    activeIndex === service ? styles.active : ""
                  }`}
                  onClick={() => setActiveIndex(service)}
                  href={`#${service?.tabId?.replace(/[\s-]+/g, "")}`}
                >
                  {service.tabName}
                </Link>
              ) : null
            )}
        </div>
      </Container>
    </div>
  );
};

export default PageNav;
