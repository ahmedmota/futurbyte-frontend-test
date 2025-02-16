import React from "react";
import { Container } from "react-bootstrap";
import ClientLogos from "./Components/ClientLogos/ClientLogos";
import Recognised from "./Components/Recognised/Recognised";
import { getOriginData} from "@/lib/api";
import Banner from "../partnership/Components/Banner/Banner";
import { getMetaFromJSON } from "@/lib/helpers/getMetaFromJSON";
import styles from "./style.module.css";
import Script from "next/script";
import { ORIGINS } from "@/lib/constants";

export async function generateMetadata() {
  const pageName = "our-clients";
  const data = await getOriginData(ORIGINS.CA,`/seos?filters[slug][$eq]=${pageName}`);
  return getMetaFromJSON(data?.[0], pageName, ORIGINS.CA);
}

export default async function OurClients() {

  const pageName = "our-clients";
  const data = await getOriginData(ORIGINS.CA,`/seos?filters[slug][$eq]=${pageName}`)
  const jsonLd = data?.[0] ? data[0]?.script : ""

  const getHeader = await getOriginData(ORIGINS.CA,`/our-clients-header?populate=*`);
  const getClients = await getOriginData(ORIGINS.CA,`/our-clients-list-items?populate=*`);
  const getRecognisedServices = await getOriginData(ORIGINS.CA,
    `/our-clients-we-are-recognised?populate=items.image`
  );

  let header = null;
  if (getHeader) {
    header = {
      title: getHeader.title,
      description: getHeader.description,
      image: getHeader.background_image?.url,
    };
  }

  let clients = {
    items: null,
  };
  if (getClients) {
    const items = getClients.map((el, i) => {
      return {
        icon: el.logo?.url,
      };
    });

    clients.logos = items;
  }

  let recognisedServices = null;
  if (getRecognisedServices) {
    recognisedServices = {
      title: getRecognisedServices.title,
      description: getRecognisedServices.description,
    };

    const items = getRecognisedServices.items?.map((el, i) => {
      return {
        title: el.title,
        description: el.description,
        buttonLabel: el.button_label,
        buttonLink: el.button_link,
        image: el.image?.url,
      };
    });

    recognisedServices.items = items;
  }

  return (
    <>
      <Script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} key="jsonLd" id="schema"/>

      <div>
        {header && (
          <Banner
            bannerimg={header.image}
            heading={header.title}
            para={header.description}
            // OurWork="Our Work"
            // google={google}
            // clutch={clutch}
            // trust={trust}
            marginBottom={true}
            propsClass={"augmentationBanner"}
          />
        )}
        <div className="pt-lg-5 pb-lg-5 pt-5 pb-2">
          <Container>
            {clients && <ClientLogos items={clients.logos} />}
          </Container>
        </div>
        <div className="py-lg-5 py-2">
          <Container className={styles["our-client-last-section-container"]}>
            {recognisedServices && (
              <Recognised
                title={recognisedServices.title}
                description={recognisedServices.description}
                items={recognisedServices.items}
              />
            )}
          </Container>
        </div>
      </div>
    </>
  );
}
