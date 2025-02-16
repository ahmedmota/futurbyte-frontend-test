"use client";

import Link from "next/link";
import styles from "./back-button.module.css";
import aroowright from "../../../../../public/aroowright.png";
import { Image } from "react-bootstrap";

const BackButton = () => {
  // Function to handle the back link click
  const handleBackClick = (e) => {
    e.preventDefault(); // Prevent the default link behavior
    window.history.back(); // Navigate to the previous page in history
  };

  return (
    <Link className={styles["buttonBack"]} href="#" onClick={handleBackClick}>
      <Image src={aroowright.src} alt="arrow" className="img-fluid" />
      BACK
    </Link>
  );
};

export default BackButton;
