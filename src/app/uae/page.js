import Banner from "@/components/Banner/Banner";
import Privileged from "@/components/Privileged/Privileged";
import LogoSlider from "@/components/LogoSlider/LogoSlider";
import ModernBusinesses from "@/components/ModernBusinesses/ModernBusinesses";
import ProvidingDigital from "@/components/ProvidingDigital/ProvidingDigital";
import CompaniesBuilt from "@/components/CompaniesBuilt/CompaniesBuilt";
import Customers from "@/components/Customers/Customers";
import VideoTestimonials from "@/components/VideoTestimonials/VideoTestimonials";
import GetStartedSection from "@/components/GetStartedSection/GetStartedSection";
import WhatsNew from "@/components/WhatsNew/WhatsNew";
import React from "react";
import PeopleIndustries from "@/components/PeopleIndustries/PeopleIndustries";
import OurExpertise from "@/components/OurExpertise/OurExpertise";
import styles from "./page.module.css";
import { getOriginData } from "@/lib/api";
import { getImageURL } from "@/lib/helpers";
import { getMetaFromJSON } from "@/lib/helpers/getMetaFromJSON";
import HeroSection from "@/components/HeroSection/HeroSection";
import Script from "next/script";
import { ORIGINS } from "@/lib/constants";

export async function generateMetadata() {
  const pageName = "";

  const data = await getOriginData(ORIGINS.UAE, `/seos?filters[slug][$eq]=/`);
  return getMetaFromJSON(data?.[0], pageName, ORIGINS.UAE, false);
}

