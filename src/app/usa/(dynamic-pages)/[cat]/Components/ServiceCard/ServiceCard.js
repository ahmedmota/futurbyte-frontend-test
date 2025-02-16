import Link from "next/link";
import { Card, CardBody, Image } from "react-bootstrap";
import rightArrowBlack from "../../../../../../../public/arrow-right-black.svg";
import styles from "./ServiceCard.module.css";
import { getImageURL } from "@/lib/helpers";
import { ORIGINS } from "@/lib/constants";

const ServiceCard = ({
  imgSrc,
  title,
  description,
  link,
  linkText,
  ...props
}) => {
  return (
    <Card className={styles["service-card"]}>
      <CardBody
        className={`d-flex flex-column align-items-center ${styles["service-card-body"]}`}
      >
        <Image
          width={68}
          height={56}
          alt={title}
          src={getImageURL(imgSrc?.url)}
        />
        <div className={`d-flex flex-column ${styles["service-card-content"]}`}>
          <h3 className="text-center">{title}</h3>
          <p className="text-center m-0">{description}</p>
        </div>
        {link && (
          <Link
            className={`${styles.textRemove} d-flex gap-1 align-items-center`}
            href={link ? ORIGINS.US + link : "#"}
          >
            <span className={styles["link-text"]}>{linkText}</span>
            <Image alt="arrow-right" src={rightArrowBlack.src} />
          </Link>
        )}
      </CardBody>
    </Card>
  );
};

export default ServiceCard;
