"use client";

import React, { useState } from "react";
import { Container } from "react-bootstrap";
import styles from "./ServicesDropdown.module.css";
import Link from "next/link";
import Image from "next/image";
import pindropdown from "../../../../../../public/pindropdown.png";

const ServicesDropdown = ({ list, Services }) => {
  const [selectedService, setSelectedService] = useState(list[0]);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (service) => {
    setSelectedService(service);
    setIsOpen(false);
  };

  return (
    <Container>
      <div className={styles.servicesContainer}>
        <label className={styles.label}>{Services}</label>
        <div
          className={`${styles.dropdown} ${isOpen ? styles.open : ""}`}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className={styles.selectedService}>{selectedService}</span>
          <span className={styles.arrow}>
            <Image src={pindropdown} alt="pindropdown" className="img-fluid" />
          </span>
        </div>
        {isOpen && (
          <div className={styles.dropdownMenu}>
            {list.map((item) => (
              <div
                key={item}
                className={styles.dropdownItem}
                onClick={() => handleSelect(item)}
              >
                <Link href={`#${item?.replace(/[\s-]+/g, "").toLowerCase()}`}>
                  {item}
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </Container>
  );
};

export default ServicesDropdown;
