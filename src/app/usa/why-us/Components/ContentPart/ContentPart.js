import { Col, Image, Row } from "react-bootstrap";
import styles from "./ContentPart.module.css";
import arrowRight from "../../../../../../public/arrow-right-white.svg";
import { getImageURL } from "@/lib/helpers";
import Link from "next/link";
import { ORIGINS } from "@/lib/constants";

const ContantPart = ({
  title,
  description,
  imgSrc,
  contactFirst,
  contentClasses,
  buttonText,
  buttonLink = null,
  ...props
}) => {
  /// Get the image thumbnail format and its dimensions
  const thumbnail = imgSrc?.formats?.thumbnail || {};

  // Set default width and height from the thumbnail format or fallback values
  const imageWidth = imgSrc?.width || thumbnail?.width; // Default to 245px if not available
  const imageHeight = imgSrc?.height || thumbnail?.height; // Default to 68px if not available
  const imageUrl = imgSrc?.url || thumbnail?.url; // Fallback

  return (
    <Row className={`${styles.contentPartMain}`}>
      <Col
        md={5}
        className={`d-md-flex mb-md-0 mb-2 flex-md-column justify-content-md-center ${
          styles.content
        } ${contentClasses ? contentClasses : ""} ${
          contactFirst ? "order-1 order-md-1" : "order-1 order-md-2"
        }`}
      >
        {title && <h2>{title}</h2>}
        {description && <p className="font18 fw400">{description}</p>}
        {buttonText && (
          <Link
            className={`${styles.actionBtn} mb-md-0 mb-3`}
            href={buttonLink ? ORIGINS.US + buttonLink : "#"}
          >
            {buttonText}
            <Image
              src={arrowRight.src}
              alt={title} // Always add an alt tag for accessibility and SEO
              layout="responsive" // This makes the image responsive
            />
          </Link>
        )}
      </Col>
      {imageUrl && (
        <Col
          md={7}
          className={`position-relative ${styles["content-img-main-div-img"]} ${
            contactFirst
              ? styles["content-img-main-div-img-first"]
              : styles["content-img-main-div-img-second"]
          } ${styles["content-img-main"]} ${
            contactFirst ? `${styles.right}` : `${styles.left}`
          } ${contactFirst ? "order-2 order-md-2" : "order-2 order-md-1"}`}
        >
          <Image
            src={getImageURL(imageUrl)}
            width={imageWidth}
            height={imageHeight}
            alt={title} // Always add an alt tag for accessibility and SEO
            layout="responsive" // This makes the image responsive
            className={`img-fluid ${styles["content-img"]}`}
          />
        </Col>
      )}
    </Row>
  );
};

export default ContantPart;
