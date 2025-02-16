"use client";

import { Col, Row } from "react-bootstrap";
import styles from "./CalculatingCost.module.css";
import Link from "next/link";
import rightArrow from "../../../../../../public/right-arrow-btn.svg";
import Image from "next/image";
import { useState } from "react";
import { ORIGINS } from "@/lib/constants";

const CalculatingCostItem = ({
  isFirst,
  isLast,
  count,
  title,
  description,
  onHover,
  currentActive,
}) => {
  return (
    <div className={`${styles["calculating-cost-item-inner"]}`}>
      <div
        className={`${styles["btn-count"]} ${
          currentActive == count ? styles["active"] : ""
        } ${isFirst ? styles["first-btn-count"] : ""} ${
          isLast ? styles["last-btn-count"] : ""
        }`}
        onMouseEnter={() => onHover(count)}
      >
        {count}
      </div>
      <div
        className={styles["calculating-cost-item"]}
        onMouseEnter={() => onHover(count)}
      >
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

const CalculatingCost = ({ data, ...restProps }) => {
  // Static data for now, replace with API data later
  const [hoveredId, setHoveredId] = useState(1);

  const [items, setItems] = useState(data.items);

  return (
    <Row className={`${styles["calculating-cost-main-row"]}`}>
      <Col lg={6}>
        <div className={styles["calculating-cost-main"]}>
          {items &&
            items.map((el, i) => {
              return (
                <CalculatingCostItem
                  count={el.number}
                  title={el.title}
                  description={el.description}
                  onHover={setHoveredId}
                  isFirst={i === 0}
                  isLast={items.length - 1 === i}
                  currentActive={hoveredId}
                  key={i}
                />
              );
            })}
        </div>
      </Col>
      <Col lg={6}>
        <div className={styles["calculating-cost-detail"]}>
          {data.title && <h1 className={""}>{data.title}</h1>}
          {data.description && <p className={""}>{data.description}</p>}
          {data.button_label && (
            <Link
              className={"order-3"}
              href={data.button_link ? ORIGINS.UK + data.button_link : "#"}
            >
              {data.button_label}
              <Image
                width={16}
                height={16}
                alt="right-arrow"
                src={rightArrow.src}
              />{" "}
            </Link>
          )}
        </div>
      </Col>
    </Row>
  );
};

export default CalculatingCost;
