"use client";

import {
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Image,
} from "react-bootstrap";
import styles from "./TeamCard.module.css";
import { useState } from "react";
import { getImageURL } from "@/lib/helpers";

const TeamCard = ({ name, designation, profileImg, ...props }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Card
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`mb-3 ${styles["team-card"]} ${
        isHovered == true ? styles.hovered : ""
      }`}
    >
      <div
        className={`${styles["team-profile-main"]} ${
          isHovered ? styles["team-profile-bg"] : ""
        }
         ${isHovered ? `${styles["team-profile-main-mb"]}` : ``}`}
      >
        {/* <CardImg
          as={Image}
          className={`fluid ${styles["profile-img"]}`}
          alt="Card image"
          src={getImageURL(profileImg.url)}
          width={302}
          height={312}
        /> */}
        <Image
          className={`fluid ${styles["profile-img"]}`}
          alt="Card image"
          src={getImageURL(profileImg.url)}
        />
      </div>
      <CardBody className={styles["team-card-body"]}>
        <CardTitle className={`m-0 ${styles["team-name"]}`}>{name}</CardTitle>
        <CardText className={styles["team-designation"]}>
          {designation}
        </CardText>
      </CardBody>
    </Card>
  );
};

export default TeamCard;
