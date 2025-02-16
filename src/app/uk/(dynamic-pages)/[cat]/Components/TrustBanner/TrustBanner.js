import styles from "./TrustBanner.module.css";
import arrowRight from "../../../../../../../public/arrowrighttime.svg";
import { Image } from "react-bootstrap";
import Link from "next/link";
import { ORIGINS } from "@/lib/constants";

const TrustBanner = ({
  title,
  description,
  buttons,
  buttonLink,
  buttonLabel,
  ...props
}) => {
  return (
    <div className={styles["trust-banner-main"]}>
      <div className={styles["trust-banner-main-content"]}>
        {title && <h2>{title}</h2>}
        {description && <p>{description}</p>}
      </div>
      {buttons && (
        <div className={styles["trust-banner-btn-main-top"]}>
          <div className={styles["trust-banner-btns-main"]}>
            {buttons.length &&
              buttons.map((el, i) => {
                return (
                  <button
                    key={el.id}
                    className={`${styles["trust-banner-btn"]} ${
                      i == buttons.length - 1
                        ? styles["trust-banner-btn-last"]
                        : ""
                    }`}
                  >
                    {el.label}
                  </button>
                );
              })}
          </div>
        </div>
      )}
      {buttonLabel && (
        <Link
          className={styles["schedule-btn"]}
          href={buttonLink ? ORIGINS.UK + buttonLink : ""}
        >
          <span>{buttonLabel}</span>
          <Image alt="arrow-right" src={arrowRight.src} />
        </Link>
      )}
    </div>
  );
};

export default TrustBanner;
