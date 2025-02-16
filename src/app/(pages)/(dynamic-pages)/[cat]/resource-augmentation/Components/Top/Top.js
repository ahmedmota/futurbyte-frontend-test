import styles from "./Top.module.css";
import btnArrow from "../../../../../../../../public/arrow-right-btn.svg";
import { Image } from "react-bootstrap";
import Link from "next/link";

const Top = ({
  title,
  descriptoin,
  buttonLabel,
  buttonLink,
  bannerImg,
  ...restProps
}) => {
  return (
    <div className={styles["top-r-augmentation"]}>
      <div className={styles["top-r-augmentation-inner"]}>
        {title && <h1>{title}</h1>}
        {descriptoin && <p>{descriptoin}</p>}
      </div>
      {buttonLabel && (
        <Link
          href={buttonLink ? buttonLink : ""}
          className={styles["top-r-augmentation-btn"]}
        >
          {buttonLabel}
          <Image alt="arrow-btn" src={btnArrow.src} width={16} height={16} />
        </Link>
      )}
      {bannerImg && (
        <div className={styles["top-r-augmentation-img-div"]}>
          <Image
            className={styles["top-r-augmentation-img"]}
            src={bannerImg}
            alt="image"
          />
        </div>
      )}
    </div>
  );
};

export default Top;
