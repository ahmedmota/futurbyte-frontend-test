"use client";
import React from "react";
import styles from "./HeroSection.module.css";
import arrowright from "../../../public/arrowrighttime.svg";
import Link from "next/link";
import { Container, Image } from "react-bootstrap";

const HeroSection = ({
  title,
  description,
  buttonText,
  imgSrc,
  buttonLink,
  img,
  ...props
}) => {
  // Set default width and height from the thumbnail format or fallback values
  const imageWidth = imgSrc?.width || 550; // Default to 245px if not available
  const imageHeight = imgSrc?.height || 539; // Default to 68px if not available
  const imageUrl = imgSrc?.url || ""; // Fallback

  return (
    <section className="marginBottom marginTop">
      <Container>
        <div className={`${styles.heroSec}`}>
          {/* <Image
            src={herosectionbg}
            alt={img?.alternativeText || "heroImage"}
            height={img?.height}
            img={img?.width}
            className={`${styles.heroSectionBgImaebg} img-fluid`}
          /> */}
          <div className={styles.heroSectionText}>
            <div className={styles.bussinees}>
              <h2 className="text-white fw600 font48 mb-0">{title}</h2>
              <p className="text-white fw400 font18">
                {description && description}
              </p>
              {buttonLink && (
                <Link className={styles.schedule} href={buttonLink}>
                  {buttonText}
                  <Image src={arrowright.src} alt="" className="img-fluid" />
                </Link>
              )}
            </div>
            <div className={styles.heroSideImage}>
              {imgSrc && (
                <Image
                  width={imageWidth}
                  height={imageHeight}
                  src={imageUrl}
                  alt="hero"
                  className="img-fluid"
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
