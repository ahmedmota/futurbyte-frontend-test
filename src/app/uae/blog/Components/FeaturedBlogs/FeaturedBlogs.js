import styles from "./FeaturedBlogs.module.css";
import clock from "../../../../../../public/clock.png";
import ellise from "../../../../../../public/ellise.png";

import { Container, Image } from "react-bootstrap";
import Link from "next/link";
import { ORIGINS } from "@/lib/constants";

export default function FeaturedBlogs({ featuredBlogs }) {
  return (
    <section className={styles.featuredBlogs}>
      <Container>
        <h2 className={styles.title}>Featured Blogs</h2>
        <div className={styles.blogFeadtu}>
          <div className={styles.capitalize}>
            {featuredBlogs?.slice(0, 1).map((blog, i) => (
              <Link
                href={blog.slug ? ORIGINS.UAE + `blog/${blog.slug}` : "#"}
                key={i}
                className={styles["blog-linking"]}
              >
                <Image
                  src={blog.image}
                  alt={blog?.imageData?.alternativeText}
                  className={`${styles.softfpo} ${styles.softfpoalternativeText}  img-fluid`}
                />
                <div className={styles.software}>
                  <h4>{blog.category}</h4>
                </div>
                <div className={styles.practices}>
                  <h3>{blog.title}</h3>
                  <div className={styles.date}>
                    <div className={styles.ellips}>
                      <Image
                        src={blog.authorImage.src}
                        alt={blog?.authorImageData?.alternativeText}
                        className="img-fluid"
                      />
                      <p>{blog.author}</p>
                    </div>
                    <div className={styles.ellips}>
                      <Image
                        src={clock.src}
                        alt="date icon"
                        className="img-fluid"
                      />
                      <p>{blog.date}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className={styles.capitalizeDevelopment}>
            <div className={styles.newFeaturedmount}>
              {featuredBlogs?.slice(1)?.map((blog, index) => (
                <Link
                  href={blog.slug ?? "#"}
                  className={styles["blog-linking"]}
                  key={index}
                >
                  <div key={index} className={styles.needContServices}>
                    <Image
                      src={blog.image}
                      alt="blogImage"
                      className={`${styles.softfpo} ${styles.needContServicesdon} img-fluid`}
                    />
                    <div className={styles.softwareServices}>
                      <h4>{blog.category}</h4>
                    </div>
                    <div className={styles.practicesServices}>
                      <h3>{blog.title}</h3>
                      <div className={styles.dateServices}>
                        <div className={styles.ellips}>
                          <Image
                            src={ellise.src}
                            alt="men"
                            className="img-fluid"
                          />
                          <p>{blog.author}</p>
                        </div>
                        <div className={styles.ellips}>
                          <Image
                            src={clock.src}
                            alt="men"
                            className="img-fluid"
                          />
                          <p>{blog.date}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
