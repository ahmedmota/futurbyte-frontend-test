"use client";

import { useState } from "react";
import styles from "./TableContents.module.css";
import addImg from "../../../../../../../public/add.svg";
import Image from "next/image";
import Link from "next/link";

const TableContents = ({ items }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`${styles["table-contents-main"]} ${
        open ? styles["table-contents-main-active"] : ""
      }`}
    >
      <div className={`${styles["t-c-m-inner"]}`}>
        <h3 onClick={() => setOpen(!open)}>
          Table of Contents
          <Image
            className="d-lg-none d-block"
            width={20}
            height={20}
            src={addImg.src}
            alt="add-arrow"
          />
        </h3>
        <div
          className={`${styles["t-c-m-content"]} ${
            open ? styles["t-c-m-content-active"] : ""
          }`}
        >
          {items &&
            items.map((el, i) => {
              const hrefEL = el
                .trim()
                .toLowerCase()
                .replace(/\s+/g, "-")
                .replace(/[^\w-]/g, "");

              return (
                <>
                  <p>
                    <Link href={`#${hrefEL}`}>{el.trim()}</Link>
                  </p>
                  {i != items.length - 1 && <hr className="m-0 mb-3" />}
                </>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default TableContents;
