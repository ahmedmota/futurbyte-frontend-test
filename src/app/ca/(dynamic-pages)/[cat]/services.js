import { getOriginData} from "@/lib/api";
import { ORIGINS } from "@/lib/constants";
import { getImageURL } from "@/lib/helpers";

export async function getAllData(dynamicPageName) {
  async function getDynamicPageData(endPoint, passAll = false) {
    const endPointWithSlug = endPoint + `filters[slug][$eq]=${dynamicPageName}`;
    const data = await getOriginData(ORIGINS.CA,endPointWithSlug);

    const selectedPageData = passAll ? data : data?.[0];
    return selectedPageData;
  }
  const allData = await Promise.all([
    getDynamicPageData("/web-development-main-page-headers?populate=*&"),
    getDynamicPageData(
      "/web-development-main-page-tailored-specificallies?populate=items&populate=items.image&"
    ),
    getDynamicPageData(
      "/replicate-comprehensive-webs?populate=items&populate=items.icon&"
    ),
    getDynamicPageData(
      "/web-development-main-page-maximize-impacts?populate=items&populate=items.image&"
    ),
    getDynamicPageData(
      "/web-development-main-page-our-development-processes?populate=items&populate=items.image&"
    ),
    getDynamicPageData(
      "/web-development-main-page-our-approaches?populate=items&populate=items.image&"
    ),
    getDynamicPageData(
      "/web-development-main-page-pages?populate=web_development_main_page_web_development_items&populate=web_development_main_page_web_development_items.icon&"
    ),
    getDynamicPageData(
      "/web-development-main-page-why-trusts?populate=sub_headings&"
    ),
    getDynamicPageData("/web-development-main-page-faq-items?", true),
    getOriginData(ORIGINS.CA,"/case-studies-inner-page-headers?populate=thumbnail&fields[0]=title&fields[1]=short_description&fields[2]=slug&sort=createdAt:desc"),
    getDynamicPageData(
      "/web-development-main-page-ready-to-revamps?populate=*&"
    ),
    getDynamicPageData("/replicate-the-most-trusted-app-development-pages?"),
    getDynamicPageData(
      "/replicate-the-most-trusted-app-development-page-items?populate=*&",
      true
    ),
  ]);
  return allData;
}

export function getLinks(
  specificallyServices,
  webServices,
  impactServices,
  developmentProcess,
  ourApproaches,
  webDevelopmentServices,
  whyTrustServices,
  faqServices,
  appDevelopment
) {
  return [
    {
      tabName: specificallyServices?.tab_name,
      tabId: specificallyServices?.documentId,
    },
    {
      tabName: webServices?.tab_name,
      tabId: webServices?.documentId,
    },
    {
      tabName: impactServices?.tab_name,
      tabId: impactServices?.documentId,
    },
    {
      tabName: developmentProcess?.tab_name,
      tabId: developmentProcess?.documentId,
    },
    {
      tabName: ourApproaches?.tab_name,
      tabId: ourApproaches?.documentId,
    },
    {
      tabName: webDevelopmentServices?.tab_name,
      tabId: webDevelopmentServices?.documentId,
    },
    {
      tabName: whyTrustServices?.tab_name,
      tabId: whyTrustServices?.documentId,
    },
    {
      tabName: faqServices?.tab_name,
      tabId: faqServices?.documentId,
    },
    {
      tabName: appDevelopment?.tab_name,
      tabId: appDevelopment?.documentId,
    },
    {
      tabName: "FAQ",
      tabId: "faq",
    },
  ];
}

export function getWebsiteDevelopmentHeader(data) {
  if (!data) return;
  return {
    id: data?.documentId,
    title: data?.title,
    description: data?.description,
    buttonLabel: data?.button_label,
    buttonLink: data?.button_link,
    backgroundImg: data?.background_image,
  };
}

export function getSpecificallyServices(data) {
  if (!data) return;
  const items = data?.items?.map((el, i) => {
    return {
      title: el?.title,
      subTitleOne: el?.sub_title_one,
      subTitleOneDescription: el?.description_for_sub_title_one,
      subTitleTwo: el?.sub_title_two,
      subTitleTwoDescription: el?.description_for_sub_title_two,
      imgSrc: el?.image,
    };
  });

  return {
    id: data?.documentId,
    title: data?.title,
    items,
  };
}

