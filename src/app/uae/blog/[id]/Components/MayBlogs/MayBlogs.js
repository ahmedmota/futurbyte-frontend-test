import { Image } from "react-bootstrap";
import clockImg from "../../../../../../../public/calendar-2.svg";
import styles from "./MayBlogs.module.css";
import Link from "next/link";
import { ORIGINS } from "@/lib/constants";

const MayBlog = ({ title, blogImg, publishedDate, slug, ...restProps }) => {
  return (
    <Link
      className={`${styles["may-like-blog"]}`}
      href={`${slug ? ORIGINS.UAE + `blog/${slug}` : "#"}`}
    >
      {blogImg && (
        <div className={`${styles["may-like-blog-img"]}`}>
          <Image src={blogImg} alt="image" />
        </div>
      )}
      <div className={`${styles["may-like-blog-content"]}`}>
        {title && <h4>{title}</h4>}
        {publishedDate && (
          <div className={`${styles["may-like-blog-content-inner"]}`}>
            <Image alt="image" width={24} height={24} src={clockImg.src} />
            <span>{publishedDate}</span>
          </div>
        )}
      </div>
    </Link>
  );
};

const MayBlogs = ({ title, blogs, ...restProps }) => {
  return (
    <div className={`${styles["may-blogs-main"]}`}>
      {title && <h3 className={styles["may-blogs-main-heading"]}>{title}</h3>}
      {blogs &&
        blogs.map((el, i) => {
          return (
            <MayBlog
              title={el.title}
              blogImg={el.blogImg}
              publishedDate={el.publishedDate}
              slug={el.slug}
              key={i}
            />
          );
        })}
    </div>
  );
};

export default MayBlogs;
