import Image from "next/image";
import growthIcon from "../../../../../../public/growth-icon.svg";
import styles from "./Growth.module.css";

const Growth = ({ title, description, imgSrc, ...restProps }) => {
  return (
    <div className={`d-flex flex-column gap-3 ${styles["growth-main"]}`}>
      {imgSrc && <Image src={imgSrc} width={57.49} height={64} alt="growth" />}
      <hr className={`m-0 p-0 ${styles["growth-hr"]}`} />
      <div className={`${styles["growth-main-content"]}`}>
        {title && <h4>{title}</h4>}
        {description && <p>{description}</p>}
      </div>
    </div>
  );
};

export default Growth;
