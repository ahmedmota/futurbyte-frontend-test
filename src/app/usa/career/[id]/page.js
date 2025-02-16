import React from "react";
import JobDetails from "../Component/JobDetails/JobDetails";
import JoinTeam from "../Component/JoinTeam/JoinTeam";
import { getOriginData} from "@/lib/api";
import { getMetaFromJSON } from "@/lib/helpers/getMetaFromJSON";
import Script from "next/script";
import { ORIGINS } from "@/lib/constants";


export async function generateMetadata({ params }) {
  const pageName = `career/${params.id}`
  const data = await getOriginData(ORIGINS.US,`/seos?filters[slug][$eq]=${pageName}`)
  return getMetaFromJSON(data?.[0], pageName, ORIGINS.US)
}

const CareerDetailPage = async ({ params }) => {
  const slug = params.id

  const pageName = `career/${params.id}`
  const data = await getOriginData(ORIGINS.US,`/seos?filters[slug][$eq]=${pageName}`)
  const jsonLd = data?.[0] ? data[0]?.script : ""

  const careerDetail = await getOriginData(ORIGINS.US,`/career-detail-infos?filters[slug][$eq]=${slug}`)
  return (
    <>
      <Script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} key="jsonLd" id="schema"/>

      {careerDetail?.[0] && <JobDetails data={careerDetail?.[0]} />}
      {careerDetail?.[0] && <JoinTeam data={careerDetail?.[0]} />}
    </>
  );
};

export default CareerDetailPage;
