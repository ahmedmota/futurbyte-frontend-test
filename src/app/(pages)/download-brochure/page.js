import React from "react";
import Feedback from "../download-brochure/Component/Feedback/Feedback";
import { getMetaFromJSON } from "@/lib/helpers/getMetaFromJSON";
import { getData } from "@/lib/api";
import Script from "next/script";

export async function generateMetadata() {
  const pageName = 'download-brochure'
  const data = await getData(`/seos?filters[slug][$eq]=${pageName}`)
  return getMetaFromJSON(data?.[0], pageName)
}

const page = async () => {
  const pageName = 'download-brochure'

  const data = await getData(`/seos?filters[slug][$eq]=${pageName}`)
  const jsonLd = data?.[0] ? data[0]?.script : ""

  return (
    <>
      <Script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} key="jsonLd" id="schema"/>

      <Feedback />
    </>
  );
};

export default page;
