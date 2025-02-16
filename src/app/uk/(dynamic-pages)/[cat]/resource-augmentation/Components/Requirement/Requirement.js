"use client";

import { Col, Image, Row } from "react-bootstrap";
import "./Requirement.css";

// Core modules imports are same as usual
import { Navigation, Pagination, EffectCards } from "swiper/modules";

//Swiper
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-cards";

// Import Swiper styles
import "swiper/css";

import rightArrow from "../../../../../../../../public/slider-left.svg";
import leftArrow from "../../../../../../../../public/slider-right.svg";
import arrowRightWhite from "../../../../../../../../public/arrow-right-white.svg";
import Link from "next/link";
import { ORIGINS } from "@/lib/constants";

const Requirement = ({ number, title, description, imgSrc, ...restProps }) => {
  return (
    <div className={`requirement`}>
      <div className={`requirement-inner-content`}>
        {imgSrc && (
          <Image
            className="img-fluid mb-2"
            src={imgSrc}
            height={223}
            alt={title ? title : "requirement-img"}
          />
        )}
        {number && <p>{number}</p>}
        {title && <h2>{title}</h2>}
        {description && <p>{description}</p>}
      </div>
    </div>
  );
};

const RequirementSection = ({
  title,
  description,
  buttonLabel,
  buttonLink,
  items,
  ...restProps
}) => {
  return (
    <Row>
      <Col lg={6}>
        <div className="d-flex flex-column justify-content-center h-100 requirement-section-p1">
          {title && <h1>{title}</h1>}
          {description && <p>{description}</p>}
          {buttonLabel && (
            <Link href={buttonLink ? ORIGINS.UK + buttonLink : ""}>
              {buttonLabel}
              <Image src={arrowRightWhite.src} alt="image" />
            </Link>
          )}
        </div>
      </Col>
      <Col lg={6} className="mySwiperMainAugmentation">
        <Swiper
          effect={"cards"}
          loop={true}
          grabCursor={true}
          className="mySwiper"
          modules={[Pagination, Navigation, EffectCards]}
          slidesPerView={1}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
          pagination={{
            clickable: true,
          }}
          navigation={{
            enabled: true,
            nextEl: ".swiper-button-prev",
            prevEl: ".swiper-button-next",
          }}
        >
          {items &&
            items.map((el, i) => {
              return (
                <SwiperSlide key={i}>
                  <Requirement
                    title={el.title}
                    description={el.description}
                    imgSrc={el.image}
                    number={el.number}
                  />
                </SwiperSlide>
              );
            })}
          {/* <SwiperSlide>
            <Requirement />
          </SwiperSlide>
          <SwiperSlide>
            <Requirement />
          </SwiperSlide> */}
        </Swiper>
        {items && items.length > 0 && (
          <div className="mySwipperButtons">
            <div className={"swiper-button-next"}>
              <Image src={rightArrow.src} alt="image" />
            </div>
            <div className={"swiper-button-prev"}>
              <Image src={leftArrow.src} alt="image" />
            </div>
          </div>
        )}
      </Col>
    </Row>
  );
};

export default RequirementSection;
