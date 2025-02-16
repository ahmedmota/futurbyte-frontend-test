import { Row, Col, Image } from "react-bootstrap";
import styles from "./AugmentationFlexibility.module.css";

const AugmentationItem = ({
  title,
  description,
  imgSrc,
  borderBottom,
  borderBoth,
  ...restProps
}) => {
  return (
    <div
      className={`${styles["augmentation-item"]} ${
        styles[borderBoth ? "border-both" : ""]
      } ${styles[borderBottom ? "border-bottom" : ""]}`}
    >
      {imgSrc && (
        <Image
          src={imgSrc}
          width={31}
          height={33}
          alt={title ? title : "augmentation-img"}
        />
      )}
      <div className={styles["augmentation-item-content"]}>
        {title && <h5>{title}</h5>}
        {description && <p>{description}</p>}
      </div>
    </div>
  );
};

const AugmentationFlexibility = ({
  title,
  description,
  imgSrc,
  items,
  ...restProps
}) => {
  return (
    <Row className={styles["augmentation-flexibility"]}>
      <Col lg={6} className="order-2 order-lg-1">
        {imgSrc && (
          <div className={styles["augmentation-flexibility-img"]}>
            <Image src={imgSrc} alt={title ? title : "augmentation-img"} />
          </div>
        )}
      </Col>
      <Col lg={6} className="order-1 order-lg-2">
        <div className={styles["augmentation-flexibility-content"]}>
          <div className={styles["augmentation-flexibility-content-inner"]}>
            {title && <h2>{title}</h2>}
            {description && <p>{description}</p>}
          </div>
          {items &&
            items.map((el, i) => {
              return (
                <AugmentationItem
                  title={el.title}
                  description={el.description}
                  imgSrc={el.icon}
                  key={i}
                  borderBoth={true}
                />
              );
            })}

          {/* <AugmentationItem borderBottom={true} title={"Hourly"} />

          <AugmentationItem borderBottom={true} title={"Monthly"} /> */}
        </div>
      </Col>
    </Row>
  );
};

export default AugmentationFlexibility;
