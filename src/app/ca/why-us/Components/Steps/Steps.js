import { Row, Col } from "react-bootstrap";
import Commitment from "../../../about-us/Components/Commitment/Commitment";
import styles from "./Steps.module.css";

const Steps = ({ steps, ...props }) => {
  return (
    <Row className={styles[steps ? "why-steps" : ""]}>
      {steps &&
        steps.map((el, i) => {
          return (
            <Col
              key={el.id}
              xl={4}
              className={`${i === steps.length - 1 ? "mb-md-4" : "mb-4"} ${
                styles["commitment-col"]
              }`}
            >
              <Commitment
                title={el.title}
                description={el.description}
                imgSrc={el.iconSrc}
              />
            </Col>
          );
        })}
    </Row>
  );
};

export default Steps;
