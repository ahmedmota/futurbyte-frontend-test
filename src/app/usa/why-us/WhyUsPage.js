import { Container } from "react-bootstrap";
import ContantPart from "./Components/ContentPart/ContentPart";
import Steps from "./Components/Steps/Steps";
import Banner from "@/components/Banner/Banner";
import GetStartedSection from "@/components/GetStartedSection/GetStartedSection";
import styles from "./style.module.css";
import HeroSection from "./Components/HeroSection/HeroSection";

export default function WhyUs({
  header,
  professionals,
  peoples,
  howWeDo,
  heroSection,
  getStart,
}) {
  return (
    <div>
      {header && (
        <Banner
          bannerimg={header?.bannerImg?.url}
          heading={header.heading}
          para={header.description}
          scheduleBtn={header.buttonLabel}
          buttonLink={header.buttonLink}
          propsClass="whyBanner"
        />
      )}

      {professionals && (
        <div className={styles["content-part-section-1"]}>
          <Container className={styles["content-part-container"]}>
            <ContantPart
              contentClasses={"pe-lg-5"}
              title={professionals.heading}
              description={professionals.description}
              imgSrc={professionals.imgSrc}
              contactFirst={true}
            />
          </Container>
        </div>
      )}

      {peoples && (
        <Container className={styles["content-part-container-2"]}>
          <Steps steps={peoples} />
        </Container>
      )}
      {howWeDo && (
        <div className={styles["content-part-section-3"]}>
          <Container className={styles["content-part-container-3"]}>
            <ContantPart
              contentClasses={"ps-lg-5 pl-lg-2"}
              title={howWeDo.title}
              description={howWeDo.description}
              imgSrc={howWeDo?.imgSrc}
              contactFirst={false}
              buttonText={howWeDo.buttonLabel}
              buttonLink={howWeDo.buttonLink}
            />
          </Container>
        </div>
      )}
      {heroSection && (
        <div className={styles["why-us-hero-section"]}>
          <HeroSection
            title={heroSection.title}
            buttonLabel={heroSection.buttonLabel}
            imgSrc={heroSection.imgSrc}
            description={heroSection.description}
            backgroundImg={heroSection.backgroundImg}
            showDescription={false}
          />
        </div>
      )}
      {getStart && (
        <div className="mt-lg-5">
          <GetStartedSection
            heading={getStart.heading}
            description={getStart.description}
            subHeading={getStart.benefits_label}
            buttonLabel={getStart.button_label}
            benefits={getStart.lets_get_started_benefits}
          />
        </div>
      )}
    </div>
  );
}
