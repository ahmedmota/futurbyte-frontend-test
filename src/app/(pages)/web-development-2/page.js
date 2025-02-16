import { getData } from "@/lib/api";
import WebsiteDevelopment from "./WebsiteDevelopmentPage";
import { getImageURL } from "@/lib/helpers";

export default async function WebsiteDevelopmentPage() {
  // const [
  //   header,
  //   specificallyServices,
  //   webServices,
  //   impactServices,
  //   developmentProcess,
  //   ourApproaches,
  //   webDevelopmentServices,
  //   whyTrustServices,
  //   faqServices,
  //   whatsNew,
  //   heroSection,
  // ] = await Promise.all([
  //   getData("/web-development-main-page-header?populate=background_image"),
  //   getData(
  //     "/web-development-main-page-tailored-specifically?populate=items&populate=items.image"
  //   ),
  //   getData(
  //     "/web-development-main-page-comprehensive-web?populate=items&populate=items.icon"
  //   ),
  //   getData(
  //     "/web-development-main-page-maximize-impact?populate=items&populate=items.image"
  //   ),
  //   getData(
  //     "/web-development-main-page-our-development-process?populate=items&populate=items.image"
  //   ),
  //   getData(
  //     "/web-development-main-page-our-approach?populate=items&populate=items.image"
  //   ),
  //   getData(
  //     "/web-development-main-page-web-development?populate=web_development_main_page_web_development_items&populate=web_development_main_page_web_development_items.icon"
  //   ),
  //   getData("/web-development-main-page-why-trust?populate=sub_headings"),
  //   getData("/web-development-main-page-faq?populate=items"),
  //   getData("/web-development-main-page-case-study?populate=items.image"),
  //   getData("/web-development-main-page-ready-to-revamp?populate=*"),
  // ]);

  const getDynamicPageData = async (endPoint) => {
    const endPointWithSlug = endPoint
    const data = await getData(endPointWithSlug)
    const selectedPageData = data?.[0]
    return selectedPageData
  }
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
  ] = await Promise.all([
    getDynamicPageData("/web-development-main-page-headerd?populate=*"),
    getDynamicPageData(
      "/web-development-main-page-tailored-specificallies?populate=items&populate=items.image"
    ),
    getDynamicPageData(
      "/replicate-comprehensive-webs?populate=items&populate=items.icon"
    ),
    getDynamicPageData(
      "/web-development-main-page-maximize-impacts?populate=items&populate=items.image"
    ),
    getDynamicPageData(
      "/web-development-main-page-our-development-processes?populate=items&populate=items.image"
    ),
    getDynamicPageData(
      "/web-development-main-page-our-approaches?populate=items&populate=items.image"
    ),
    getDynamicPageData(
      "/web-development-main-page-pages?populate=web_development_main_page_web_development_items&populate=web_development_main_page_web_development_items.icon"
    ),
    getDynamicPageData("/web-development-main-page-why-trusts?populate=sub_headings"),
    getDynamicPageData("/web-development-main-page-faqs?populate=items"),
    getDynamicPageData("/replicate-case-studies?populate=items.image"),
    getDynamicPageData("/web-development-main-page-ready-to-revamps?populate=*"),
  ]);
  function getLinks(
    specificallyServices,
    webServices,
    impactServices,
    developmentProcess,
    ourApproaches,
    webDevelopmentServices,
    whyTrustServices,
    faqServices
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
    ];
  }

  function getWebsiteDevelopmentHeader(data) {
    return {
      id: data?.documentId,
      title: data?.title,
      description: data?.description,
      buttonLabel: data?.button_label,
      buttonLink: data?.button_link,
      backgroundImg: data?.background_image,
    };
  }

  function getSpecificallyServices(data) {
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

  function getWebServices(data) {
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

  function getImpactServices(data) {
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

  function getOurApproaches(data) {
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

  const getDevelopmentProcess = (data) => {
    const developmentProcessTabContent = {};
    data?.items.forEach((el) => {
      developmentProcessTabContent[el.title] = {
        title: el.heading,
        mainButtonLabel: el.title,
        description: el?.description,
        image: getImageURL(el?.image?.url),
      };
    });
    return {
      id: developmentProcess?.documentId,
      title: data?.title,
      items: developmentProcessTabContent,
    };
  };

  function getWebDevelopmentServices(data) {
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

  function getWhyTrustServices(data) {
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

  function getFaqServices(data) {
    const items = data?.items?.map((el, i) => {
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

  const getWhatNewData = (data) => {
    const whatsNew = data?.items?.map((wn) => ({
      id: wn.documentId,
      image: getImageURL(wn.image.url),
      imageData: {
        height: wn.image.height,
        width: wn.image.width,
        alternativeText: wn.image.alternativeText,
      },
      title: wn.title,
      para: wn.description,
      button: wn.button_label,
      buttonLink: wn.button_link || "#",
      category: wn.tag,
    }));

    return {
      heading: data?.title,
      buttonLabel: data?.button_label,
      buttonLink: data?.button_link,
      items: whatsNew,
    };
  };

  const getHeroSection = (data) => {
    if (!data) return;
    const heroSectionData = {
      title: data.title,
      description: data.description,
      buttonLabel: data.button_label,
      buttonLink: data.button_link || "#",
      image: getImageURL(data.subject_image?.url),
    };
    return heroSectionData;
  };

  // Pass the fetched data to the client component
  return (
    <WebsiteDevelopment
      header={getWebsiteDevelopmentHeader(header)}
      links={getLinks(
        specificallyServices,
        webServices,
        impactServices,
        developmentProcess,
        ourApproaches,
        webDevelopmentServices,
        whyTrustServices,
        faqServices
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
    />
  );
}
