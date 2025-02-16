import styles from "./BlogDetailForm.module.css";
import submitFormArrow from "../../../../../../../public/submit-form-arrow.svg";
import Image from "next/image";

const CustomInput = ({ placeholder, type }) => {
  return (
    <input
      placeholder={placeholder}
      type={type}
      className={`${styles["custom-input"]}`}
    />
  );
};

const BlogDetailForm = () => {
  return (
    <div className={`${styles["blog-inner-form"]} mb-3`}>
      <h3>Have questions or feedback?</h3>
      <p>
        Get in touch with us and we&lsquo;l get back to you and help as soon as
        we can!
      </p>
      <form className={styles["blog-form"]}>
        <div className={styles["n-p-form"]}>
          <div className="w-50">
            <CustomInput placeholder={"Name*"} type={"text"} />
          </div>
          <div className="w-50">
            <CustomInput placeholder={"Phone*"} type={"number"} />
          </div>
        </div>
        <div className="w-100">
          <CustomInput placeholder={"Email Address*"} type={"email"} />
        </div>
        <div className="w-100">
          <textarea
            placeholder="Reply*"
            className={styles["custom-text-area"]}
          />
        </div>
        <button type="sbumit">
          Submit Reply
          <Image alt="arrow" width={16} height={16} src={submitFormArrow.src} />
        </button>
      </form>
    </div>
  );
};

export default BlogDetailForm;
