"use client";

import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./WhatsNew.module.css";
import { Container, Image } from "react-bootstrap";
import NextImage from "next/image";
import leftarr from "../../../public/leftarr.png";
import rightarr from "../../../public/rightarr.png";
import arrowsright from "../../../public/arrow-right-case.svg";
import Link from "next/link";
import LearnMore from "../LearnMore/LearnMore";
import { useRouter } from "next/navigation";

const WhatsNew = ({
  testimonials,
  heading,
  description,
  btnLink,
  btnLabel,
  buttonTrue,
  whatsNewClas,
}) => {
  const router = useRouter();
  const [slidesToShow, setSlidesToShow] = useState(3);
  useEffect(() => {
    if (testimonials?.length === 1) {
      setSlidesToShow(1);
    } else if (testimonials?.length === 2) {
      setSlidesToShow(2);
    } else {
      setSlidesToShow(3);
    }
  }, [testimonials]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    autoplay: true,
    pauseOnHover: true,
    autoplaySpeed: 3000,
    nextArrow: <NextImage src={rightarr} alt="arrow" />,
    prevArrow: <NextImage src={leftarr} alt="arrow" />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: Math.min(slidesToShow, 2),
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(slidesToShow, 2),
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        },
      },
    ],
  };

  const goToPage = (link) => {
    router.push(link);
  }

  return (
    <section
      className={`${styles.testimonialSection} ${whatsNewClas} whatsNew`}
    >
      <Container className={styles["testinomial-section-container"]}>
        <div className={styles["testionomial-s-content"]}>
          <h2 className={`colorBlack font48 fw600 text-center`}>{heading}</h2>
          <p
            className={`${styles.establish} font18 fw400 colorGray text-center`}
          >
            {description}
          </p>
        </div>
        {testimonials && testimonials.length === 1 ? (
          <div onClick={() => {
            const link = testimonials[0]?.buttonLink ? testimonials[0]?.buttonLink : "#"
            goToPage(link)
          }} className={`${styles.card} ${styles.testimonailsCategory}`}>
            <div className={styles.imageWrapper}>
              <Image
                src={testimonials[0].image}
                alt={testimonials[0].imageData?.alternativeText || "Logo"}
                className={`${styles.image} img-fluid`}
              />
              {testimonials[0]?.category && (
                <p className={styles.category}>{testimonials[0].category}</p>
              )}
            </div>
            <h3 className={styles.name}>{testimonials[0]?.title}</h3>
            <p className={styles.para}>{testimonials[0]?.para}</p>
            <div className={styles.titmonialLink}>
              {testimonials[0]?.button && (
                <Link
                  className={`d-flex gap-2 align-items-center textdecoration ${styles["learn-more-b"]}`}
                  href={testimonials[0]?.buttonLink ? testimonials[0]?.buttonLink : "#"}
                >
                  <span className="position-relative">
                    {testimonials[0]?.button}
                  </span>
                  <Image
                    src={arrowsright.src}
                    alt="arrow"
                    className="img-fluid"
                  />
                </Link>
              )}
            </div>
          </div>
        ) : (
          <Slider {...settings} className={styles.slider}>
            {testimonials &&
              testimonials.map((testimonial) => (
                <div onClick={() => {
                  const link = testimonial?.buttonLink ? testimonial?.buttonLink : "#"
                  goToPage(link)
                }} key={testimonial.id} className={styles.card}>
                  <div className={styles.imageWrapper}>
                    <Image
                      src={testimonial.image}
                      alt={testimonial.imageData?.alternativeText || "Logo"}
                      className={`${styles.image} img-fluid`}
                      height={testimonial.imageData?.height}
                      width={testimonial.imageData?.width}
                    />
                    {testimonial.category && (
                      <p className={styles.category}>{testimonial?.category}</p>
                    )}
                  </div>
                  {testimonial?.title && (
                    <h3 className={styles.name}>{testimonial?.title}</h3>
                  )}
                  {testimonial?.para && (
                    <p className={styles.para}>{testimonial?.para}</p>
                  )}
                  <div className={styles.titmonialLink}>
                    {testimonial.button && (
                      <Link
                        className={`d-flex gap-2 align-items-center textdecoration ${styles["learn-more-b"]}`}
                        href={testimonial?.buttonLink}
                      >
                        <span className="position-relative">
                          {testimonial?.button}
                        </span>
                        <Image
                          src={arrowsright.src}
                          alt="arrow"
                          className="img-fluid"
                        />
                      </Link>
                    )}
                  </div>
                </div>
              ))}
          </Slider>
        )}

        {btnLabel && buttonTrue && (
          <div className={styles.learnMore}>
            <LearnMore label={btnLabel} link={btnLink || "#"} />
          </div>
        )}
      </Container>
    </section>
  );
};

export default WhatsNew;
