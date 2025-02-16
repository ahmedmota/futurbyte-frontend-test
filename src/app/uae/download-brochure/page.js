import React from "react";
import Feedback from "../download-brochure/Component/Feedback/Feedback";
import { getMetaFromJSON } from "@/lib/helpers/getMetaFromJSON";
import { getOriginData} from "@/lib/api";
import Script from "next/script";
import { ORIGINS } from "@/lib/constants";

export async function generateMetadata() {
  const pageName = 'download-brochure'
  const data = await getOriginData(ORIGINS.UAE,`/seos?filters[slug][$eq]=${pageName}`)
  return getMetaFromJSON(data?.[0], pageName, ORIGINS.UAE)
}

const page = async () => {
  const pageName = 'download-brochure'

  const data = await getOriginData(ORIGINS.UAE,`/seos?filters[slug][$eq]=${pageName}`)
  const jsonLd = data?.[0] ? data[0]?.script : ""

  return (
    <>
      <Script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} key="jsonLd" id="schema"/>

      <Feedback />
    </>
  );
};

export default page;
