"use client";

import styles from "./Recognised.module.css";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";
import { Image } from "react-bootstrap";
import Link from "next/link";
import learnMoreArrow from "../../../../../../public/related-blog-arrow.svg";
import chapsImg from "../../../../../../public/chaps.svg";

const RecognisedCard = ({
  title,
  description,
  blogImg,
  category,
  slug,
  ...restProps
}) => {
  return (
    <div className={styles["recognised-card-main"]}>
      <div className={styles["recognised-card-main-inner"]}>
        <div className={styles["recognised-card-img"]}>
          <Image src={blogImg} alt="recognised-card-img" />
          {category && <button>{category}</button>}
        </div>
        <div className={styles["r-b-m-i-content"]}>
          {title && <h1>{title}</h1>}
          {description && <p>{description}</p>}
          {slug && (
            <Link
              className={styles["recognised-l-m"]}
              href={`${slug ? `${slug}` : "#"}`}
            >
              Learn More{" "}
              <Image
                alt="icon"
                src={learnMoreArrow.src}
                width={16}
                height={16}
              />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

const Recognised = ({ title, description, items, ...restProps }) => {
  // Check if the number of items is 3 and add an additional item to make it 4
  const adjustedItems = items.length === 3 ? [...items, items[0]] : items;

  return (
    <div className={`position-relative`}>
      <div className={styles["recognised-content"]}>
        {title && <h1>{title}</h1>}
        {description && <p>{description}</p>}
      </div>
      {adjustedItems && (
        <div className="d-md-block d-none">
          <Swiper
            modules={[Navigation]}
            className={styles["recognise-swiper"]}
            slidesPerView={3}
            spaceBetween={24}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
            navigation={{
              enabled: true,
              nextEl: `.${styles["swiper-button-next"]}`,
              prevEl: `.${styles["swiper-button-prev"]}`,
            }}
            loop={true}
          >
            {adjustedItems.length &&
              adjustedItems.map((el, i) => {
                return (
                  <SwiperSlide className={styles["slide-recognised"]} key={i}>
                    <RecognisedCard
                      blogImg={el.image}
                      title={el.title}
                      description={el.description}
                      slug={el.buttonLink ? el.buttonLink : "#"}
                    />
                  </SwiperSlide>
                );
              })}
          </Swiper>
          <div className={styles["swiper-button-next"]}></div>
          <div className={styles["swiper-button-prev"]}></div>
        </div>
      )}
      {items && (
        <div className="d-md-none d-block">
          <Swiper
            modules={[Pagination]}
            className={styles["recognise-swiper"]}
            slidesPerView={1}
            spaceBetween={24}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
            pagination={{
              clickable: true,
            }}
            loop={true}
          >
            {items.length &&
              items.map((el, i) => {
                return (
                  <SwiperSlide className={styles["slide-recognised"]} key={i}>
                    <RecognisedCard
                      blogImg={el.image}
                      title={el.title}
                      description={el.description}
                      slug={el.buttonLink ? el.buttonLink : "#"}
                    />
                  </SwiperSlide>
                );
              })}
          </Swiper>
        </div>
      )}
    </div>
  );
};

export default Recognised;
