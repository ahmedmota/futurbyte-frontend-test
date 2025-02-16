import React from "react";
import styles from "@/components/StaggedImages/StaggedImages.module.css";
import { Container } from "react-bootstrap";
import { getImageURL } from "@/lib/helpers";

const StaggedImages = ({ data }) => {
  return (
    <section>
      <Container className="my-5">
        <div className={`${styles.textRow} row`}>
          <div className="col-lg-6 mb-2 mb-lg-0">
            <h2 className="fw-bold">{data.title}</h2>
          </div>
          <div className={`${styles.rightText} col-lg-6 mb-2 mb-lg-0`}>
            <p>{data.description}</p>
          </div>
        </div>

        <div className={`${styles.staggeredRow}`}>
          <div className={`${styles.staggeredColumn}`}>
            <div
              className={styles.stagged1}
              style={{
                backgroundImage: getImageURL(`url(${data.images[3].url})`),
              }}
            ></div>
          </div>
          <div className={`${styles.staggeredColumn}`}>
            <div
              className={styles.staggedCenterImage}
              style={{
                backgroundImage: getImageURL(`url(${data.images[1].url})`),
                marginBottom: "5%",
              }}
            ></div>
            <div
              className={styles.staggedCenterImage}
              style={{
                backgroundImage: getImageURL(`url(${data.images[2].url})`),
                marginTop: "5%",
              }}
            ></div>
          </div>
          <div className={`${styles.staggeredColumn}`}>
            <div
              className={styles.stagged1}
              style={{
                backgroundImage: getImageURL(`url(${data.images[5].url})`),
              }}
            ></div>
          </div>
        </div>
        <div className={`${styles.staggeredRow}`}>
          <div className={`${styles.staggeredColumn2}`} style={{ flexGrow: 5 }}>
            <div
              className={styles.stagged1}
              style={{
                backgroundImage: getImageURL(`url(${data.images[0].url})`),
              }}
            ></div>
          </div>
          <div className={`${styles.staggeredColumn2}`}>
            <div
              className={styles.stagged1}
              style={{
                backgroundImage: getImageURL(`url(${data.images[4].url})`),
              }}
            ></div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default StaggedImages;
