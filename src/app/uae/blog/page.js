import React from "react";
import FeaturedBlogs from "./Components/FeaturedBlogs/FeaturedBlogs";
import RecentBlogs from "./Components/RecentBlogs/RecentBlogs";
import { getData, getDatawithMeta, getOriginData } from "@/lib/api";
import { getFormattedDate, getImageURL } from "@/lib/helpers";
import { getMetaFromJSON } from "@/lib/helpers/getMetaFromJSON";
import Script from "next/script";
import { ORIGINS } from "@/lib/constants";

export async function generateMetadata() {
  const pageName = 'blog'
  const data = await getOriginData(ORIGINS.UAE,`/seos?filters[slug][$eq]=${pageName}`)
  return getMetaFromJSON(data?.[0], pageName, ORIGINS.UAE)
}



const BlogPage = async () => {

  const pageName = 'blog'
  const data = await getOriginData(ORIGINS.UAE,`/seos?filters[slug][$eq]=${pageName}`)
  const jsonLd = data?.[0] ? data[0]?.script : ""

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

  const blogsPerPage = 12;
  const defaultPage = 1;

  const [featuredBlogs, blogCategories, blogs] = await Promise.all([
    getOriginData(ORIGINS.UAE,
      "/blog-detail-blogs?populate=category&populate=featured_image&populate=author_image&filters[category][label][$eq]=App Development&fields[0]=documentId&fields[1]=title&fields[2]=publishedAt&fields[3]=author_name&fields[4]=slug&pagination[pageSize]=5"
    ),
    getOriginData(ORIGINS.UAE,"/blog-detail-categories"),
    getDatawithMeta(
      `/blog-detail-blogs?populate=category&populate=featured_image&fields[0]=documentId&fields[1]=title&fields[2]=short_description&fields[3]=slug&pagination[pageSize]=${blogsPerPage}&pagination[page]=${defaultPage}&sort=createdAt:desc`
    ),
  ]);

  const getFeaturedBlogData = (data) => {
    const featuredBlogData = data.map((b) => ({
      image: getImageURL(b.featured_image?.url),
      imageData: b.featured_image,
      category: b.category?.label,
      title: b.title,
      slug: b.slug ?? "#",
      author: b.author_name,
      authorImage: getImageURL(b.author_image?.url),
      authorImageData: b.author_image,
      date: getFormattedDate(b.publishedAt),
    }));
    return featuredBlogData;
  };

  const getBlogCategories = (data) => {
    const allBlogCategory = {
      all: {
        mainButtonLabel: "All",
      },
    };

    const blogCategories = { ...allBlogCategory };

    data.forEach((bc) => {
      blogCategories[bc.label] = {
        mainButtonLabel: bc.label,
      };
    });

    return blogCategories;
  };

  return (
    <>
      <Script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} key="jsonLd" id="schema"/>

      {featuredBlogs && (
        <FeaturedBlogs featuredBlogs={getFeaturedBlogData(featuredBlogs)} />
      )}
      {blogCategories && (
        <RecentBlogs
          blogCategories={getBlogCategories(blogCategories)}
          allCategoryBlogs={getRecentBlogData(blogs?.data)}
          page={{ blogsPerPage, defaultPage }}
          pagination={blogs?.meta?.pagination}
        />
      )}
    </>
  );
};

export default BlogPage;
