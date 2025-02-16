import { Col, Image, Row } from "react-bootstrap";
import styles from "./Steps.module.css";
import { getImageURL } from "@/lib/helpers";

const Step = ({
  count,
  title,
  description,
  imgSrc,
  isLast,
  isFirst,
  className,
  isBg,
  ...props
}) => {
  const thumbnail = imgSrc?.formats?.thumbnail || {};
  const imageUrl = imgSrc?.url || thumbnail?.url;

  return (
    <div className={`d-lg-flex ${styles.step}`}>
      <div
        className={`d-lg-flex align-items-lg-center flex-lg-column ${
          styles["step-count"]
        } ${isLast ? styles["last-count"] : ""}`}
      >
        <div
          className={`${styles[`el-1`]} ${
            isFirst ? styles["active-el"] : ""
          }  ${isBg && isFirst ? styles["active-el-bg"] : ""}`}
        ></div>
        <div className={`${styles.circle} ${styles[className]}`}>{count}</div>
        <div
          className={`${styles[`el-1`]} ${isLast ? styles["active-el"] : ""} ${
            isBg && isLast ? styles["active-el-bg"] : ""
          }`}
        ></div>
      </div>
      <div>
        <div
          className={`${styles["step-card-el"]} d-lg-flex justify-content-lg-center align-items-lg-center gap-lg-3 gap-0 w-100 mb-md-0 mb-3`}
        >
          <h3 className={`fw500 font22 colorBlack ${styles["step-title"]}`}>
            {title}
          </h3>
          <p className={`colorGray font18 fw400 ${styles["step-description"]}`}>
            {description}
          </p>
          {imageUrl && (
            <Image
              alt={title}
              src={getImageURL(imageUrl)}
              className={`img-fluid ${styles["step-img"]}`}
            />
          )}
        </div>
        {!isLast && <hr className="m-lg-0" />}
      </div>
    </div>
  );
};

const Steps = ({ steps, isBg, className, ...props }) => {
  return (
    <>
      {steps && (
        <Row className="py-3">
          <hr className="m-lg-0" />
          <Col className="col-12 position-relative">
            <div className={styles["main-steps"]}>
              {!!steps.length &&
                steps.map((el, i) => {
                  return (
                    <Step
                      key={i}
                      count={el.priority}
                      title={el.title}
                      description={el.description}
                      imgSrc={el.imgSrc}
                      isBg={isBg}
                      className={className}
                      isLast={i === steps?.length - 1}
                      isFirst={i === 0}
                    />
                  );
                })}
            </div>
          </Col>
          <hr className="m-lg-0" />
        </Row>
      )}
    </>
  );
};

export default Steps;
