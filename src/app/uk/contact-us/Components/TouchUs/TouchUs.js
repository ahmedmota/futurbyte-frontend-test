import Image from "next/image";
import { Container, Row, Col, Image as ReactImage } from "react-bootstrap";
import styles from "../TouchUs/TouchUs.module.css";
import Link from "next/link";
import cardImage from "../../../../../../public/card1.svg";

const TouchUs = ({
  title,
  description,
  touches,
  contacctbg,
  text,
  emailText,
}) => {
  return (
    <>
      <Container className={styles.spaceIngine}>
        <Row className={styles.topRow}>
          <Col xl={5}>
            <h2 className={styles.title}>{title}</h2>
          </Col>
          <Col xl={7}>
            <p className={styles.description}>{description}</p>
          </Col>
        </Row>
        <Row className="g-4 justify-content-center">
          {!!touches?.length &&
            touches.map((touch, index) => (
              <Col xl={3} md={6} key={index}>
                <div className={styles.cardImage}>
                  {touch.image ? (
                    <Image
                      src={touch.imgSrc}
                      className="img-fluid w-100"
                      height={touch.image?.height}
                      width={touch.image?.width}
                      alt={touch.image?.alternativeText}
                    />
                  ) : (
                    <ReactImage
                      src={cardImage}
                      className="img-fluid w-100"
                      alt="cardImg"
                    />
                  )}
                  <div className={styles.cardBody}>
                    <h5>{touch.title}</h5>
                    <p>{touch.description}</p>
                    <h4>
                      <Link href={`tel:${touch.telPhone}`}>
                        {touch.telPhone}
                      </Link>
                    </h4>
                  </div>
                </div>
              </Col>
            ))}
        </Row>
      </Container>
      <Container className={styles.contactBgContainer}>
        <Row
          style={{
            backgroundImage: `url(${contacctbg.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className={styles.contactBg}
        >
          <Col>
            <h3>{text}</h3>
            <Link href={`mailto:${emailText}`}>{emailText}</Link>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default TouchUs;