export function getWebServices(data) {
  if (!data) return;
  const items = data?.items?.map((el, i) => {
    return {
      title: el?.title,
      description: el?.description,
      buttonLabel: el?.button_label,
      buttonLink: el?.button_link,
      icon: el?.icon,
    };
  });

  return {
    id: data?.documentId,
    title: data?.title,
    items,
  };
}

export function getImpactServices(data) {
  if (!data) return;
  const items = data?.items
    ?.sort((a, b) => parseInt(a.priority) - parseInt(b.priority))
    ?.map((el, i) => {
      return {
        title: el?.title,
        description: el?.description,
        priority: el?.priority,
        imgSrc: el?.image,
      };
    });

  return {
    id: data?.documentId,
    title: data?.title,
    items,
  };
}

export function getOurApproaches(data) {
  if (!data) return;
  const items = data?.items?.map((el, i) => {
    return {
      title: el?.title,
      description: el?.description,
      imgSrc: el?.image,
    };
  });

  return {
    id: data?.documentId,
    title: data?.title,
    items,
  };
}

export function getDevelopmentProcess(data) {
  if (!data) return;
  const developmentProcessTabContent = {};
  data?.items?.forEach((el) => {
    developmentProcessTabContent[el.title] = {
      title: el.heading,
      mainButtonLabel: el.title,
      description: el?.description,
      image: getImageURL(el?.image?.url),
    };
  });
  return {
    id: data?.documentId,
    title: data?.title,
    items: developmentProcessTabContent,
  };
}

export function getWebDevelopmentServices(data) {
  if (!data) return;
  const items = data?.web_development_main_page_web_development_items?.map(
    (el, i) => {
      return {
        title: el?.title,
        description: el?.description,
        icon: el?.icon,
      };
    }
  );

  return {
    id: data?.documentId,
    title: data?.title,
    items,
  };
}

export function getWhyTrustServices(data) {
  if (!data) return;
  const items = data?.sub_headings?.map((el, i) => {
    return {
      label: el?.label,
      link: el?.link,
    };
  });

  return {
    id: data?.documentId,
    title: data?.title,
    description: data?.description,
    buttonLabel: data?.button_label,
    buttonLink: data?.button_link,
    items,
  };
}

export function getFaqServices(data) {
  if (!data) return;
  const items = data?.map((el) => {
    return {
      question: el?.question,
      answer: el?.answer,
    };
  });

  return {
    id: data?.documentId,
    title: data?.title,
    items,
  };
}

export function getWhatNewData(data) {
  if (!data) return;
  const whatsNew = data?.map((wn) => ({
    id: wn.documentId,
    image: getImageURL(wn?.thumbnail?.url),
    imageData: {
      height: wn?.thumbnail?.height,
      width: wn?.thumbnail?.width,
      alternativeText: wn?.thumbnail?.alternativeText,
    },
    title: wn.title,
    para: wn.short_description,
    button: wn.button_label || "Learn More",
    buttonLink: wn.slug ? "/case-studies/" + wn.slug : "#",
    category: wn.tag,
  }));

  return {
    heading: "Case Studies",
    buttonLabel: "Learn More",
    buttonLink: "#",
    items: whatsNew,
  };
}

export function getAppDevelopmentData(data) {
  if (!data) return;
  const appDevelopmentData = data?.map((wn) => ({
    id: wn.documentId,
    image: getImageURL(wn?.image?.url),
    imageData: {
      height: wn?.image?.height,
      width: wn?.image?.width,
      alternativeText: wn?.image?.alternativeText,
    },
  }));

  return {
    items: appDevelopmentData,
  };
}

export function getHeroSection(data) {
  if (!data) return;
  const heroSectionData = {
    title: data.title,
    description: data.description,
    buttonLabel: data.button_label,
    buttonLink: data.button_link || "#",
    image: data.subject_image,
  };
  return heroSectionData;
}
