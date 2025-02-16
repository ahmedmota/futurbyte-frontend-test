import { Col, Image, Row } from "react-bootstrap";
import styles from "./AugmentationCard.module.css";

const AugmentationItem = ({
  imgSrc,
  title,
  description,
  link,
  linkText,
  ...props
}) => {
  return (
    <div className={styles["augmentation-card"]}>
      <div
        className={`d-flex flex-column align-items-center ${styles["augmentation-card-body"]}`}
      >
        <Image width={42} height={47} alt={title} src={imgSrc} />
        <div
          className={`d-flex flex-column ${styles["augmentation-card-content"]}`}
        >
          {title && <h3>{title}</h3>}
          {description && <p>{description}</p>}
        </div>
      </div>
    </div>
  );
};

const AugmentationCard = ({ title, description, items, ...restProps }) => {
  return (
    <div className={styles["augmentation-cards"]}>
      <Row>
        <Col lg={4} className="mb-4">
          <div className={styles["first-item"]}>
            {title && <h3>{title}</h3>}
            {description && <p>{description}</p>}
          </div>
        </Col>
        {items &&
          items.map((el, i) => {
            return (
              <Col lg={4} className="mb-4" key={i}>
                <AugmentationItem
                  title={el.title}
                  description={el.description}
                  imgSrc={el.icon}
                />
              </Col>
            );
          })}
      </Row>
    </div>
  );
};

export default AugmentationCard;
