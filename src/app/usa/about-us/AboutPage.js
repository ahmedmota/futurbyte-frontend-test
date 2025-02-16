"use client";

import { Col, Container, Row } from "react-bootstrap";
import TopBar from "./Components/TopBar/Topbar";
import Commitment from "./Components/Commitment/Commitment";
import TeamCard from "./Components/TeamCard/TeamCard";
import Privileged from "@/components/Privileged/Privileged";
import LogoSlider from "@/components/LogoSlider/LogoSlider";
// Core modules imports are same as usual
import { Pagination } from "swiper/modules";

//Swiper
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Styles must use direct files imports
import "swiper/css"; // Core Swiper styles
import "swiper/css/pagination"; // Pagination module styles (if you need it)

// Import Swiper styles
import "swiper/css";

import "./style.css";
import Steps from "./Components/Steps/Steps";
import GetStartedSection from "@/components/GetStartedSection/GetStartedSection";

export default function About({
  header,
  beginnings,
  commitments,
  privileged,
  getStart,
  ourTeams,
}) {
  return (
    <div>
      <Container>
        {header && (
          <Row className="text-center my-lg-5 main-top">
            {
              <TopBar
                title={`${header.heading}`}
                description={`${header.description}`}
                imgSrc={header.image}
              />
            }
          </Row>
        )}
        {beginnings?.length && (
          <div className="steps-about">
            <Steps steps={beginnings} />
          </div>
        )}
        {commitments && (
          <Row className="my-lg-5">
            <Col>
              <h2 className="text-center about-section-steps">
                {commitments.heading}
              </h2>
              {commitments.items?.length && (
                <Row className="pt-4 commitment-wrapper-main mb-4">
                  {commitments.items.map((el, i) => {
                    return (
                      <Col
                        lg={3}
                        md={6}
                        className="commitment-wrapper mb-4"
                        key={i}
                      >
                        <Commitment
                          title={el.title}
                          description={el.description}
                          imgSrc={el.imgSrc}
                        />
                      </Col>
                    );
                  })}
                </Row>
              )}
            </Col>
          </Row>
        )}
        <Row className="my-lg-3 priviledge-about-top">
          <Col>
            {privileged && (
              <>
                <Privileged
                  title={privileged.heading}
                  description={privileged.description}
                />

                {privileged?.logos && <LogoSlider logos={privileged.logos} />}
              </>
            )}
          </Col>
        </Row>
        {ourTeams && (
          <Row className="my-lg-4 our-teams-about">
            <Col>
              {ourTeams.title && (
                <h2 className="text-center about-section-team">
                  {ourTeams.title}
                </h2>
              )}
              <Row className="mt-lg-4 d-md-flex d-none">
                {ourTeams.items?.length &&
                  ourTeams.items.map((el, i) => {
                    return (
                      <Col md={6} lg={3} className="mb-4" key={i}>
                        <TeamCard
                          name={el.name}
                          designation={el.position}
                          profileImg={el.profile}
                        />
                      </Col>
                    );
                  })}
              </Row>
              <Row className="d-md-none d-block p-lg-4">
                <Swiper
                  modules={[Pagination]}
                  slidesPerView={1}
                  onSlideChange={() => console.log("slide change")}
                  onSwiper={(swiper) => console.log(swiper)}
                  pagination={{
                    clickable: true,
                  }}
                  className={"swiper-teams"}
                >
                  {ourTeams.items?.length &&
                    ourTeams.items.map((el, i) => {
                      return (
                        <SwiperSlide key={i}>
                          <TeamCard
                            name={el.name}
                            designation={el.position}
                            profileImg={el.profile}
                          />
                        </SwiperSlide>
                      );
                    })}
                </Swiper>
              </Row>
            </Col>
          </Row>
        )}
      </Container>
      {getStart && (
        <div className="mt-lg-5">
          <GetStartedSection
            heading={getStart.heading}
            description={getStart.description}
            subHeading={getStart.benefits_label}
            buttonLabel={getStart.button_label}
            buttonLink={getStart.button_link}
            benefits={getStart.lets_get_started_benefits}
          />
        </div>
      )}
    </div>
  );
}
