import { Col, Container, Row } from "react-bootstrap";
import Growth from "./Components/Growth/Growth";
import Legacy from "./Components/Legacy/Legacy";
import Banner from "./Components/Banner/Banner";
import styles from "./style.module.css";
import { getOriginData} from "@/lib/api";
import { getMetaFromJSON } from "@/lib/helpers/getMetaFromJSON";
import Script from "next/script";
import { ORIGINS } from "@/lib/constants";

export async function generateMetadata() {
  const pageName = 'partnership'
  const data = await getOriginData(ORIGINS.CA,`/seos?filters[slug][$eq]=${pageName}`)
  return getMetaFromJSON(data?.[0], pageName, ORIGINS.CA)
}

export default async function Partnership() {
  const pageName = 'partnership'
  const data = await getOriginData(ORIGINS.CA,`/seos?filters[slug][$eq]=${pageName}`)
  const jsonLd = data?.[0] ? data[0]?.script : ""

  const getHeader = await getOriginData(ORIGINS.CA,`/partnership-header?populate=*`);
  const getLetsBePartner = await getOriginData(ORIGINS.CA,
    `/partnership-lets-be-partner?populate=items.icon`
  );
  const getOurLegacy = await getOriginData(ORIGINS.CA,
    `/partnership-our-legacy?populate=items.image`
  );

  let header = null;
  if (getHeader) {
    header = {
      title: getHeader.title,
      description: getHeader.description,
      subDescription: getHeader.sub_description,
      image: getHeader.background_image?.url,
      buttonLabel: getHeader.button_label,
      buttonLink: getHeader.button_link,
    };
  }

  let letsBePartner = null;
  if (getLetsBePartner) {
    letsBePartner = {
      title: getLetsBePartner.title,
    };

    const items = getLetsBePartner.items?.map((el) => {
      return {
        title: el.title,
        description: el.description,
        icon: el.icon?.url,
      };
    });

    letsBePartner.items = items;
  }

  let ourLegacy = null;
  if (getOurLegacy) {
    ourLegacy = {
      title: getOurLegacy.title,
      description: getOurLegacy.description,
    };

    const items = getOurLegacy.items?.map((el, i) => {
      return {
        counter: el.counter,
        description: el.short_description,
        image: el.image?.url,
      };
    });

    ourLegacy.items = items;
  }

  return (
    <>
      <Script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} key="jsonLd" id="schema"/>

      <div>
        <div>
          {header && (
            <Banner
              bannerimg={header.image}
              heading={header.title}
              para={header.description}
              scheduleBtn={header.buttonLabel}
              scheduleBtnLink={header.buttonLabel}
              subPara={header.subDescription}
              // OurWork="Our Work"
              // google={google}
              // clutch={clutch}
              // trust={trust}
              marginBottom={true}
              propsClass={"augmentationBanner"}
            />
          )}
        </div>
        <div className={`${styles["partner-section-two"]}`}>
          <Container>
            {letsBePartner && (
              <Row>
                <Col md={4}>
                  {letsBePartner.title && (
                    <h1 className={styles["growth-first"]}>
                      {letsBePartner.title}
                    </h1>
                  )}
                </Col>
                <Col md={8}>
                  <Row>
                    {letsBePartner.items &&
                      letsBePartner.items.map((el, i) => {
                        return (
                          <Col className="mb-4" lg={6} md={6} key={i}>
                            <Growth
                              title={el.title}
                              description={el.description}
                              imgSrc={el.icon}
                            />
                          </Col>
                        );
                      })}
                  </Row>
                </Col>
              </Row>
            )}
          </Container>
        </div>
        {ourLegacy && (
          <Legacy
            title={ourLegacy.title}
            description={ourLegacy.description}
            items={ourLegacy.items}
          />
        )}
      </div>
    </>
  );
}
