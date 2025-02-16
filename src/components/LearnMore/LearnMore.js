import Link from "next/link";
import React from "react";
import Image from "next/image";
import styles from "@/components/LearnMore/LearnMore.module.css";
import arrowright from "../../../public/arrowright.png";

const LearnMore = ({ label = "Learn More", link = "#" }) => {
  return (
    <section className={styles.learnMoreSec}>
      <Link className={styles.LearnMore} href={link || "#"}>
        {label || "Learn More"}
        <Image alt="arrowright" src={arrowright} className="img-fluid" />
      </Link>
    </section>
  );
};

export default LearnMore;
