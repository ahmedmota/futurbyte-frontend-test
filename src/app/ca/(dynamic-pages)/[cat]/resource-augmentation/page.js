import { Col, Container, Row } from "react-bootstrap";
import RequirementSection from "./Components/Requirement/Requirement";
import Top from "./Components/Top/Top";
import AugmentationCard from "./Components/AugmentationCard/AugmentationCard";
import AugmentationFlexibility from "./Components/AugmentationFlexibility/AugmentationFlexibility";
import styles from "./style.module.css";
import FAQSection from "./Components/Faqs/Faqs";
import { getOriginData} from "@/lib/api";
import { ORIGINS } from "@/lib/constants";

export default async function Augmentation() {
  const getHeaderApi = await getOriginData(ORIGINS.CA,
    `/resource-augmentation-header?populate=*`
  );
  const getSaveTheTime = await getOriginData(ORIGINS.CA,
    `/resource-augmentation-save-the-time?populate=items.icon`
  );
  const getHowItWorks = await getOriginData(ORIGINS.CA,
    `/resource-augmentation-how-it-work?populate=resource_augmentation_how_it_works_items.image`
  );
  const getResourceAugmentation = await getOriginData(ORIGINS.CA,
    `/resource-augmentation-resource-augmentation?populate=image&populate=resource_augmentation_resource_augmentation_items.icon`
  );
  const getFaqs = await getOriginData(ORIGINS.CA,`/resource-augmentation-fa-q?populate=*`);

  let header = null;
  if (getHeaderApi) {
    header = {
      title: getHeaderApi.heading,
      description: getHeaderApi.description,
      buttonLabel: getHeaderApi.button_label,
      buttonLink: getHeaderApi.button_link,
      bannerImg: getHeaderApi.background_image?.url,
    };
  }

  let saveTheTime = null;
  if (getSaveTheTime) {
    saveTheTime = {
      title: getSaveTheTime.heading,
      description: getSaveTheTime.description,
    };

    const items = getSaveTheTime.items.map((el) => {
      return {
        title: el.title,
        description: el.description,
        icon: el.icon?.url,
      };
    });

    saveTheTime.items = items;
  }

  let howItWorks = null;
  if (getHowItWorks) {
    howItWorks = {
      title: getHowItWorks.title,
      description: getHowItWorks.description,
      buttonLabel: getHowItWorks.button_label,
      buttonLink: getHowItWorks.button_link,
    };

    const items = getHowItWorks.resource_augmentation_how_it_works_items.map(
      (el) => {
        return {
          number: el.number,
          title: el.title,
          description: el.description,
          image: el.image.url,
        };
      }
    );

    howItWorks.items = items;
  }

  let resourceAugmentation = null;
  if (getResourceAugmentation) {
    resourceAugmentation = {
      title: getResourceAugmentation.title,
      description: getResourceAugmentation.description,
      image: getResourceAugmentation.image?.url,
    };

    const items =
      getResourceAugmentation.resource_augmentation_resource_augmentation_items?.map(
        (el) => {
          return {
            title: el.title,
            description: el.description,
            icon: el.icon?.url,
          };
        }
      );

    resourceAugmentation.items = items;
  }

  let faqs = null;
  if (getFaqs) {
    faqs = {
      title: getFaqs.heading,
    };

    const items = getFaqs.items?.map((el, i) => {
      return {
        question: el.question,
        answer: el.answer,
      };
    });

    faqs.items = items;
  }

  return (
    // <div className="overflow-hidden">
    <div>
      <div className={`pt-5 ${styles["augmentation-section-1"]}`}>
        <Container className={styles["a-s-1-container"]}>
          {header && (
            <Top
              bannerImg={header.bannerImg}
              title={header.title}
              descriptoin={header.description}
              buttonLabel={header.buttonLabel}
              buttonLink={header.buttonLink}
            />
          )}
        </Container>
      </div>
      <div className={`${styles["augmentation-section-2"]}`}>
        <Container>
          {saveTheTime && (
            <AugmentationCard
              title={saveTheTime.title}
              description={saveTheTime.description}
              items={saveTheTime.items}
            />
          )}
        </Container>
      </div>
      <div className={`${styles["augmentation-section-3"]}`}>
        <Container>
          {howItWorks && (
            <RequirementSection
              title={howItWorks.title}
              description={howItWorks.description}
              buttonLabel={howItWorks.buttonLabel}
              buttonLink={howItWorks.buttonLink}
              items={howItWorks.items}
            />
          )}
        </Container>
      </div>
      <div className="py-lg-5 py-3">
        <Container>
          {resourceAugmentation && (
            <AugmentationFlexibility
              title={resourceAugmentation.title}
              description={resourceAugmentation.description}
              imgSrc={resourceAugmentation.image}
              items={resourceAugmentation.items}
            />
          )}
        </Container>
      </div>
      <div className={`${styles["augmentation-section-5"]}`}>
        <Row>
          <Col>
            {faqs && (
              <div className={styles["augmentation-faqs"]}>
                <FAQSection heading={faqs.title} faqData={faqs.items} />
              </div>
            )}
          </Col>
        </Row>
      </div>
    </div>
  );
}
