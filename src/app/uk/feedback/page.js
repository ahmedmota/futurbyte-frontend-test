import React from "react";
import Feedback from "./Component/Feedback/Feedback";
import { getMetaFromJSON } from "@/lib/helpers/getMetaFromJSON";
import { getOriginData} from "@/lib/api";
import Script from "next/script";
import { ORIGINS } from "@/lib/constants";

export async function generateMetadata() {
  const pageName = 'feedback'
  const data = await getOriginData(ORIGINS.UK,`/seos?filters[slug][$eq]=${pageName}`)
  return getMetaFromJSON(data?.[0], pageName, ORIGINS.UK)
}

const page = async () => {
  const pageName = 'feedback'

  const data = await getOriginData(ORIGINS.UK,`/seos?filters[slug][$eq]=${pageName}`)
  const jsonLd = data?.[0] ? data[0]?.script : ""

  return (
    <>
      <Script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} key="jsonLd" id="schema"/>

      <Feedback />
    </>
  );
};

export default page;
