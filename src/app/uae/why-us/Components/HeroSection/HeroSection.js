"use client";

import React from "react";
// import Image from "next/image";
import { Image } from "react-bootstrap";
import styles from "./HeroSection.module.css";
import arrowright from "../../../../../../public/arrowright.png";
import Link from "next/link";
import { Container } from "react-bootstrap";
import { getImageURL } from "@/lib/helpers";
import heroSecBg from "../../../../../../public/herosectionbg.png";
import { ORIGINS } from "@/lib/constants";

const HeroSection = ({
  title,
  description,
  buttonLabel,
  buttonLink,
  imgSrc,
  showDescription = true,
  backgroundImg,
  ...props
}) => {
  // Get the image thumbnail format and its dimensions
  const thumbnail = imgSrc?.formats?.thumbnail || {};

  // Set default width and height from the thumbnail format or fallback values
  const imageWidth = imgSrc?.width || thumbnail?.width; // Default to 245px if not available
  const imageHeight = imgSrc?.height || thumbnail?.height; // Default to 68px if not available
  const imageUrl = imgSrc?.url || thumbnail?.url; // Fallback

  return (
    <section className={styles["hero-section-why"]}>
      <Container>
        <div
          className={`${styles.heroSec}`}
          style={{
            backgroundImage: backgroundImg
              ? `url(${getImageURL(backgroundImg?.url)})`
              : `url(${heroSecBg.src})`,
          }}
        >
          <div className={styles.heroSectionText}>
            <div className={styles.bussinees}>
              {title && (
                <h2 className="text-white fw600 font48 mb-0">{title}</h2>
              )}
              {description && (
                <p
                  className={`text-white fw400 font18 ${
                    showDescription ? "d-block" : "d-md-none d-block"
                  }`}
                >
                  {description}
                </p>
              )}
              {buttonLabel && (
                <Link
                  className={styles.schedule}
                  href={buttonLink ? ORIGINS.UAE + `${buttonLink}` : ""}
                >
                  {buttonLabel}
                  <Image
                    src={arrowright.src}
                    alt={"arrow-right"}
                    className="img-fluid"
                  />
                </Link>
              )}
            </div>
            <div className={styles.heroSideImage}>
              {imageUrl && (
                <Image
                  src={getImageURL(imageUrl)}
                  alt={title}
                  className={`${styles["hero-sec-img-why"]} img-fluid`}
                  // width={651}
                  // height={542}
                />
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HeroSection;
