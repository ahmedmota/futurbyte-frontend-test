import React from "react";
import Banner from "@/components/Banner/Banner";
import PageNav from "../../services/Components/PageNav/PageNav";
import AboutStitches from "./Component/AboutStitches/AboutStitches";
import Outcomes from "./Component/Outcomes/Outcomes";
import CommerceSolution from "./Component/CommerceSolution/CommerceSolution";
import CaseLogoSlides from "./Component/CaseLogoSlides/CaseLogoSlides";
import WhatsNew from "./Component/WhatsNew/WhatsNew";
import HeroSection from "@/components/HeroSection/HeroSection";
import { getOriginData} from "@/lib/api";
import ServicesDropdown from "../../(dynamic-pages)/[cat]/Components/ServicesDropdown/ServicesDropdown";
import { getMetaFromJSON } from "@/lib/helpers/getMetaFromJSON";
import Script from "next/script";
import { ORIGINS } from "@/lib/constants";

export async function generateMetadata({ params }) {
  const pageName = params.slug
  const data = await getOriginData(ORIGINS.CA,`/seos?filters[slug][$eq]=${pageName}`)
  return getMetaFromJSON(data?.[0], pageName, ORIGINS.CA)
}

export function getLinks(
  specificallyServices,
  webServices,
  impactServices,
  developmentProcess,
  ourApproaches,
  webDevelopmentServices
) {
  return [
    {
      tabName: specificallyServices?.tab_name,
      tabId: specificallyServices?.documentId,
    },
    {
      tabName: webServices?.tab_name,
      tabId: webServices?.documentId,
    },
    {
      tabName: impactServices?.tab_name,
      tabId: impactServices?.documentId,
    },
    {
      tabName: developmentProcess?.tab_name,
      tabId: developmentProcess?.documentId,
    },
    {
      tabName: ourApproaches?.tab_name,
      tabId: ourApproaches?.documentId,
    },
    {
      tabName: webDevelopmentServices?.tab_name,
      tabId: webDevelopmentServices?.documentId,
    },
  ];
}


