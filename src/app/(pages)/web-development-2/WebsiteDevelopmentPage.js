"use client";

import { Col, Container, Row } from "react-bootstrap";
import SpecificCards from "./Components/SpecificCard/SpecificCard";
import ServiceCard from "./Components/ServiceCard/ServiceCard";
import Steps from "../about-us/Components/Steps/Steps";

// Core modules imports are same as usual
import { Navigation, Pagination } from "swiper/modules";

//Swiper
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Import Swiper styles
import "swiper/css";

import style from "./style.module.css";
import "./WebsiteDevelopmentPage.css";
import ApproachCard from "./Components/ApproachCard/ApproachCard";
import MultiServiceCard from "./Components/MultiServiceCard/MultiServiceCard";
import TrustBanner from "./Components/TrustBanner/TrustBanner";
import Banner from "@/components/Banner/Banner";
import PageNav from "../services/Components/PageNav/PageNav";
import ModernBusinesses from "@/components/ModernBusinesses/ModernBusinesses";
import FAQSection from "@/components/Faqs/Faqs";
import HeroSection from "@/components/HeroSection/HeroSection";
import WhatsNew from "@/components/WhatsNew/WhatsNew";
import ServicesDropdown from "./Components/ServicesDropdown/ServicesDropdown";

export default function WebsiteDevelopment({
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
}) {
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
                <h1 className={style["services-main-heading"]}>
                  {webServices.title}
                </h1>
              </Col>
              {webServices?.items?.length &&
                webServices.items.map((el, i) => {
                  return (
                    <Col md={4} key={el.id} className="mt-4">
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
      <Container>
        {heroSection && (
          <div className={style["why-us-hero-section"]}>
            <HeroSection
              title={heroSection.title}
              buttonText={heroSection.buttonLabel}
              description={heroSection.description}
              imgSrc={heroSection.image}
              buttonLink={heroSection.buttonLink}
            />
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
              propsClass="propsClass"
              propsPara="propsPara"
              isLearnMore={true}
            />
          </div>
        )}
        {ourApproaches && (
          <div className={`${style["approach-main-top"]} position-relative`}>
            <Row id={ourApproaches.id}>
              <Col className="overflow-visible position-relative d-md-block d-none">
                <h3 className={`${style["approach-heading"]} mb-4`}>
                  {ourApproaches.title}
                </h3>
                <Swiper
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
              </Col>
              <Col className="overflow-visible position-relative d-md-none d-block">
                <h3 className={`${style.posut} text-center`}>
                  {ourApproaches.title}
                </h3>
                <Swiper
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
        )}
        {webDevelopmentServices && (
          <div id={webDevelopmentServices.id}>
            <Row className={`${style.mergemulti}`}>
              <h1 className={style["multi-services-main-heading"]}>
                {webDevelopmentServices?.title}
              </h1>
              {webDevelopmentServices.items?.length > 0 &&
                webDevelopmentServices?.items?.map((el, i) => {
                  return (
                    <Col
                      className={`${style.descriptionlong} mb-2`}
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
        )}
        {whyTrustServices && (
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
        )}
      </Container>
      {/* <div className={style["our-web-development-process"]}>
        <ModernBusinesses
          title="Custom Software Development, Tailored for You!"
          para={
            <>
              Every B2B business is unique, so one-size-fits-all software won’t
              do. Our custom software solutions are built from scratch to solve
              your problems effectively.
            </>
          }
          tabContent={CustomSoftware}
          activeTab={activeCustomSoftware}
          setActiveTab={setCustomSoftware}
          propsClass="propsClass"
          isLearnMore={false}
        />
      </div> */}

      <Container>
        <div className={`${style.faqsWeb} faqsWeb position-relative`}>
          <Row>
            <Col>
              {whatsNew && (
                <WhatsNew
                  testimonials={whatsNew?.items}
                  btnLabel={whatsNew?.buttonLabel}
                  btnLink={whatsNew?.buttonLink}
                  heading={whatsNew?.heading}
                  buttonTrue=""
                  whatsNewClas="whatsNewClas"
                />
              )}
            </Col>
          </Row>
        </div>
        {faqServices && (
          <Row id={faqServices.id}>
            <Col>
              <div className={style["website-development-faqs"]}>
                <FAQSection
                  heading={faqServices.title}
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
