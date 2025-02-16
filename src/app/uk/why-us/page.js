import { getOriginData} from "@/lib/api"; // Custom data-fetching function
import WhyUs from "./WhyUsPage";
import { getMetaFromJSON } from "@/lib/helpers/getMetaFromJSON";
import Script from "next/script";
import { ORIGINS } from "@/lib/constants";

export async function generateMetadata() {
  const pageName = 'why-us'
  const data = await getOriginData(ORIGINS.UK,`/seos?filters[slug][$eq]=${pageName}`)
  return getMetaFromJSON(data?.[0], pageName, ORIGINS.UK)
}

export default async function WhyUsPage() {
  const pageName = 'why-us'
  const data = await getOriginData(ORIGINS.UK,`/seos?filters[slug][$eq]=${pageName}`)
  const jsonLd = data?.[0] ? data[0]?.script : ""

  // Fetch data here (e.g., header data)
  const [header, professionals, peoples, howWeDo, heroSection, getStart] =
    await Promise.all([
      getOriginData(ORIGINS.UK,"/why-us-header?populate=*"),
      getOriginData(ORIGINS.UK,"/why-us-professional?populate=*"),
      getOriginData(ORIGINS.UK,"/why-us-peoples?populate=*"),
      getOriginData(ORIGINS.UK,"/why-us-how-we-do?populate=*"),
      getOriginData(ORIGINS.UK,"/why-us-work-with?populate=*"),
      getOriginData(ORIGINS.UK,"/lets-get-started?populate=*"),
    ]);

  function getHeader(data) {
    return {
      heading: data?.heading,
      description: data?.description,
      buttonLink: data?.button_link,
      buttonLabel: data?.button_label,
      bannerImg: data?.background_image,
    };
  }

  function getProfessional(data) {
    return {
      heading: data?.heading,
      description: data?.description,
      imgSrc: data?.image,
    };
  }

  function getPeoples(data) {
    return data?.map((el, i) => {
      return {
        title: el.title,
        description: el.description,
        iconSrc: el.icon,
      };
    });
  }

  function getHowWeDo(data) {
    return {
      title: data?.title,
      description: data?.description,
      imgSrc: data?.image,
      buttonLabel: data?.button_label,
      buttonLink: data?.button_link,
    };
  }

  function getHeroSection(data) {
    return {
      title: data?.title,
      description: data?.description,
      buttonLabel: data?.button_label,
      buttonLink: data?.button_link,
      backgroundImg: data?.background_image,
      imgSrc: data?.image,
    };
  }

  // Pass the fetched data to the client component
  return (
    <>
      <Script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} key="jsonLd" id="schema"/>

      <WhyUs
        header={getHeader(header)}
        professionals={getProfessional(professionals)}
        peoples={getPeoples(peoples)}
        howWeDo={getHowWeDo(howWeDo)}
        heroSection={getHeroSection(heroSection)}
        getStart={getStart}
      />
    </>
  );
}