export default async function page({ params }) {
  const pageName = params.slug

  const data = await getOriginData(ORIGINS.CA,`/seos?filters[slug][$eq]=${pageName}`)
  const jsonLd = data?.[0] ? data[0]?.script : ""

  async function getDynamicPageData(endPoint, getAll = false) {
    const endPointWithSlug = endPoint + `filters[slug][$eq]=${pageName}`;
    const data = await getOriginData(ORIGINS.CA,endPointWithSlug);
    return getAll ? data : data?.[0];
  }

  const [getHeader, getAboutStiches, getShowCases, getEndToEnd, getOutcomes, getLetsWorkTogether, getCaseStudies, getOutcomesData] = await Promise.all([
    getDynamicPageData("/case-studies-inner-page-headers?populate=*&"),
    getDynamicPageData("/case-study-inner-page-about-stitches?populate=*&"),
    getDynamicPageData("/case-study-inner-page-project-showcases?populate=*&"),
    getDynamicPageData("/case-study-inner-page-an-end-to-ends?populate=*&"),
    getDynamicPageData("/case-study-inner-page-project-outcomes?populate=*&"),
    getDynamicPageData("/case-study-inner-page-lets-work-togethers?populate=*&"),
    getDynamicPageData("/case-study-inner-page-case-studies?populate=items.image&"),
    getDynamicPageData("/case-study-inner-page-outcomes-items?populate=*&", true),
  ])

  // const getHeader = await getOriginData(ORIGINS.CA,"/case-study-inner-page-header?populate=*");
  // const getAboutStiches = await getOriginData(ORIGINS.CA,
  //   "/case-study-inner-page-about-stitch?populate=*"
  // );
  // const getShowCases = await getOriginData(ORIGINS.CA,
  //   "/case-study-inner-page-project-showcase?populate=*"
  // );
  // const getEndToEnd = await getOriginData(ORIGINS.CA,
  //   "/case-study-inner-page-an-end-to-end?populate=*"
  // );
  // const getOutcomes = await getOriginData(ORIGINS.CA,
  //   "/case-study-inner-page-project-outcome?populate=*"
  // );
  // const getLetsWorkTogether = await getOriginData(ORIGINS.CA,
  //   "/case-study-inner-page-lets-work-together?populate=*"
  // );
  // const getCaseStudies = await getOriginData(ORIGINS.CA,
  //   "/case-study-inner-page-case-study?populate=items.image"
  // );

  const links = getLinks(
    getAboutStiches,
    getShowCases,
    getEndToEnd,
    getOutcomes,
    getLetsWorkTogether,
    getCaseStudies
  );

  let header = null;
  if (getHeader) {
    header = {
      title: getHeader.heading,
      image: getHeader.background_image?.url,
    };
  }

  let aboutStiches = null;
  if (getAboutStiches) {
    aboutStiches = {
      id: getAboutStiches.documentId,
      title: getAboutStiches.title,
      description: getAboutStiches.description,
      image: getAboutStiches.image?.url,
    };
  }

  let showCases = {
    items: null,
  };
  if (getShowCases) {
    showCases = {
      id: getShowCases.documentId,
    };
    const items = getShowCases.items.map((el) => {
      return {
        image: el.url,
      };
    });

    showCases.items = items;
  }

  let endToEnd = null;
  if (getEndToEnd) {
    endToEnd = {
      id: getEndToEnd.documentId,
      title: getEndToEnd.title,
      description: getEndToEnd.description,
      duration: getEndToEnd.duration,
    };

    const rightImages =
      getEndToEnd.right_images?.length > 0 ? getEndToEnd.right_images : [];

    const leftImages =
      getEndToEnd.left_images?.length > 0 ? getEndToEnd.left_images : [];

    endToEnd.leftImages = leftImages;
    endToEnd.rightImages = rightImages;
  }

  let projectOutcomes = null;
  if (getOutcomes && getOutcomesData.length) {
    projectOutcomes = {
      id: getOutcomes.documentId,
      title: getOutcomes.title,
    };

    const items = getOutcomesData?.map((el) => {
      return {
        id: el.documentId,
        text: el.title,
      };
    });

    projectOutcomes.items = items || [];
  }

  let letsWorkTogether = null;
  if (getLetsWorkTogether) {
    letsWorkTogether = {
      id: getLetsWorkTogether.documentId,
      title: getLetsWorkTogether.title,
      description: getLetsWorkTogether.description,
      buttonLabel: getLetsWorkTogether.button_label,
      buttonLink: getLetsWorkTogether.button_link,
      image: getLetsWorkTogether.background_image,
    };
  }

  let caseStudies = null;
  if (getCaseStudies) {
    caseStudies = {
      id: getCaseStudies.documentId,
      title: getCaseStudies.heading,
      description: getCaseStudies.description,
      viewAllBtn: {
        buttonLabel: getCaseStudies.button_label,
        buttonLink: getCaseStudies.button_link,
      },
    };

    const items = getCaseStudies.items?.map((el) => {
      return {
        title: el.title,
        para: el.description,
        button: el.button_label,
        buttonLink: el.button_link ? el.button_link : "#",
        image: el.image?.url,
      };
    });

    caseStudies.items = items;
  }

  return (
    <>
      <Script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} key="jsonLd" id="schema"/>

      {header && (
        <Banner
          bannerimg={header.image}
          heading={header.title}
          propsClass="homeBnner"
          marginBottom={true}
        />
      )}
      {links?.length > 0 && (
        <>
          <div className="d-md-block d-none">
            <PageNav list={links} />
          </div>
          <div className="d-md-none d-block">
            <ServicesDropdown list={links} Services={links[0].tabName} />
          </div>
        </>
      )}
      {aboutStiches && (
        <div id={`${aboutStiches.id}`}>
          <AboutStitches
            title={aboutStiches.title}
            description={aboutStiches.description}
            map={aboutStiches.image}
          />
        </div>
      )}
      {showCases.items && (
        <div id={`${showCases.id}`}>
          <CaseLogoSlides items={showCases.items} />
        </div>
      )}
      {endToEnd && (
        <div id={`${endToEnd.id}`}>
          <CommerceSolution
            title={endToEnd.title}
            description1={endToEnd.description}
            duration={endToEnd.duration}
            right_logos={endToEnd.rightImages}
            left_logos={endToEnd.leftImages}
          />
        </div>
      )}
      {projectOutcomes && (
        <div id={`${projectOutcomes.id}`}>
          <Outcomes
            outcomesData={projectOutcomes.items}
            title={projectOutcomes.title}
          />
        </div>
      )}

      {letsWorkTogether && (
        <div id={`${letsWorkTogether.id}`}>
          <HeroSection
            title={letsWorkTogether.title}
            description={letsWorkTogether.description}
            imgSrc={letsWorkTogether.image || herosec}
            img={letsWorkTogether.image}
            buttonText={letsWorkTogether.buttonLabel}
            buttonLink={letsWorkTogether.buttonLink}
          />
        </div>
      )}

      {caseStudies && (
        <div id={`${caseStudies.id}`}>
          <WhatsNew
            testimonials={caseStudies.items}
            btnLabel={caseStudies.buttonLabel}
            btnLink={caseStudies.buttonLink}
            heading={caseStudies.title}
            viewAllBtn={caseStudies.viewAllBtn}
            description={caseStudies.description}
          />
        </div>
      )}
    </>
  );
}
