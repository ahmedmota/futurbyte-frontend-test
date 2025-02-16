import { getOriginData } from "@/lib/api"; // Custom data-fetching function
import About from "./AboutPage";
import { getMetaFromJSON } from "@/lib/helpers/getMetaFromJSON";
import Script from "next/script";
import { ORIGINS } from "@/lib/constants";

export async function generateMetadata() {
  const pageName = "about-us"
  const data = await getOriginData(ORIGINS.UAE, `/seos?filters[slug][$eq]=${pageName}`)
  return getMetaFromJSON(data?.[0], pageName, ORIGINS.UAE)
}

export default async function AboutPage() {
  const pageName = "about-us"
  const data = await getOriginData(ORIGINS.UAE, `/seos?filters[slug][$eq]=${pageName}`)
  const jsonLd = data?.[0] ? data[0]?.script : ""

  const [header, beginnings, commitments, privileged, getStart, ourTeams] =
    await Promise.all([
      getOriginData(ORIGINS.UAE, "/about-header?populate=*"),
      getOriginData(ORIGINS.UAE, "/about-our-beginnings?populate=*"),
      getOriginData(ORIGINS.UAE, "/about-we-are-recognized?populate=items&populate=items.image"),
      getOriginData(ORIGINS.UAE, "/privileged-to-be?populate=logos.logo"),
      getOriginData(ORIGINS.UAE, "/lets-get-started?populate=*"),
      getOriginData(ORIGINS.UAE, "/about-team?populate=about_team_items.image"),
    ]);

  function getBeginnings(data) {
    return data
      ?.sort((a, b) => parseInt(a.priority) - parseInt(b.priority))
      .map((item) => {
        return {
          title: item.title,
          description: item.description,
          imgSrc: item.image,
          priority: item.priority,
        };
      });
  }

  function getCommitments(data) {
    const items = data?.items?.map((item) => {
      return {
        title: item?.title,
        description: item?.description,
        imgSrc: item?.image,
      };
    });

    return {
      heading: data?.heading,
      items,
    };
  }

  function getOurTeams(data) {
    const items = data?.about_team_items.map((el, i) => {
      return {
        name: el?.name,
        position: el?.position,
        profile: el?.image,
      };
    });

    return {
      title: data?.title,
      items,
    };
  }

  const getPreviligedData = (data) => {
    if (!data?.logos) return data
    let priviligedLogos = data.logos?.map((el) => {
      return {
        anchorLink: el.url,
        noFollow: el.no_follow_no_index ? 'nofollow, noindex' : 'follow, index',
        ...el.logo,
      }
    });
    data.logos = priviligedLogos;
    return data
  }

  // Pass the fetched data to the client component
  return (
    <>
      <Script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} key="jsonLd" id="schema" />
      <About
        header={header}
        beginnings={getBeginnings(beginnings)}
        commitments={getCommitments(commitments)}
        privileged={getPreviligedData(privileged)}
        getStart={getStart}
        ourTeams={getOurTeams(ourTeams)}
      />
    </>
  );
}
