import GetStartedSection from "./Components/GetStartedSection/GetStartedSection";
import WebsiteDevelopement from "../services/Components/WebsiteDevelopement/WebsiteDevelopement";
import AppDevelopment from "../services/Components/AppDevelopment/AppDevelopment";
import Privileged from "../services/Components/Privileged/Privileged";
import Banner from "@/components/Banner/Banner";

import HeroSection from "@/components/HeroSection/HeroSection";
import LogoSlider from "@/components/LogoSlider/LogoSlider";
import FaqsSection from "@/components/Faqs/Faqs";
import PageNav from "./Components/PageNavigation/PageNavigation";
import styles from "../../(pages)/services/page.module.css";
import ServicesDropdown from "./Components/ServicesDropdown/ServicesDropdown";

import {
  bannerContent,
  servicesContent,
  letsGetStartedContent,
  faqContent,
} from "../../../content/services";
import { getOriginData } from "@/lib/api";
import Card from "./Components/Cards/ServicesCard";
import { getMetaFromJSON } from "@/lib/helpers/getMetaFromJSON";
import Script from "next/script";
import { ORIGINS } from "@/lib/constants";

export async function generateMetadata() {
  const pageName = "services";
  const data = await getOriginData(ORIGINS.UAE, `/seos?filters[slug][$eq]=${pageName}`);
  return getMetaFromJSON(data?.[0], pageName, ORIGINS.UAE);
}

export default async function Services() {

  const pageName = "services";
  const data = await getOriginData(ORIGINS.UAE, `/seos?filters[slug][$eq]=${pageName}`)
  const jsonLd = data?.[0] ? data[0]?.script : ""

  const bannerResponse = await getOriginData(ORIGINS.UAE, "/services-header?populate=*");
  const servicesResponse = await getOriginData(ORIGINS.UAE,
    "/services-sections?populate=image&populate=services_services_section_links"
  );
  const letsGetStartedResponse = await getOriginData(ORIGINS.UAE, "/let-s-get-started?populate=*");
  const faqResponse = await getOriginData(ORIGINS.UAE, "/frequently-ask-question?populate=*");
  const privileged = await getOriginData(ORIGINS.UAE, "/privileged-to-be?populate=logos.logo");
  const header = await getOriginData(ORIGINS.UAE,
    "/homepage-lets-schedule-a-call?populate=background_image&populate=subject_image"
  );
  const services = [];
  let serviceFirstHalf;
  let serviceSecondHalf;

  if (servicesResponse?.length) {
    servicesResponse.map((item) => {
      services.push(item.title);
    });

    servicesResponse?.map((item, index) => {
      if ((index + 1) % 2) {
        item.style = "flex-row";
      } else {
        item.style = "flex-row-reverse";
      }
      return item;
    });
    const midIndex = Math.floor(servicesResponse?.length / 2);
    serviceFirstHalf = servicesResponse?.slice(0, midIndex);
    serviceSecondHalf = servicesResponse?.slice(midIndex);
  } else {
    servicesContent?.map((item) => {
      services.push(item.title);
    });

    servicesContent?.map((item, index) => {
      if ((index + 1) % 2) {
        item.style = "flex-row";
      } else {
        item.style = "flex-row-reverse";
      }
      return item;
    });

    const midIndex = Math.floor(servicesContent.length / 2);
    serviceFirstHalf = servicesContent?.slice(0, midIndex);
    serviceSecondHalf = servicesContent?.slice(midIndex);
  }
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
      <Script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} key="jsonLd" id="schema" />

      <Banner
        bannerimg={bannerResponse?.background_image?.formats?.large.url}
        heading={`${bannerResponse?.title || bannerContent?.title}`}
        para={`${bannerResponse?.description || bannerContent?.description}`}
        scheduleBtn={`${bannerResponse?.button_label || bannerContent?.button_label
          }`}
        propsClass="bannerAbout"
        button_link={bannerResponse?.button_link}
      />
      <div className={styles.pageNavNone}>
        <PageNav list={services} />
      </div>
      <div className={styles.pageNavMobile}>
        <ServicesDropdown list={services} Services="Services" />
      </div>

      {serviceFirstHalf.map((item, index) => {
        return (
          <>
            <div
              key={index}
              id={item.title.replace(/\s/g, "")}
              className={item.title.replace(/\s/g, "")}
            >
              <Card
                heading={`${item.title}`}
                para={`${item.description}`}
                imageWeb={item.image.formats.small.url}
                width={item.image.formats.small.width}
                height={item.image.formats.small.height}
                list={item.services_services_section_links}
                button_link={item.button_link}
                style={item.style}
                classProps={`class${index}`}
              />
            </div>
          </>
        );
      })}
      {header && (
        <div className={`${styles.herosec} stateproject`}>
          <HeroSection
            title={header?.title}
            description={header?.description}
            imgSrc={header?.subject_image || herosec}
            img={header?.background_image}
            buttonText={header?.button_label}
            buttonLink={header?.button_link}
          />
        </div>
      )}
      {serviceSecondHalf.map((item, index) => {
        return (
          <>
            <div key={index} id={item.title.replace(/\s/g, "")}>
              <Card
                heading={`${item.title}`}
                para={`${item.description}`}
                imageWeb={item.image.formats.small.url}
                width={item.image.formats.small.width}
                height={item.image.formats.small.height}
                list={item.services_services_section_links}
                button_link={item.button_link}
                style={item.style}
                classProps={`classNo${index}`}
              />
            </div>
          </>
        );
      })}
      <div className="trustedbyleading">
        <Privileged
          title={"Privileged to be Trusted by Leading Businesses"}
          description={
            "Delivering business value and strategic wins across a variety of industries. We are proud to be a digital solutions partner for global brands and a top custom software development company."
          }
        />
      </div>
      {privileged?.logos && <LogoSlider logos={getPreviligedData(privileged)} />}
      {/* <LogoSlider /> */}
      <div className={`${styles.ecommercefaqs} ecommerce-faqs`}>
        <FaqsSection
          heading={faqResponse?.heading || faqContent.heading}
          faqData={faqResponse?.items || faqContent.items}
        />
      </div>
      <GetStartedSection
        heading={
          letsGetStartedResponse?.heading || letsGetStartedContent.heading
        }
        description={
          letsGetStartedResponse?.description ||
          letsGetStartedContent.description
        }
        sub_heading={
          letsGetStartedResponse?.sub_heading ||
          letsGetStartedContent.sub_heading
        }
        items={letsGetStartedResponse?.items || letsGetStartedContent.items}
        button_label={
          letsGetStartedResponse?.button_label ||
          letsGetStartedContent.button_label
        }
        button_link={
          letsGetStartedResponse?.button_link ||
          letsGetStartedContent.button_link
        }
      />
    </>
  );
}
