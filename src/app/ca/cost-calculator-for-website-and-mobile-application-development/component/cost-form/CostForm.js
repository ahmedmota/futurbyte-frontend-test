import Image from "next/image";
import dollarSign from "../../../../../../public/dollar-circle.svg";
import calendarSign from "../../../../../../public/clock-form-estimate.svg";
import clockSign from "../../../../../../public/calendar-form-estimate.svg";
import styles from "./CostForm.module.css";

const CostForm = ({ estimatedValues, show, ...restProps }) => {
  console.log("Show");
  console.log(show);

  return (
    <div className={styles["cost-form-div"]}>
      <h2>Rough Estimate</h2>
      <div className={styles["input-main-top"]}>
        <div className={styles["input-main-div"]}>
          <label>Money saved with Futurbyte</label>
          <div className={styles["input-div"]}>
            <div className={styles["input-div-img"]}>
              <Image
                width={24}
                height={24}
                src={dollarSign.src}
                alt="dollar-sign"
              />
            </div>
            <input
              value={estimatedValues.moneySaved}
              className={`${styles["cost-input"]} ${
                show ? styles["cost-input-active"] : ""
              }`}
              type="text"
            />
          </div>
        </div>
        <div className={styles["input-main-div"]}>
          <label>Time saved with Futurbyte</label>
          <div className={styles["input-div"]}>
            <div className={styles["input-div-img"]}>
              <Image
                width={24}
                height={24}
                src={calendarSign.src}
                alt="dollar-sign"
              />
            </div>
            <input
              value={`${estimatedValues.timeSaved} ${
                estimatedValues.timeSaved > 1 ? "Hours" : "Hour"
              }`}
              className={`${styles["cost-input"]} ${
                show ? styles["cost-input-active"] : ""
              }`}
              type="text"
            />
          </div>
        </div>
        <div className={styles["input-main-div"]}>
          <label>Project Timeline</label>
          <div className={styles["input-div"]}>
            <div className={styles["input-div-img"]}>
              <Image
                width={24}
                height={24}
                src={clockSign.src}
                alt="dollar-sign"
              />
            </div>
            <input
              value={`${estimatedValues.projectTime} ${
                estimatedValues.projectTime > 1 ? "Days" : "Day"
              }`}
              className={`${styles["cost-input"]} ${
                show ? styles["cost-input-active"] : ""
              }`}
              type="text"
            />
          </div>
        </div>
        <div className={styles["input-main-div"]}>
          <label>Minimum Price</label>
          <div className={styles["input-div"]}>
            <div className={styles["input-div-img"]}>
              <Image
                width={24}
                height={24}
                src={dollarSign.src}
                alt="dollar-sign"
              />
            </div>
            <input
              value={estimatedValues.minPrice}
              className={`${styles["cost-input"]} ${
                show ? styles["cost-input-active"] : ""
              }`}
              type="text"
            />
          </div>
        </div>
        <div className={styles["input-main-div"]}>
          <label>Maximum Price</label>
          <div className={styles["input-div"]}>
            <div className={styles["input-div-img"]}>
              <Image
                width={24}
                height={24}
                src={dollarSign.src}
                alt="dollar-sign"
              />
            </div>
            <input
              value={estimatedValues.maxPrice}
              className={`${styles["cost-input"]} ${
                show ? styles["cost-input-active"] : ""
              }`}
              type="text"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CostForm;
