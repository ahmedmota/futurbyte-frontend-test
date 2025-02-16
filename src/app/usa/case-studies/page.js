import React from "react";
import RecentWork from "./Components/RecentWork/RecentWork";
import Privileged from "../services/Components/Privileged/Privileged";
import LogoSlider from "@/components/LogoSlider/LogoSlider";
import GetStartedSection from "@/components/GetStartedSection/GetStartedSection";
import { getOriginData} from "@/lib/api";
import { getImageURL } from "@/lib/helpers";
import { getMetaFromJSON } from "@/lib/helpers/getMetaFromJSON";
import Script from "next/script";
import { ORIGINS } from "@/lib/constants";

export async function generateMetadata() {
  const pageName = 'case-studies'
  const data = await getOriginData(ORIGINS.US,`/seos?filters[slug][$eq]=${pageName}`)
  return getMetaFromJSON(data?.[0], pageName, ORIGINS.US)
}

const page = async () => {
  const pageName = 'case-studies'
  const data = await getOriginData(ORIGINS.US,`/seos?filters[slug][$eq]=${pageName}`)
  const jsonLd = data?.[0] ? data[0]?.script : ""

  const [recentWork, caseStudies, privileged, getStart] = await Promise.all([
    getOriginData(ORIGINS.US,"/our-recent-work?populate=*"),
    getOriginData(ORIGINS.US,
      "/case-studies-our-recent-work-buttons?populate=case_studies_case_studies_button_items.image"
    ),
    getOriginData(ORIGINS.US,"/privileged-to-be?populate=logos.logo"),
    getOriginData(ORIGINS.US,"/lets-get-started?populate=*"),
  ]);
  const allTab = {
    label: "All",
    key: "all",
    workData: [],
  };
  const getNavTabsData = (data) => {
    const caseStudyData = data.map((item) => {
      const navItem = {
        key: item.documentId,
        label: item.label,
        workData: item.case_studies_case_studies_button_items.map((i) => {
          const navWorkData = {
            title: i.heading,
            text: i.sub_heading,
            description: i.description,
            image: getImageURL(i.image?.url),
            imageData: i.image,
            link: i.button_link,
            bthLink: i.button_label,
          };
          allTab.workData.unshift(navWorkData);
          return navWorkData;
        }),
      };
      return navItem;
    });

    caseStudyData.unshift(allTab);
    return caseStudyData;
  };

  const getPreviligedData = (data) => {
    let priviligedLogos = data.logos?.map((el) => {
      return {
        anchorLink: el.url,
        noFollow: el.no_follow_no_index ? 'nofollow, noindex' : 'follow, index',
        ...el.logo,
      }
    });
    return priviligedLogos
  }

  return (
    <>
      <Script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} key="jsonLd" id="schema"/>

      {recentWork && caseStudies && (
        <RecentWork
          navTabs={getNavTabsData(caseStudies)}
          title={recentWork.heading}
          text={recentWork.description}
          casestudy="Case Study"
        />
      )}

      {privileged && (
        <>
          <Privileged
            title={privileged.heading}
            description={privileged.description}
          />
          {privileged?.logos && <LogoSlider logos={getPreviligedData(privileged)}/>}
        </>
      )}
      {getStart && (
        <GetStartedSection
          heading={getStart.heading}
          description={getStart.description}
          subHeading={getStart.benefits_label}
          buttonLabel={getStart.button_label}
          benefits={getStart.lets_get_started_benefits}
        />
      )}
    </>
  );
};
export default page;
