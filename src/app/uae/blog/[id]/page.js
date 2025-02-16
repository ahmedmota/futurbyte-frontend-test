import { Col, Container, Row } from "react-bootstrap";
import styles from "./style.module.css";
import Top from "./Components/Top/Top";
import MayBlogs from "./Components/MayBlogs/MayBlogs";
import TableContents from "./Components/TableContents/TableContents";
import FAQSection from "./Components/Faqs/Faqs";
import BlogDetailForm from "./Components/BlogDetailForm/BlogDetailForm";
import { getOriginData} from "@/lib/api";
import { parse } from "node-html-parser";
import RelatedBlogCard from "./Components/RelatedBlogCard/RelatedBlogCard";
import { getMetaFromJSON } from "@/lib/helpers/getMetaFromJSON";
import Script from "next/script";
import { ORIGINS } from "@/lib/constants";

const extractHeadings = (html) => {
  const doc = parse(html);

  const headings = [];

  doc.querySelectorAll("h1, h2, h3, h4, h5, h6").forEach((element) => {
    headings.push(element.textContent);
  });

  return headings;
};

const extractHeadingsHtml = (html) => {
  const doc = parse(html);

  doc.querySelectorAll("h1, h2, h3, h4, h5, h6").forEach((element) => {
    let headingText = element.textContent.trim();

    let id = headingText
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "");

    element.setAttribute("id", id);
  });

  // Select all <sup> and <s> tags
  // const supAndSTags = doc.querySelectorAll("sup, s");

  // // Attach a click event to each selected tag
  // supAndSTags.forEach((element) => {
  //   element.addEventListener("click", () => {
  //     alert(`You clicked on: ${element.tagName} with content: ${element.textContent}`);
  //   });
  // });

  // Select all <s> tags
  // const sTags = doc.querySelectorAll("s");

  // // Iterate over each <s> tag and wrap it in a <div>
  // sTags.forEach((sTag) => {
  //   const parentDiv = document.createElement("div"); // Create a new div element
  //   parentDiv.classList.add("wrapped-s-tag"); // Add a class to the div (optional)

  //   // Wrap the <s> tag inside the new <div>
  //   sTag.parentNode.insertBefore(parentDiv, sTag); // Insert the div before the <s> tag
  //   parentDiv.appendChild(sTag); // Move the <s> tag inside the div
  // });

  const updatedHtml = doc.toString();
  return updatedHtml;
};

export async function generateMetadata({ params: { id } }) {
  const pageName = `blog/${id}`;
  const data = await getOriginData(ORIGINS.UAE,`/seos?filters[slug][$eq]=${id}`);
  return getMetaFromJSON(data?.[0], pageName, ORIGINS.UAE);
}

