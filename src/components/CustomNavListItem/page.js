import styles from "../Header/Header.module.css";
import Link from "next/link";
import dropdown from "../../../public/dropdown.png";
import { Image } from "react-bootstrap";
import { useState } from "react";

export default function CustomNavListItem({ label, link, items, onClick }) {
  const [hovered, setHovered] = useState("");

  function closeMenu() {
    setHovered("");
  }

  return (
    <div
      className={`position-relative ${styles["my-dropdown-menu-link"]}`}
      onClick={onClick}
    >
      <Link onMouseOver={() => setHovered(label)}
        onClick={() => setHovered("")}
        className={`${styles.service} `} href={link ? link : "#"}>
        {label}
        {items && (
          <Image className="img-fluid" src={dropdown.src} alt="dropdown" />
        )}
      </Link>
      {items && hovered != "" && (
        <div className={`${styles.scale} ${styles["my-dropwdown-menu"]}`}>
          <ul>
            {items.map((el, i) => {
              return (
                <li key={i}>
                  <Link onClick={closeMenu} href={el.link ? el.link : "#"}>{el.label}</Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
