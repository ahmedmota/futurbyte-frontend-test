import styles from "./TrustBanner.module.css";
import arrowRight from "../../../../../../public/arrowrighttime.svg";
import { Image } from "react-bootstrap";
import Link from "next/link";

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
        {title && <h1>{title}</h1>}
        {description && <p>{description}</p>}
      </div>
      {buttons && (
        <div className={styles["trust-banner-btns-main"]}>
          {buttons.length &&
            buttons.map((el, i) => {
              return (
                <Link
                  key={el.id}
                  className={styles["trust-banner-btn"]}
                  href={el.link ? el.link : ""}
                >
                  {el.label}
                </Link>
              );
            })}
        </div>
      )}
      {buttonLabel && (
        <Link
          className={styles["schedule-btn"]}
          href={buttonLink ? buttonLink : ""}
        >
          <span>{buttonLabel}</span>
          <Image alt="arrow-right" src={arrowRight.src} />
        </Link>
      )}
    </div>
  );
};

export default TrustBanner;