export default async function Home() {
  const pageName = "/"
  const data = await getOriginData(ORIGINS.UAE, `/seos?filters[slug][$eq]=${pageName}`)
  const jsonLd = data?.[0] ? data[0]?.script : ""

  const [
    scheduleCall,
    header,
    digitalSolutions,
    brandReputations,
    ProvidingDigitalSolutions,
    overCompanies,
    customSoftware,
    ourExpertise,
    customerReview,
    videoTestimonials,
    getStart,
    whatsNew,
    privileged,
    whyChooseFutureByte,
  ] = await Promise.all([
    getOriginData(ORIGINS.UAE,
      "/homepage-lets-schedule-a-call?populate=background_image&populate=subject_image"
    ),
    getOriginData(ORIGINS.UAE, "/header?populate=*"),
    getOriginData(ORIGINS.UAE,
      "/our-digital-solution?populate=homepage_our_digital_solution_buttons.picture&populate=homepage_our_digital_solution_buttons.homepage_our_digital_solution_pages_links"
    ),
    getOriginData(ORIGINS.UAE, "/brand-reputation?populate=left_logos.logo&populate=right_logos.logo&populate=main_logo&populate=titles"),
    getOriginData(ORIGINS.UAE, "/providing-digital-solution?populate=icons.icon"),
    getOriginData(ORIGINS.UAE,
      "/over-160-company?populate=over_160_companies_tabs&populate=over_160_companies_tabs.company_logo&populate=over_160_companies_tabs.product_logo&populate=over_160_companies_tabs.product_image&populate=over_160_companies_tabs.over_160_companies_tab_sub_headings"
    ),
    getOriginData(ORIGINS.UAE,
      "/custom-software-development?populate=custom_software_development_buttons.homepage_custom_software_development_button_inner_data&populate=custom_software_development_buttons.homepage_custom_software_development_button_inner_data.image"
    ),
    getOriginData(ORIGINS.UAE,
      "/our-expertise?populate[our_expertise_categories][populate]=our_expertise_category_tech_categories.our_expertise_category_tech_names.icon"
    ),
    getOriginData(ORIGINS.UAE, "/customer-review?populate=*"),
    getOriginData(ORIGINS.UAE,
      "/video-testimonial?populate[video_testimonial_collections][populate]=video"
    ),
    getOriginData(ORIGINS.UAE, "/lets-get-started?populate=*"),
    getOriginData(ORIGINS.UAE, "/whats-new?populate=whats_new_news&populate=whats_new_news.image"),
    getOriginData(ORIGINS.UAE, "/privileged-to-be?populate=logos.logo*"),
    getOriginData(ORIGINS.UAE,
      "/why-choose-futurbyte?populate=why_choose_futurbyte_buttons&populate=why_choose_futurbyte_buttons.image"
    ),
  ]);

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

  const getBrandReputationData = (data) => {

    let left_logos = data.left_logos?.map((el) => {
      return {
        anchorLink: el.url,
        noFollow: el.no_follow_no_index ? 'nofollow, noindex' : 'follow, index',
        ...el.logo,
      }
    });
    let right_logos = data.right_logos?.map((el) => {
      return {
        anchorLink: el.url,
        noFollow: el.no_follow_no_index ? 'nofollow, noindex' : 'follow, index',
        ...el.logo,
      }
    });

    data.left_logos = left_logos
    data.right_logos = right_logos

    return data
  }

  const getDigitalSolutionsTabContent = (data) => {
    const digitalSolutionsTabContent = {};
    data.homepage_our_digital_solution_buttons.forEach((ds) => {
      if (ds.main_button_label) {
        digitalSolutionsTabContent[ds.main_button_label] = {
          title: ds.title,
          mainButtonLabel: ds.main_button_label,
          description: ds.description,
          image: getImageURL(ds.picture?.url),
          imageData: {
            height: ds.picture?.height,
            width: ds.picture?.width,
            alternativeText: ds.picture?.alternativeText,
          },
          learnMoreLabel: ds.button_label,
          learnMoreLink: ORIGINS.UAE + ds.button_link,
          list: ds.homepage_our_digital_solution_pages_links.map((item) => ({
            link: ORIGINS.UAE + item.link,
            label: item.label,
          })),
        };
      }
    });
    return digitalSolutionsTabContent;
  };

  const gecustomSoftwareTabContent = (data) => {
    const customSoftwareTabContent = {};
    data.custom_software_development_buttons.forEach((ds) => {
      customSoftwareTabContent[ds.label] = {
        title:
          ds.homepage_custom_software_development_button_inner_data[0].title,
        mainButtonLabel: ds.label,
        description:
          ds.homepage_custom_software_development_button_inner_data[0]
            ?.description,
        image: getImageURL(
          ds.homepage_custom_software_development_button_inner_data[0]?.image
            ?.url
        ),
      };
    });
    return customSoftwareTabContent;
  };

  const getOurExpertise = (data) => {
    const ourExpertises = data.our_expertise_categories.map((oe) => {
      const ourExpertise = {
        key: oe.documentId,
        title: oe.title,
        sections: oe.our_expertise_category_tech_categories.map((item) => {
          const section = {
            name: item.title,
            tools: item.our_expertise_category_tech_names.map((techItem) => ({
              name: techItem.label,
              imgSrc: getImageURL(techItem.icon?.url),
              imgData: techItem.icon,
            })),
          };
          return section;
        }),
      };

      return ourExpertise;
    });

    return ourExpertises;
  };

  const getOverCompanyData = (data) => {
    const overCompanyDate = data.over_160_companies_tabs.map((item) => {
      const company = {};
      company.tile = item.title;
      company.description = item.description;
      company.subSections = item.over_160_companies_tab_sub_headings;
      company.productImage = item.product_image;
      company.productLogo = item.product_logo;
      company.companyLogo = item.company_logo;
      company.slug = "case-studies/" + item.slug;
      return company;
    });

    return overCompanyDate;
  };

  const getCustomerReviewData = (data) => {
    const customerReviewData = data.customer_review_testimonials.map((cr) => ({
      quote: cr.testimonial_text,
      designation: cr.author_position,
      author: cr.author_name,
    }));

    return customerReviewData;
  };

  const getVideoTestinomialData = (data) => {
    const videoTestimonials = data.video_testimonial_collections.map((vt) => ({
      name: vt.author_name,
      role: vt.author_position,
      image: getImageURL(vt.video.url),
      imageData: {
        height: vt.video.height,
        width: vt.video.width,
        alternativeText: vt.video.alternativeText,
      },
    }));
    return videoTestimonials;
  };

  const getWhatNewData = (data) => {
    const whatsNew = data?.whats_new_news?.map((wn) => ({
      id: wn.documentId,
      image: getImageURL(wn.image[0].url),
      imageData: {
        height: wn.image[0].height,
        width: wn.image[0].width,
        alternativeText: wn.image[0].alternativeText,
      },
      title: wn.heading,
      para: wn.description,
      button: wn.button_label,
      buttonLink: wn.button_link || "#",
      category: wn.tag,
    }));

    return whatsNew;
  };

  const getWhyChooseData = (data) => {
    const whyChooseData = {};

    data.why_choose_futurbyte_buttons.forEach((wc) => {
      whyChooseData[wc.label] = {
        title: wc.label,
        heading: wc.heading,
        description: wc.description,
        mainButtonLabel: wc.label,
        image: getImageURL(wc.image?.url),
      };
    });

    return whyChooseData;
  };

  return (
    <>
      <Script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} key="jsonLd" id="schema" />
      {header && (
        <Banner
          bannerimg={header.background_image?.url}
          heading={header.title}
          para={header.description}
          scheduleBtn={header.buttons[0].label}
          ourWorkLink={ORIGINS.UAE + header.buttons[1].link}
          button_link={ORIGINS.UAE + header.buttons[0].link}
          OurWork={header.buttons[1].label}
          bannerLogos={header.icons}
          propsClass="homeBnnerNew"
          title_first_text={header.title_first_text}
          title_middle_text={header.title_middle_text}
          title_end_text={header.title_end_text}
          isAnimate={true}
          addForm={true}
          addLink={false}
        />
      )}
      {privileged && (
        <div className={styles.logobg}>
          <Privileged
            title={privileged.heading}
            description={privileged.description}
            calssPri="calssPri"
          />

            {privileged?.logos && <LogoSlider logos={getPreviligedData(privileged)} />}
        </div>
      )}
      {digitalSolutions && (
        <ModernBusinesses
          title={digitalSolutions.heading}
          tabContent={getDigitalSolutionsTabContent(digitalSolutions)}
          propsClass=""
          propsPara="propsPara"
          isLearnMore={true}
        />
      )}
      {brandReputations && (
        <div className={styles.verticalslide}>
          <PeopleIndustries data={getBrandReputationData(brandReputations)} />
        </div>
      )}
      {ProvidingDigitalSolutions && (
        <div className={styles.verticalbg}>
          <ProvidingDigital data={ProvidingDigitalSolutions} />
        </div>
      )}
      {customSoftware && (
        <div className={styles.softwaredevelopment}>
          <ModernBusinesses
            title={customSoftware.heading}
            para={<>{customSoftware.description}</>}
            tabContent={gecustomSoftwareTabContent(customSoftware)}
            propsClass="propsClass"
            propsPara="propsPara"
          />
        </div>
      )}
      {overCompanies && (
        <CompaniesBuilt
          heading={overCompanies.heading}
          slides={getOverCompanyData(overCompanies)}
        />
      )}

      {ourExpertise && (
        <div className={styles.heroSection}>
          <OurExpertise
            heading={ourExpertise.heading}
            tabData={getOurExpertise(ourExpertise)}
          />
        </div>
      )}
      {scheduleCall && (
        <div className="postImage">
          <HeroSection
            title={scheduleCall.title}
            description={scheduleCall.description}
            imgSrc={scheduleCall.subject_image || herosec}
            img={scheduleCall.background_image}
            buttonText={scheduleCall.button_label}
            buttonLink={ORIGINS.UAE + scheduleCall.button_link}
          />
        </div>
      )}
      <div className={styles.ModernBusinesses}>
        {whyChooseFutureByte && (
          <ModernBusinesses
            title={whyChooseFutureByte.heading}
            tabContent={getWhyChooseData(whyChooseFutureByte)}
            propsClass="propsClass"
            propsPara="propsPara"
          />
        )}
      </div>
      {customerReview && (
        <Customers
          heading={customerReview.heading}
          ratingImg={getImageURL(customerReview.customer_review_image.url)}
          testimonials={getCustomerReviewData(customerReview)}
        />
      )}
      {videoTestimonials && (
        <VideoTestimonials
          heading={videoTestimonials.heading}
          testimonials={getVideoTestinomialData(videoTestimonials)}
        />
      )}
      {getStart && (
        <GetStartedSection
          heading={getStart.heading}
          description={getStart.description}
          subHeading={getStart.benefits_label}
          buttonLabel={getStart.button_label}
          buttonLink={ORIGINS.UAE + getStart.button_link}
          benefits={getStart.lets_get_started_benefits}
        />
      )}
      {whatsNew && (
        <WhatsNew
          testimonials={getWhatNewData(whatsNew)}
          btnLabel={whatsNew.button_label}
          btnLink={whatsNew.button_link}
          heading={whatsNew.heading}
          buttonTrue="true"
        />
      )}
    </>
  );
}
