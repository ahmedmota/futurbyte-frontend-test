import { Card, CardBody } from "react-bootstrap";
import styles from "./Commitment.module.css";
import Image from "next/image";
import { getImageURL } from "@/lib/helpers";

const Commitment = ({ title, description, imgSrc, ...props }) => {
  const thumbnail = imgSrc?.formats?.thumbnail || {};

  // Set default width and height from the thumbnail format or fallback values
  const imageWidth = imgSrc?.width || thumbnail?.width; // Default to 245px if not available
  const imageHeight = imgSrc?.height || thumbnail?.height; // Default to 68px if not available
  const imageUrl = imgSrc?.url || thumbnail?.url; // Fallback

  return (
    <Card className={`${styles["commitment-card"]} mb-4`}>
      <CardBody className={styles["commitment-body"]}>
        {imageUrl && (
          <Image
            alt={title}
            src={getImageURL(imageUrl)} // Use the thumbnail URL or fallback to the original URL
            className={`img-fluid`}
            width={58.78} // Use width from the thumbnail format
            height={58.78} // Use height from the thumbnail format
          />
        )}
        <div className={`${styles["commitment-content"]}`}>
          <h4 className={`${styles["c-title"]}`}>{title}</h4>
          <p className={`${styles["c-description"]}`}>{description}</p>
        </div>
      </CardBody>
    </Card>
  );
};

export default Commitment;
