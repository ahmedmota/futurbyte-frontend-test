import TouchUs from "./Components/TouchUs/TouchUs";
import contacctbg from "../../../../public/contacctbg.png";
import customerbg from "../../../../public/customerbg.png";
import GetFreeForm from "./Components/GetFreeForm/GetFreeForm";
import Banner from "@/components/Banner/Banner";
import { getOriginData} from "@/lib/api";
import { getImageURL } from "@/lib/helpers";
import { getMetaFromJSON } from "@/lib/helpers/getMetaFromJSON";
import Script from "next/script";
import { ORIGINS } from "@/lib/constants";

export async function generateMetadata() {
  const pageName = "contact-us";
  const data = await getOriginData(ORIGINS.CA,`/seos?filters[slug][$eq]=${pageName}`);
  return getMetaFromJSON(data?.[0], pageName, ORIGINS.CA);
}

export default async function Contact() {

  const pageName = "contact-us";

  const data = await getOriginData(ORIGINS.CA,`/seos?filters[slug][$eq]=${pageName}`)
  const jsonLd = data?.[0] ? data[0]?.script : ""

  const [header, getInTouch, reachUs] = await Promise.all([
    getOriginData(ORIGINS.CA,"/contact-us-header?populate=*"),
    getOriginData(ORIGINS.CA,
      "/contact-us-get-in-touch?populate=contact_us_get_in_touch_items.image"
    ),
    getOriginData(ORIGINS.CA,"/contact-us-you-may-also?populate=*"),
  ]);

  const getTouchesData = (data) => {
    const touchData = data.contact_us_get_in_touch_items.map((item) => ({
      title: item.title,
      description: item.description,
      imgSrc: getImageURL(item.image?.url),
      image: item.image,
      telPhone: item.phone_number,
    }));
    return touchData;
  };

  return (
    <>
      <Script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} key="jsonLd" id="schema"/>

      {/* {header && ( *
        <div className="conract">
          <Banner
            bannerimg={header.background_image?.url}
            heading={header.title}
            para={header.description}
            scheduleBtn={header.button_label}
            scheduleBtnLink={header.button_link || "#"}
            propsClass="homeBnner"
          />
        </div>
      )} */}
      <GetFreeForm
        customerbg={customerbg}
        title={`Get Free Consultation!`}
        desc={` Book your free 40-minute consultation with us`}
      />
      {reachUs && getInTouch && (
        <TouchUs
          touches={getTouchesData(getInTouch)}
          contacctbg={
            reachUs.background_image
              ? { src: getImageURL(reachUs.background_image?.url) }
              : contacctbg
          }
          text={reachUs.heading}
          emailText={reachUs.email}
          title={getInTouch.title}
          description={getInTouch.description}
        />
      )}
    </>
  );
}
