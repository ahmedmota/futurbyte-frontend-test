import WebsiteDevelopement from "../services/Components/WebsiteDevelopement/WebsiteDevelopement";
import AppDevelopment from "../services/Components/AppDevelopment/AppDevelopment";
import Banner from "@/components/Banner/Banner";
import FaqsSection from "@/components/Faqs/Faqs";
import PageNav from "@/app/(pages)/services/Components/PageNav/PageNav";
import styles from "../../../app/(pages)/industries/page.module.css";
import ServicesDropdown from "@/app/(pages)/services/Components/ServicesDropdown/ServicesDropdown";
import { getData } from "@/lib/api";
import { getImageURL } from "@/lib/helpers";
import GetStartedSection from "@/components/GetStartedSection/GetStartedSection";
import { getMetaFromJSON } from "@/lib/helpers/getMetaFromJSON";
import HeroSection from "@/components/HeroSection/HeroSection";
import Script from "next/script";

export async function generateMetadata() {
  const pageName = "industries";
  const data = await getData(`/seos?filters[slug][$eq]=${pageName}`);
  return getMetaFromJSON(data?.[0], pageName);
}

export default async function Industries() {
  const pageName = "industries";

  const data = await getData(`/seos?filters[slug][$eq]=${pageName}`)
  const jsonLd = data?.[0] ? data[0]?.script : ""

  const [header, tabList, discussSection, faq, getStart] = await Promise.all([
    getData("/industries-header?populate=background_image"),
    getData("/industries-list-of-industries-items?populate=image"),
    getData(
      "/industries-let-s-discuss-your-call?populate=background_image&populate=subject_image"
    ),
    getData("/industries-faq?populate=industries_faq_items"),
    getData("/lets-get-started?populate=*"),
  ]);
  const getServiceData = (data) => {
    const desktop = [];
    const mobile = [];
    const firstHalfData = [];
    const secondHalfData = [];

    const halfPoint = Math.round(data?.length / 2) - 1;
    data.forEach((item, index) => {
      const deskTopNav = {
        tabName: item.title,
        tabId: item.title?.toLowerCase(),
      };
      desktop.push(deskTopNav);
      mobile.push(item.title);

      if (index < halfPoint) firstHalfData.push(item);
      else secondHalfData.push(item);
    });

    return { desktop, mobile, firstHalfData, secondHalfData };
  };

  const getFaqData = (data) => {
    const faqData = data.industries_faq_items.map((ifq) => ({
      question: ifq.question,
      answer: ifq.answer,
    }));
    return faqData;
  };
  return (
    <>
      <Script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} key="jsonLd" id="schema"/>

      {header && (
        <Banner
          bannerimg={header.background_image?.url}
          heading={header.title}
          para={header.description}
          scheduleBtn={header.button_label}
          button_link={header.button_link}
          propsClass="bannerIndustries"
        />
      )}
      {tabList && (
        <>
          <div className={styles.pageNavNone}>
            <PageNav list={getServiceData(tabList).desktop} />
          </div>
          <div className={styles.pageNavMobile}>
            <ServicesDropdown
              list={getServiceData(tabList).mobile}
              Services={`Industries`}
            />
          </div>
        </>
      )}

      {tabList &&
        getServiceData(tabList).firstHalfData.map((fh, ind) => {
          const isEven = ind % 2 === 0;
          const id = fh.title?.toLowerCase()?.replace(/[\s-]+/g, "");
          if (isEven) {
            return (
              <div
                id={id}
                className={`${styles.customautomotive} ${styles.industrybg}`}
                key={ind}
              >
                <WebsiteDevelopement
                  heading={fh.title}
                  para={fh.description}
                  imageWeb={getImageURL(fh.image?.url) || imageWeb}
                  buttontext={fh.button_label}
                  buttonLink={fh.button_link || "#"}
                  colright={6}
                  colleft={6}
                  colRightClass="colleftIndustries"
                  colLeftClass="colrightIndustries"
                />
              </div>
            );
          } else {
            return (
              <div id={id} className={styles.customautomotive} key={ind}>
                <AppDevelopment
                  heading={fh.title}
                  para={fh.description}
                  imageWeb={getImageURL(fh.image?.url)}
                  buttontext={fh.button_label}
                  buttonLink={fh.button_link || "#"}
                  colright={6}
                  colleft={6}
                  colRightClass="colleftIndustries"
                  colLeftClass=""
                />
              </div>
            );
          }
        })}

      {discussSection && (
        <div className={`${styles.herosec}`}>
          <HeroSection
            title={discussSection.title}
            buttonText={discussSection.button_label}
            buttonLink={discussSection.button_link || "#"}
            imgSrc={discussSection.subject_image}
            description={discussSection.description}
            showDescription={true}
            backgroundImg={discussSection.background_image}
          />
        </div>
      )}

      {tabList &&
        getServiceData(tabList).secondHalfData.map((fh, ind) => {
          const id = fh.title?.toLowerCase()?.replace(/[\s-]+/g, "");
          const isEven = ind % 2 === 0;
          if (isEven) {
            return (
              <div
                id={id}
                className={`${styles.customautomotive} ${styles.industrybg}`}
                key={ind}
              >
                <WebsiteDevelopement
                  heading={fh.title}
                  para={fh.description}
                  imageWeb={getImageURL(fh.image?.url) || imageWeb}
                  buttontext={fh.button_label}
                  buttonLink={fh.button_link || "#"}
                  colright={6}
                  colleft={6}
                  colRightClass="colleftIndustries"
                  colLeftClass="colrightIndustries"
                />
              </div>
            );
          } else {
            return (
              <div id={id} className={styles.customautomotive} key={ind}>
                <AppDevelopment
                  heading={fh.title}
                  para={fh.description}
                  imageWeb={getImageURL(fh.image?.url)}
                  buttontext={fh.button_label}
                  buttonLink={fh.button_link || "#"}
                  colright={6}
                  colleft={6}
                  colRightClass="colleftIndustries"
                  colLeftClass=""
                />
              </div>
            );
          }
        })}

      {faq && (
        <div className={styles.ecommercefaqs}>
          <FaqsSection heading={faq.title} faqData={getFaqData(faq)} />
        </div>
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
}
