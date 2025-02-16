"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Container, Row, Col, Image, Nav, Tab } from "react-bootstrap";
import styles from "../RecentBlogs/RecentBlogs.module.css";
import searchnormal from "../../../../../../public/search-normal.svg";
import rotateright from "../../../../../../public/rotateright.svg";
import arrowleft from "../../../../../../public/arrowleft.svg";

import { getDatawithMeta } from "@/lib/api";
import { debounce, getImageURL } from "@/lib/helpers";
import { BlogCard } from "../../[id]/Components/RelatedBlogCard/RelatedBlogCard";
import { useRouter } from "next/navigation";

const RecentBlogs = ({
  blogCategories,
  allCategoryBlogs,
  pagination,
  page,
}) => {
  const getRecentBlogData = (data) => {
    const recentBlogData = data.map((rb) => ({
      title: rb.title,
      description: rb.short_description,
      learnMoreLabel: "Learn More",
      category: rb?.category?.label,
      // learnMoreLink: "blog/" + rb.slug,
      learnMoreLink: rb.slug,
      image: getImageURL(rb?.featured_image?.url),
      imageData: rb?.featured_image,
    }));
    return recentBlogData;
  };
  const debounceDelayInMS = 500;
  const [activeTab, setActiveTab] = useState("all");
  const [searchText, setSearchText] = useState("");
  const [blogs, setBlogs] = useState(allCategoryBlogs);
  const [currentPage, setCurrentPage] = useState(page.defaultPage);
  const [pageData, setPageData] = useState();
  const router = useRouter();

  useEffect(() => {
    if (pagination) {
      setPageData(pagination);
    }
  }, []);

  const showLoadMoreButton =
    pageData?.pageCount > currentPage && !!blogs.length;
  const onTabSelect = (key) => {
    try {
      setActiveTab(key);
      const isCategorizedTab = key !== "all";
      const getCategorizedBlogs = async () => {
        let response;
        if (isCategorizedTab) {
          response = await getDatawithMeta(
            `/blog-detail-blogs?populate=category&populate=featured_image&filters[category][label][$eq]=${key}&fields[0]=documentId&fields[1]=title&fields[2]=short_description&fields[3]=slug&pagination[pageSize]=${page.blogsPerPage}&pagination[page]=${page.defaultPage}&sort=createdAt:desc`
          );
        } else {
          response = await getDatawithMeta(
            `/blog-detail-blogs?populate=category&populate=featured_image&fields[0]=documentId&fields[1]=title&fields[2]=short_description&fields[3]=slug&pagination[pageSize]=${page.blogsPerPage}&pagination[page]=${page.defaultPage}&sort=createdAt:desc`
          );
        }

        const { data: categorizedBlogs, meta } = response;
        setBlogs(getRecentBlogData(categorizedBlogs));
        setPageData(meta.pagination);
        setCurrentPage(page.defaultPage);
      };

      getCategorizedBlogs();
    } catch (err) {
      console.log(err);
    }
  };
  const onPageChange = async () => {
    const newPageNumber = currentPage + 1;

    const getCategorizedBlogs = async () => {
      let response;
      const isCategorizedTab = activeTab !== "all";
      if (isCategorizedTab) {
        response = await getDatawithMeta(
          `/blog-detail-blogs?populate=category&populate=featured_image&filters[category][label][$eq]=${activeTab}&fields[0]=documentId&fields[1]=title&fields[2]=short_description&fields[3]=slug&pagination[pageSize]=${page.blogsPerPage}&pagination[page]=${newPageNumber}&sort=createdAt:desc`
        );
      } else {
        let route = `/blog-detail-blogs?populate=category&populate=featured_image&fields[0]=documentId&fields[1]=title&fields[2]=short_description&fields[3]=slug&pagination[pageSize]=${page.blogsPerPage}&pagination[page]=${newPageNumber}&sort=createdAt:desc`
        if (searchText) {
          route += `&filters[title][$containsi]=${searchText}`
        }
        response = await getDatawithMeta(
          route
        );
      }

      const { data: categorizedBlogs, meta } = response;
      setBlogs((prev) => [...prev, ...getRecentBlogData(categorizedBlogs)]);
      setPageData(meta.pagination);
      setCurrentPage(newPageNumber);
    };

    getCategorizedBlogs();
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getSearchedData = useCallback(
    debounce(async (searchText) => {
      try {
        const isCategorizedTab = activeTab !== "all";
        let response;
        if (isCategorizedTab) {
          response = await getDatawithMeta(
            `/blog-detail-blogs?populate=category&populate=featured_image&filters[category][label][$eq]=${activeTab}&fields[0]=documentId&fields[1]=title&fields[2]=short_description&fields[3]=slug&pagination[pageSize]=${page.blogsPerPage}&pagination[page]=${page.defaultPage}&filters[title][$contains]=${searchText}&sort=createdAt:desc`
          );
        } else {
          response = await getDatawithMeta(
            `/blog-detail-blogs?populate=category&populate=featured_image&fields[0]=documentId&fields[1]=title&fields[2]=short_description&fields[3]=slug&pagination[pageSize]=${page.blogsPerPage}&pagination[page]=${page.defaultPage}&filters[title][$containsi]=${searchText}&sort=createdAt:desc`
          );
        }

        const { data: categorizedBlogs, meta } = response;
        setBlogs(getRecentBlogData(categorizedBlogs));
        setPageData(meta.pagination);
        setCurrentPage(page.defaultPage);
      } catch (err) {
        console.log(err);
      }
    }, debounceDelayInMS),
    [activeTab, page.blogsPerPage, page.defaultPage]
  );
  const onSearchChange = (e) => {
    const searchText = e.target.value?.toLowerCase();
    setSearchText(searchText);
    getSearchedData(searchText);
  };

  return (
    <section className={styles.contRecent}>
      <Container>
        <Row>
          <Col xl={6}>
            <h2 className={styles.recentBlogs}>Recent Blogs</h2>
          </Col>
          <Col xl={6}>
            <div className={styles.inputSet}>
              <input
                className={styles.blogInput}
                type="text"
                placeholder="Search here..."
                onChange={onSearchChange}
                value={searchText}
              />
              <Image src={searchnormal.src} className="img-fluid" alt="image" />
            </div>
          </Col>
        </Row>
        <Tab.Container
          activeKey={activeTab}
          onSelect={onTabSelect}
          className={styles.contaentsideNav}
        >
          <Nav className={`${styles.navMenus} sideNav`}>
            {Object.keys(blogCategories).map((key) => {
              if (
                blogCategories[key].mainButtonLabel &&
                blogCategories[key].mainButtonLabel != ""
              ) {
                return (
                  <Nav.Item key={key}>
                    <Nav.Link
                      className={
                        activeTab === key
                          ? `${styles.activeTab} ${styles.navTabs}`
                          : ` ${styles.navTabs}`
                      }
                      eventKey={key}
                    >
                      {blogCategories[key].mainButtonLabel}
                    </Nav.Link>
                  </Nav.Item>
                );
              } else {
                return null;
              }
            })}
          </Nav>

          <Tab.Content className={styles.topLayer}>
            <Row className="gy-4">
              {blogs.map((blog, index) => (
                <Col xl={4} md={6} key={index}>
                  {/* <div className={styles.dataPoint}>
                    <Image
                      src={blog.image || "/whatsnew.png"}
                      alt="image"
                      className={`${styles.leasrnsrt} img-fluid w-100`}
                      priority
                    />
                    <h4 className={styles.title}>{blog.title}</h4>
                    <p className={styles.description}>{blog.description}</p>
                    {blog.learnMoreLabel && (
                      <div className={styles.learnMore}>
                        <Link href={blog.learnMoreLink}>
                          {blog.learnMoreLabel}
                          <Image
                            alt="image"
                            className="img-fluid"
                            src={arrowleft.src}
                          />
                        </Link>
                      </div>
                    )}
                  </div> */}
                  <div
                    className={styles["blog-linking"]}
                    onClick={() => router.push(blog.learnMoreLink ?? "#")}
                  >
                    <BlogCard
                      title={blog.title}
                      description={blog.description}
                      blogImg={blog.image}
                      category={blog.category}
                      slug={blog.learnMoreLink}
                    />
                  </div>
                </Col>
              ))}

              {blogs.length === 0 && (
                <Col>
                  <p className={styles.noData}>No data found</p>
                </Col>
              )}
            </Row>
          </Tab.Content>
        </Tab.Container>
        <div className={styles.moreCenter}>
          {showLoadMoreButton && (
            <span className={styles.loadmore} onClick={onPageChange}>
              Load More
              <Image alt="image" className="img-fluid" src={rotateright.src} />
            </span>
          )}
        </div>
      </Container>
    </section>
  );
};

export default RecentBlogs;
