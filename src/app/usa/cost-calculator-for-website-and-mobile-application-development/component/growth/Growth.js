import Image from "next/image";
import styles from "./Growth.module.css";
import { Col } from "react-bootstrap";

const Growth = ({ title, description, imgSrc, addSpace, ...restProps }) => {
  return (
    <Col
      className={`${styles["main-div-growth"]} ${
        addSpace ? styles["add-space"] : ""
      }`}
      lg={6}
      md={6}
    >
      <div className={`d-flex flex-column ${styles["growth-main"]}`}>
        {imgSrc && (
          <Image src={imgSrc} width={57.49} height={64} alt="growth" />
        )}
        <hr className={`m-0 p-0 ${styles["growth-hr"]}`} />
        <div className={`${styles["growth-main-content"]}`}>
          {title && <h4>{title}</h4>}
          {description && <p>{description}</p>}
        </div>
      </div>
    </Col>
  );
};

export default Growth;