export default async function BlogDetailPage({ params }) {
  const { id } = params;
  const defaultFAQHeading = "Frequently Asked Questions";

  const pageName = `blog/${id}`;
  const data = await getOriginData(ORIGINS.UAE,`/seos?filters[slug][$eq]=${pageName}`)
  const jsonLd = data?.[0] ? data[0]?.script : ""


  const getContentApi = await getOriginData(ORIGINS.UAE,
    `/blog-detail-blogs?populate=*&filters[slug][$eq]=${id}`
  );
  const getContentFaqs = await getOriginData(ORIGINS.UAE,
    `/blog-detail-fa-qs-items?populate=*&filters[slug][$eq]=${id}`
  );

  let blogData = null;
  let htmlContent = ``;
  let contents = [];
  const getContent = getContentApi ? getContentApi[0] : null;
  const faqs = {
    id: null,
    items: [],
    title: null,
  };

  let category = null;
  if (getContent) {
    htmlContent = getContent.blog_content;

    blogData = {
      title: getContent.title,
      description: getContent.author_description,
      publishedDate: getContent.publishedAt,
      updatedDate: getContent.updatedAt,
      readTime: getContent.time_to_read,
      blogImg: getContent.featured_image?.url,
      blogImgAlt: getContent.featured_image.alternativeText,
      tags: getContent.tags?.map((el, i) => el.label),
      author: {
        name: getContent.author_name,
        profile: getContent.author_image?.url,
      },
    };

    category = getContent.category?.label;

    contents = extractHeadings(htmlContent);
  }

  const getRelatedBlogsApi = await getOriginData(ORIGINS.UAE,
    `/blog-detail-blogs?filters[category][label][$eq]=${category}&pagination[pageSize]=3&fields[0]=documentId&fields[1]=title&fields[3]=publishedAt&fields[4]=short_description&fields[5]=slug&populate=featured_image&populate=category`
  );
  const relatedBlogs = {
    title: null,
    items: [],
  };

  const getMayLikeBlogsApi = await getOriginData(ORIGINS.UAE,
    `/blog-detail-blogs?filters[tags][label][$in]=${category}&filters[tags][label][$in]=Website&pagination[pageSize]=4&fields[0]=documentId&fields[1]=title&fields[3]=publishedAt&fields[4]=slug&populate=featured_image`
  );
  const getMayLikeBlogs = getMayLikeBlogsApi;
  const getRelatedBlogs = getRelatedBlogsApi;

  const mayLikeBlogs = {
    title: null,
    items: [],
  };

  if (getMayLikeBlogs) {
    mayLikeBlogs.title = "You May Also Like";
    mayLikeBlogs.items = getMayLikeBlogs.map((el, i) => {
      return {
        title: el.title,
        slug: el.slug,
        blogImg: el.featured_image.url,
        publishedDate: new Date(el.publishedAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
      };
    });
  }

  if (getContentFaqs) {
    faqs.id = getContentFaqs?.documentId;
    faqs.title = getContentFaqs?.title;

    faqs.items = getContentFaqs?.map((el, i) => {
      return {
        question: el.question,
        answer: el.answer,
      };
    });
  }

  if (getRelatedBlogs) {
    relatedBlogs.title = "Related Blogs";

    relatedBlogs.items = getRelatedBlogs.map((el, i) => {
      return {
        title: el.title,
        description: el.short_description,
        image: el.featured_image?.url,
        category: el.category?.label,
        slug: el.slug,
      };
    });
  }

  function formatDate(dateString) {
    // Parse the input date string into a Date object
    const date = new Date(dateString);

    // Use built-in methods to format the date
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }

  return (
    <>
      <Script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} key="jsonLd" id="schema" />
      {/* <div className="overflow-hidden"> */}
      <div className={styles["one-section-vector"]}>
        <Container>
          <Row className={`py-lg-5 pt-3`}>
            {blogData && (
              <Col className={`${styles["t-main"]}`}>
                <Top
                  title={blogData.title}
                  description={blogData.description}
                  author={blogData.author}
                  authorName={blogData.author.name}
                  readTime={blogData.readTime}
                  publishedDate={formatDate(blogData.publishedDate)}
                  tags={blogData.tags}
                  updatedDate={formatDate(blogData.updatedDate)}
                  blogImg={blogData.blogImg}
                  blogImgAlt={blogData.blogImgAlt}
                />
              </Col>
            )}
          </Row>
        </Container>
      </div>
      <div className={styles["two-section-vector"]}>
        <Container>
          <Row>
            {contents && (
              <Col
                className={`py-lg-0 py-3 ${styles['sticky-col']} ${styles["blog-content-main-div"]} ${styles["p-mob-x"]}`}
                lg={3}
              >
                <TableContents items={contents} />
              </Col>
            )}
            <Col
              lg={6}
              className={`ps-lg-5 ${styles["html-content-main-col"]} ${styles["p-mob-x"]}`}
            >
              {htmlContent && (
                <>
                  {/* <sup>Benefits of Choosing Reactive Web Design</sup> */}
                  {/* <s>Reach Out To Us ›</s> */}
                  {/* <s>Reach Out To Us ›</s> */}
                  <div
                    className={styles["html-content"]}
                    dangerouslySetInnerHTML={{
                      __html: extractHeadingsHtml(htmlContent),
                    }} // Render the HTML content here
                  />
                </>
              )}
              {faqs && (
                <FAQSection heading={defaultFAQHeading} faqData={faqs.items} />
              )}
              <BlogDetailForm />
            </Col>
            {mayLikeBlogs && (
              <Col className={`py-lg-0 py-3 ${styles['sticky-col']} ${styles["p-mob-x"]}`} lg={3}>
                <MayBlogs
                  title={mayLikeBlogs.title}
                  blogs={mayLikeBlogs.items}
                />
              </Col>
            )}
          </Row>
        </Container>
      </div>
      <div
        className={`pt-3 pb-5  ${styles["related-blogs-main-div"]} ${styles["p-mob-x-last"]}`}
      >
        {relatedBlogs && (
          <Container>
            <RelatedBlogCard
              blogs={relatedBlogs.items}
              title={relatedBlogs.title}
            />
          </Container>
        )}
      </div>
    </>
  );
}
