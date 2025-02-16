import { Col, Image, Row } from "react-bootstrap";
import logo from "../../../../../../public/eazio-logo.svg";
import styles from "./ClientLogos.module.css";

const ClientLogo = ({ logoImg, ...restProps }) => {
  return (
    <div className={styles["client-logo"]}>
      <Image alt="client-logo" src={logoImg} />
    </div>
  );
};

const ClientLogos = ({ items, ...restProps }) => {
  return (
    <Row>
      {items &&
        items.map((el, i) => {
          return (
            <Col lg={3} md={6} xs={6} className="mb-4" key={i}>
              <ClientLogo logoImg={el.icon} />
            </Col>
          );
        })}
      {/* <Col lg={3}>
        <ClientLogo />
      </Col>
      <Col lg={3}>
        <ClientLogo />
      </Col>
      <Col lg={3}>
        <ClientLogo />
      </Col> */}
    </Row>
  );
};

export default ClientLogos;
