import React from "react";
import Career from "@/components/Career/Career";
import WorkLifeBalance from "@/components/WorkLifeBalance/WorkLifeBalance";
import StaggedImages from "@/components/StaggedImages/StaggedImages";
import ViewOpenings from "@/components/ViewOpenings/ViewOpenings";
import Banner from "@/components/Banner/Banner";
import { getData } from "@/lib/api";
import { getImageURL } from "@/lib/helpers";
import { getMetaFromJSON } from "@/lib/helpers/getMetaFromJSON";
import Script from "next/script";


export async function generateMetadata() {
  const pageName = 'career'
  const data = await getData(`/seos?filters[slug][$eq]=${pageName}`)
  return getMetaFromJSON(data?.[0], pageName)
}

const page = async () => {

  const pageName = 'career'
  const data = await getData(`/seos?filters[slug][$eq]=${pageName}`)
  const jsonLd = data?.[0] ? data[0]?.script : ""

  const [header, joinTeam, jobs, everyoneDriven, futureByteWorld, joinUs] =
    await Promise.all([
      getData("/career-header?populate=*"),
      getData("/career-join-the-team?populate=*"),
      getData("/career-detail-infos"),
      getData(
        "/career-everyone-is-driven?populate=background_image&populate=items.icon"
      ),
      getData("/career-the-futurbyte-world?populate=*"),
      getData("/career-join-the-futurbyte?populate=*"),
    ]);
  const getJobsData = (data) => {
    const careerPageName = "career";
    return data.map((job) => ({
      id: job.id,
      location: job.country,
      type: job.employee_type,
      title: job.job_title,
      description: job.short_description || "N/A",
      link: careerPageName + "/" + job.slug,
    }));
  };

  const getEveryoneDrivenData = (data) => {
    return data.items?.map((driven) => ({
      title: driven.title,
      description: driven.description,
      icon: getImageURL(driven.icon?.url),
    }));
  };

  return (
    <>
      <Script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} key="jsonLd" id="schema" />

      {header && (
        <div className="careerPage">
          <Banner
            isCareerPage={true}
            bannerimg={header.background_image?.url}
            heading={header.title}
            para={header.description}
            scheduleBtn={header.button_label}
            scheduleBtnLink={header.button_link}
            propsClass="bannerCareer"
          />
        </div>
      )}
      {joinTeam && jobs && (
        <Career
          heading={joinTeam.title}
          description={joinTeam.description}
          jobs={getJobsData(jobs)}
        />
      )}
      {everyoneDriven && (
        <WorkLifeBalance
          desrciption={everyoneDriven.title}
          components={getEveryoneDrivenData(everyoneDriven)}
        />
      )}
      {futureByteWorld && <StaggedImages data={futureByteWorld} />}
      {joinUs && <ViewOpenings data={joinUs} />}
    </>
  );
};

export default page;
