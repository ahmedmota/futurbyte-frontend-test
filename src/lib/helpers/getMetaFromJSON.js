import { ORIGINS_HREF_LANG } from "../constants";

export function getMetaFromJSON(seo, pageName, origin = "", appendSlash = true) {
  let followIndex = 'follow, index';
  if (seo?.no_follow_no_index) {
    followIndex = 'nofollow, noindex';
  }

  const baseURL = process.env.NEXT_PUBLIC_FE_ORIGIN

  let canonical = `${baseURL}${origin}/${pageName}`
  if (appendSlash) canonical += "/";

  const hreflang = ORIGINS_HREF_LANG[origin] || "x-default";
  const alternateLanguages = {
    [hreflang]: canonical,
  };

  return seo ? {
    title: seo.meta_title,
    description: seo.meta_description,
    keywords: seo.meta_keywords ? seo.meta_keywords.split(",") : "",
    robots: followIndex,
    alternates: {
      canonical,
      languages: alternateLanguages,
    },
    icons: [{ rel: "icon", url: "/favIcons/favIcon.svg" }],
  } : {
    title: "FuturByte",
    description: "FuturByte",
    robots: followIndex,
    alternates: {
      canonical,
      languages: alternateLanguages,
    },
    icons: [{ rel: "icon", url: "/favIcons/favIcon.svg" }],
  };
}
