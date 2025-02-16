import React from "react";
import styles from "../thank-you/page.module.css";
import { Container, Row } from "react-bootstrap";
import thankyou from "../../../../public/thankyou.png";
import { getMetaFromJSON } from "@/lib/helpers/getMetaFromJSON";
import BackButton from "./Components/back-button";

export async function generateMetadata() {
  return getMetaFromJSON({
    metaTitle: "Thank You",
    metaDescription: "Thank You",
  });
}

const page = () => {

  return (
    <>
      <section className={styles.thanksreach}>
        <Container>
          <Row>
            <div
              className={styles.thankyou}
              style={{ backgroundImage: `url(${thankyou.src})` }}
            >
              <h2>Thank You for Reaching Out!</h2>
              <p>
                We have received your query. One of our expert consultants will be
                in touch with your shortly.
              </p>
              <BackButton />
            </div>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default page;
