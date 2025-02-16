import { Image } from "react-bootstrap";
import styles from "./ApproachCard.module.css";
import { getImageURL } from "@/lib/helpers";

const ApproachCard = ({ title, description, imgSrc, ...props }) => {
  return (
    <div>
      <Image
        className={`img-fluid ${styles["approach-card-img"]}`}
        alt={title}
        src={getImageURL(imgSrc?.url)}
      />
      <div className={`${styles["approach-card-content"]}`}>
        <h3 className={styles["a-c-c-heading"]}>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default ApproachCard;
