"use client";

import React from "react";
import { Image } from "react-bootstrap";
import styles from "@/components/WorkLifeBalance/WorkLifeBalance.module.css";

const WorkLifeBalance = ({ desrciption, components }) => {
  return (
    <section className={`${styles.valuesSection} ${styles.backgroundImage} `}>
      <div className="container">
        <div className="row">
          <div className="col-lg-6 mb-4 mb-lg-0 text-lg-start">
            <h2 className={styles.desrciption}>{desrciption}</h2>
          </div>
          <div className="col-lg-6 px-lg-5">
            {components.map((c, index) => {
              return (
                <>
                  {index !== 0 && <hr></hr>}
                  <Image src={c.icon} className="img-fluid mb-3" alt="..." />
                  <div className={`${styles.valueItem} mb-4 d-flex `}>
                    <div>
                      <h5>{c.title}</h5>
                      <p className={`${styles.jobType} mb-0`}>
                        {c.description}
                      </p>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkLifeBalance;
