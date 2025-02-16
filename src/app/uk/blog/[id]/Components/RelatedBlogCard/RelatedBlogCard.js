"use client";

import { Col, Image, Row } from "react-bootstrap";
import styles from "./RelatedBlogCard.module.css";
import Link from "next/link";
import learnMoreArrow from "../../../../../../../public/related-blog-arrow.svg";
import { useRouter } from "next/navigation";
import { ORIGINS } from "@/lib/constants";

export function BlogCard({
  title,
  description,
  blogImg,
  category,
  slug,
  ...restProps
}) {
  let slugWithURL = slug;
  if (slug) {
    if (slug.startsWith("/")) {
      slugWithURL = slug.slice(1);
    }
    slugWithURL = `/blog/${slugWithURL}`;
  } else {
    slugWithURL = "#";
  }
  return (
    <div className={styles["related-blog-main"]}>
      <div className={styles["related-blog-main-inner"]}>
        <div className={styles["related-blog-img"]}>
          <Image src={blogImg} alt="related-blog-img" />
          {category && <button>{category}</button>}
        </div>
        <div className={styles["r-b-m-i-content"]}>
          {title && <h4>{title}</h4>}
          {description && <p>{description}</p>}
          <Link className={styles["related-l-m"]} href={ORIGINS.UK + slugWithURL}>
            Learn More{" "}
            <Image alt="icon" src={learnMoreArrow.src} width={16} height={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}

const RelatedBlogCard = ({ title, blogs, ...restProps }) => {
  const router = useRouter();

  return (
    <div className={`${styles["related-blogs-main-top"]}`}>
      {title && <h3 className={styles["r-b-m-t-main-heading"]}>{title}</h3>}
      {blogs && (
        <Row>
          {blogs.map((el, i) => {
            return (
              <Col className={styles["p-mob-x"]} lg={4} key={i}>
                <div
                  className={styles["blog-card-rout"]}
                  onClick={() => {
                    let slugWithURL = el.slug;
                    if (el.slug) {
                      if (el.slug.startsWith("/")) {
                        slugWithURL = el.slug.slice(1);
                      }
                      slugWithURL = `/blog/${slugWithURL}`;
                    } else {
                      slugWithURL = "#";
                    }
                    router.push(slugWithURL);
                  }}
                >
                  <BlogCard
                    title={el.title}
                    description={el.description}
                    blogImg={el.image}
                    category={el.category}
                    slug={el.slug}
                  />
                </div>
              </Col>
            );
          })}
        </Row>
      )}
    </div>
  );
};

export default RelatedBlogCard;
