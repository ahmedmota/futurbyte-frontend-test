import { Image, Row, Col } from "react-bootstrap";
import styles from "./SpecificCard.module.css";
import { getImageURL } from "@/lib/helpers";

const SpecificCard = ({
  title,
  problem,
  subTitleOne,
  subTitleTwo,
  solution,
  imgSrc,
  ...props
}) => {
  return (
    <div className={styles["specific-card-main"]}>
      <div className={`${styles["specific-card"]}`}>
        <Image
          alt={title}
          className={styles["specific-card-img"]}
          src={getImageURL(imgSrc.url)}
          width={imgSrc.width}
          height={imgSrc.height}
        />
        <div className={styles["overlay"]}>
          <div className={styles["overlay-content"]}>
            <p className={styles.problem}>
              {subTitleOne && (
                <span className={styles["o-c-heading"]}>{subTitleOne}</span>
              )}
              <br />
              {problem}
            </p>
            <p className={styles.solution}>
              {subTitleTwo && (
                <span className={styles["o-c-heading"]}>{subTitleTwo}</span>
              )}
              <br />
              {solution}
            </p>
          </div>
        </div>
      </div>
      <h3 className={`mt-3 ${styles["s-c-m-heading"]}`}>{title}</h3>
    </div>
  );
};

const SpecificCards = ({ specificCards, title, ...props }) => {
  return (
    <Row>
      <h1 className={styles["s-c-m-main-heading"]}>{title}</h1>
      {specificCards?.length &&
        specificCards.map((el, i) => {
          return (
            <Col md={4} key={el.id}>
              <SpecificCard
                subTitleOne={el.subTitleOne}
                subTitleTwo={el.subTitleTwo}
                problem={el.subTitleOneDescription}
                solution={el.subTitleTwoDescription}
                imgSrc={el.imgSrc}
                title={el.title}
                key={i}
              />
            </Col>
          );
        })}
    </Row>
  );
};

export default SpecificCards;
