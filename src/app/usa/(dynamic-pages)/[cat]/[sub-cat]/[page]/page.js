import { getAllData, getWebDevelopmentServices, getWebsiteDevelopmentHeader, getHeroSection, getOurApproaches, getWhatNewData, getFaqServices, getWhyTrustServices, getDevelopmentProcess, getLinks, getImpactServices, getSpecificallyServices, getWebServices, getAppDevelopmentData } from "../../services";
import DynamicPageView from "../../catView"
import { getMetaFromJSON } from "@/lib/helpers/getMetaFromJSON";
import { getOriginData} from "@/lib/api";
import Script from "next/script";
import { ORIGINS } from "@/lib/constants";

export async function generateMetadata({ params }) {
  const pageName = `${params.cat}/${params["sub-cat"]}/${params.page}`
  const data = await getOriginData(ORIGINS.US,`/seos?filters[slug][$eq]=${pageName}`)
  return getMetaFromJSON(data?.[0], pageName, ORIGINS.US)
}


export default async function CatPage({ params }) {
  const dynamicPageName = `${params.cat}/${params["sub-cat"]}/${params.page}`

  const data = await getOriginData(ORIGINS.US,`/seos?filters[slug][$eq]=${dynamicPageName}`)
  const jsonLd = data?.[0] ? data[0]?.script : ""
  const [
    header,
    specificallyServices,
    webServices,
    impactServices,
    developmentProcess,
    ourApproaches,
    webDevelopmentServices,
    whyTrustServices,
    faqServices,
    whatsNew,
    heroSection,
    appDevelopment,
    appDevelopmentData
  ] = await getAllData(dynamicPageName);
  return (
    <>
      <Script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} key="jsonLd" id="schema"/>

      <DynamicPageView
        header={getWebsiteDevelopmentHeader(header)}
        links={getLinks(
          specificallyServices,
          webServices,
          impactServices,
          developmentProcess,
          ourApproaches,
          webDevelopmentServices,
          whyTrustServices,
          faqServices,
          appDevelopment
        )}
        specificallyServices={getSpecificallyServices(specificallyServices)}
        webServices={getWebServices(webServices)}
        impactServices={getImpactServices(impactServices)}
        ourApproaches={getOurApproaches(ourApproaches)}
        developmentProcess={getDevelopmentProcess(developmentProcess)}
        webDevelopmentServices={getWebDevelopmentServices(webDevelopmentServices)}
        whyTrustServices={getWhyTrustServices(whyTrustServices)}
        faqServices={getFaqServices(faqServices)}
        whatsNew={getWhatNewData(whatsNew)}
        heroSection={getHeroSection(heroSection)}
        appDevelopment={appDevelopment}
        appDevelopmentData={getAppDevelopmentData(appDevelopmentData)}
      />
    </>

  );
}
