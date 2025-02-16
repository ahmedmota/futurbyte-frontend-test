"use client";

import { Col, Container, Row } from "react-bootstrap";
import SpecificCards from "./Components/SpecificCard/SpecificCard";
import ServiceCard from "./Components/ServiceCard/ServiceCard";
import Steps from "../../about-us/Components/Steps/Steps";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";

import style from "./style.module.css";
import "./dynamicPage.css";
import ApproachCard from "./Components/ApproachCard/ApproachCard";
import MultiServiceCard from "./Components/MultiServiceCard/MultiServiceCard";
import TrustBanner from "./Components/TrustBanner/TrustBanner";
import Banner from "@/components/Banner/Banner";
import PageNav from "../../services/Components/PageNav/PageNav";
import ModernBusinesses from "@/components/ModernBusinesses/ModernBusinesses";
import FAQSection from "@/components/Faqs/Faqs";
import HeroSection from "@/components/HeroSection/HeroSection";
import WhatsNew from "@/components/WhatsNew/WhatsNew";
import ServicesDropdown from "./Components/ServicesDropdown/ServicesDropdown";
import { useRouter } from "next/navigation";

export default function DynamicPageView({
  header,
  links,
  specificallyServices,
  webServices,
  impactServices,
  ourApproaches,
  developmentProcess,
  heroSection,
  webDevelopmentServices,
  whyTrustServices,
  faqServices,
  whatsNew,
  appDevelopment,
  appDevelopmentData,
}) {
  // This heading is added static for the marketing team to put data easily
  let defaultFAQHeading = null;

  const router = useRouter();

  if (!header) {
    if (typeof window !== "undefined") {
      router.push("/404");
    }
  } else {
    defaultFAQHeading = "Frequently Asked Questions";
  }

  return (
    <div>
      {header && (
        <Banner
          bannerimg={header?.backgroundImg?.url}
          heading={header?.title}
          para={header?.description}
          scheduleBtn={header?.buttonLabel}
          scheduleBtnLink={header?.buttonLink}
          marginBottom={true}
          propsClass={"homeBnner"}
          addLink={true}
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
      {specificallyServices && (
        <div className={style.specificallyServices}>
          <Container id={specificallyServices.id}>
            <Row>
              <Col>
                <SpecificCards
                  title={specificallyServices.title}
                  specificCards={specificallyServices.items}
                />
              </Col>
            </Row>
          </Container>
        </div>
      )}
      {webServices && (
        <div
          className={`${style["web-development-services"]} position-relative`}
          id={webServices.id}
        >
          <Container>
            <Row className="">
              <Col className="d-flex align-items-center" md={4}>
                <h2 className={style["services-main-heading"]}>
                  {webServices.title}
                </h2>
              </Col>
              {webServices?.items?.length &&
                webServices.items.map((el, i) => {
                  return (
                    <Col
                      md={4}
                      key={el.id}
                      className={`${i > 1 ? "mt-4" : "mt-md-0 mt-4"}`}
                    >
                      <ServiceCard
                        title={el.title}
                        description={el.description}
                        linkText={el.buttonLabel}
                        link={el.buttonLink}
                        imgSrc={el.icon}
                        key={i}
                      />
                    </Col>
                  );
                })}
            </Row>
          </Container>
        </div>
      )}
      {impactServices && (
        <div className={`${style["impact-section"]}`} id={impactServices?.id}>
          <Container>
            <h2 className={style.impactServices}>{impactServices.title}</h2>
            {impactServices.items?.length && (
              <Steps
                className={`bg-pink`}
                isBg={true}
                steps={impactServices.items}
              />
            )}
          </Container>
        </div>
      )}

      {heroSection && (
        <div className={style["why-us-hero-section"]}>
          <Container className={style["why-us-hero-s-container"]}>
            <HeroSection
              title={heroSection.title}
              buttonText={heroSection.buttonLabel}
              description={heroSection.description}
              imgSrc={heroSection.image}
              buttonLink={heroSection.buttonLink}
            />
          </Container>
        </div>
      )}
      {developmentProcess && (
        <div
          className={style["our-web-development-process"]}
          id={developmentProcess.id}
        >
          <ModernBusinesses
            title={developmentProcess.title}
            tabContent={developmentProcess.items}
            propsClass=""
            propsPara="propsPara"
            isLearnMore={true}
            isBgAllow={true}
          />
        </div>
      )}

      {ourApproaches && (
        <section className={style['approach-main-main']}>
          <Container>
            <div
              className={`${style["approach-main-top"]} approach-top-cat`}
            >
              <Row id={ourApproaches.id}>
                <Col className="overflow-visible position-relative d-md-block d-none">
                  <h3 className={`${style["approach-heading"]} mb-4`}>
                    {ourApproaches.title}
                  </h3>
                  <div className="position-relative">
                    <Swiper
                      className={style["approach-swiper"]}
                      modules={[Pagination, Navigation]}
                      slidesPerView={2}
                      spaceBetween={24}
                      onSlideChange={() => console.log("slide change")}
                      onSwiper={(swiper) => console.log(swiper)}
                      pagination={{
                        clickable: true,
                      }}
                      navigation={{
                        enabled: true,
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev",
                      }}
                      loop={true}
                    >
                      {ourApproaches?.items?.length &&
                        ourApproaches?.items.map((el, i) => {
                          return (
                            <SwiperSlide key={i}>
                              <ApproachCard
                                title={el.title}
                                description={el.description}
                                imgSrc={el.imgSrc}
                              />
                            </SwiperSlide>
                          );
                        })}
                    </Swiper>
                    <div className={"swiper-button-next"}></div>
                    <div className={"swiper-button-prev"}></div>
                  </div>
                </Col>
                <Col className="overflow-visible position-relative d-md-none d-block">
                  <h3 className={`${style.posut} text-center`}>
                    {ourApproaches.title}
                  </h3>
                  <Swiper
                    className={style["approach-swiper"]}
                    modules={[Pagination]}
                    slidesPerView={1}
                    onSlideChange={() => console.log("slide change")}
                    onSwiper={(swiper) => console.log(swiper)}
                    pagination={{
                      clickable: true,
                    }}
                  >
                    {ourApproaches?.items?.length &&
                      ourApproaches?.items.map((el, i) => {
                        return (
                          <SwiperSlide key={i}>
                            <ApproachCard
                              title={el.title}
                              description={el.description}
                              imgSrc={el.imgSrc}
                              key={i}
                            />
                          </SwiperSlide>
                        );
                      })}
                  </Swiper>
                </Col>
              </Row>
            </div>
          </Container>
        </section>
      )}

      {webDevelopmentServices && (
        <section id={webDevelopmentServices?.id}
          className={`${style.mergemulti}`}>
          <Container>
            <div
            >
              <Row>
                <h2 className={style["multi-services-main-heading"]}>
                  {webDevelopmentServices?.title}
                </h2>
                {webDevelopmentServices.items?.length > 0 &&
                  webDevelopmentServices?.items?.map((el, i) => {
                    return (
                      <Col
                        className={`${style.descriptionlong} ${i <= 2 ? "mb-2" : "mb-md-0 mb-2"
                          }`}
                        md={4}
                        key={i}
                      >
                        <MultiServiceCard
                          title={el.title}
                          description={el.description}
                          imgSrc={el.icon}
                        />
                      </Col>
                    );
                  })}
              </Row>
            </div>
          </Container>
        </section>
      )}
      {whyTrustServices && (
        <Container>
          <div id={whyTrustServices?.id}>
            <Row>
              <Col className={style["trust-banner-col"]}>
                <TrustBanner
                  title={whyTrustServices?.title}
                  description={whyTrustServices?.description}
                  buttons={whyTrustServices.items}
                  buttonLabel={whyTrustServices.buttonLabel}
                  buttonLink={whyTrustServices.buttonLink}
                />
              </Col>
            </Row>
          </div>

        </Container>
      )}
      <Container className={style["cat-view-container"]}>
        {whatsNew && (
          <div className={`${style.faqsWeb} faqsWeb position-relative`}>
            <Row>
              <Col>
                <WhatsNew
                  testimonials={whatsNew?.items}
                  btnLabel={whatsNew?.buttonLabel}
                  btnLink={whatsNew?.buttonLink}
                  heading={whatsNew?.heading}
                  buttonTrue=""
                  whatsNewClas="whatsNewClas"
                />
              </Col>
            </Row>
          </div>
        )}

        {!!(appDevelopment && appDevelopmentData) && (
          <div
            id={appDevelopment?.documentId}
            className={`${style.faqsWeb} faqsWeb position-relative`}
          >
            <Row>
              <Col>
                <WhatsNew
                  testimonials={appDevelopmentData?.items}
                  description={appDevelopment.description}
                  heading={appDevelopment?.title}
                  buttonTrue=""
                  whatsNewClas="whatsNewClas"
                />
              </Col>
            </Row>
          </div>
        )}
        {!!faqServices && (
          <Row id={"faq"}>
            <Col>
              <div className={style["website-development-faqs"]}>
                <FAQSection
                  heading={defaultFAQHeading}
                  faqData={faqServices.items}
                />
              </div>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
}
