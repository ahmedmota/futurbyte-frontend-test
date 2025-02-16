import React from "react";
import styles from "@/components/ViewOpenings/ViewOpenings.module.css";
import { Container } from "react-bootstrap";
import arrowRight from "./../../../public/arrow-right-white-btn.svg";
import Image from "next/image";
import Link from "next/link";
import { getImageURL } from "@/lib/helpers";

const ViewOpenings = ({ data }) => {
  return (
    <section>
      <Container>
        <div className="container my-5">
          <div className="row align-items-center">
            <div
              className={`${styles.image_section} col-md-6 order-md-1 order-2`}
            >
              {data.image && (
                <Image
                  alt={data.alternativeText}
                  height={data.image.height}
                  width={data.image.width}
                  src={getImageURL(data.image.url)}
                />
              )}
            </div>
            <div
              className={`${styles.content_section} col-md-6 order-md-2 order-1`}
            >
              <h2>{data.title}</h2>
              <p>{data.description}</p>
              <Link
                href={data.button_link || "#"}
                className={`${styles.btn_purple}`}
              >
                {data.button_label}
                <Image
                  src={arrowRight.src}
                  width={16}
                  height={16}
                  alt="arrow-right"
                />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ViewOpenings;
