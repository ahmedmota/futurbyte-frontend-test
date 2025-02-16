import { Card, CardBody, Image } from "react-bootstrap";
import styles from "./MultiServiceCard.module.css";
import { getImageURL } from "@/lib/helpers";

const MultiServiceCard = ({ imgSrc, title, description, ...props }) => {
  return (
    <Card className={styles["multi-service-card"]}>
      <CardBody
        className={`d-flex flex-column align-items-center ${styles["multi-service-card-body"]}`}
      >
        <Image
          alt={title}
          className={styles["multi-service-card-img"]}
          src={getImageURL(imgSrc?.url)}
        />
        <div
          className={`d-flex flex-column ${styles["multi-service-card-content"]}`}
        >
          <h3 className="text-center">{title}</h3>
          <p className="text-center m-0">{description}</p>
        </div>
      </CardBody>
    </Card>
  );
};

export default MultiServiceCard;
