import styles from "./CostInformation.module.css";

const CostInformation = ({ title, description, ...restProps }) => {
  return (
    <div className={styles["cost-information"]}>
      {title && <h1>{title}</h1>}
      {description && <p>{description}</p>}
    </div>
  );
};

export default CostInformation;
