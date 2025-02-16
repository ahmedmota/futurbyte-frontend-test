import styles from "./Top.module.css";
import calendar from "../../../../../../../public/calendar-2.svg";
import clock from "../../../../../../../public/clock.svg";
import { Image } from "react-bootstrap";

const Top = ({
  title,
  description,
  tags,
  blogImg,
  author,
  authorName,
  publishedDate,
  updatedDate,
  readTime,
  blogImgAlt,
  ...restProps
}) => {
  return (
    <div className={`${styles["top-main-all"]}`}>
      <div className={`${styles["top-main"]}`}>
        <div className={`${styles["top-inner"]}`}>
          <h3 className={`${styles["page-link"]} d-lg-block d-none`}>
            INSIGHTS/BLOG
          </h3>
          {title && <h1 className={`${styles["blog-title"]}`}>{title}</h1>}
          {tags?.length > 1 && (
            <div
              className={`${styles["blog-tags-main"]} d-flex justify-content-center`}
            >
              {tags.map((el, i) => {
                return <button key={i}>{el}</button>;
              })}
            </div>
          )}
          {description && (
            <p className={`${styles["blog-writer-info"]} d-lg-block d-none`}>
              By{" "}
              {authorName && (
                <span className={`${styles["blog-writer-name"]}`}>
                  {authorName}
                </span>
              )}{" "}
              {description}
            </p>
          )}
        </div>
        <div className={`${styles["blog-info-part"]}`}>
          <Image
            height={500}
            width={1095}
            alt={blogImgAlt}
            src={blogImg}
            className={`${styles["blog-img"]} mb-3 w-100`}
          />
          <div className={`${styles["blog-info-part-main"]}`}>
            <div className={`${styles["blog-info-part-inner"]}`}>
              {author && (
                <div className={`${styles["img-content"]}`}>
                  {author.profile && (
                    <Image
                      src={author.profile}
                      width={32}
                      height={32}
                      alt="image"
                    />
                  )}
                  {author.name && <span>{author.name}</span>}
                </div>
              )}
            </div>
            <div className={`${styles["blog-info-part-md"]}`}>
              <div className={`${styles["img-content"]}`}>
                <Image src={calendar.src} width={24} height={24} alt="logo" />
                {publishedDate && (
                  <span className="d-lg-flex d-none">
                    Published in Blog on {publishedDate}
                  </span>
                )}
                {publishedDate && (
                  <span className="d-lg-none d-flex">{publishedDate}</span>
                )}
              </div>
              <div className={`${styles["img-content"]} d-lg-flex d-none`}>
                <Image src={calendar.src} width={24} height={24} alt="logo" />
                {updatedDate && <span>Last Updated on {updatedDate}</span>}
              </div>
              <div className={`${styles["img-content"]}`}>
                <Image src={clock.src} width={24} height={24} alt="logo" />
                {readTime ? readTime : <span>5 min read</span>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Top;
