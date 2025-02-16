import { Col, Container, Row } from "react-bootstrap";
import CustomStepper from "./component/custom-stepper/CustomStepper";
import CalculatingCost from "./component/calculating-cost/CalculatingCost";
import CostInformation from "./cost-information/CostInformation";
import Growth from "./component/growth/Growth";
import styles from "./style.module.css";
import { getOriginData} from "@/lib/api";
import HeroSection from "@/components/HeroSection/HeroSection";
import { getMetaFromJSON } from "@/lib/helpers/getMetaFromJSON";
import Script from "next/script";
import { ORIGINS } from "@/lib/constants";


export async function generateMetadata() {
  const pageName = "cost-calculator-for-website-and-mobile-application-development";
  const data = await getOriginData(ORIGINS.CA,`/seos?filters[slug][$eq]=${pageName}`);
  return getMetaFromJSON(data?.[0], pageName, ORIGINS.CA);
}


export default async function Calculator() {
  const pageName = "cost-calculator-for-website-and-mobile-application-development";

  const data = await getOriginData(ORIGINS.CA,`/seos?filters[slug][$eq]=${pageName}`)
  const jsonLd = data?.[0] ? data[0]?.script : ""

  const costCalculatorData = await getOriginData(ORIGINS.CA,
    "/cost-calculator-steps?populate=step_choices.icon"
  );
  const getInstantCostCalculator = await getOriginData(ORIGINS.CA,
    "/cost-calculator-get-instant-cost-calculation"
  );
  const getBenefitsCalculator = await getOriginData(ORIGINS.CA,
    "/cost-calcultor-the-benefit?populate=background_image&populate=items.icon"
  );
  const getInstantAccurateCost = await getOriginData(ORIGINS.CA,
    "/cost-calculator-get-instant-accurate-cost?populate=*"
  );
  const costCalculatorCalculatingApp = await getOriginData(ORIGINS.CA,
    "/cost-calcultor-calculating-app?populate=*"
  );

  const sortCostCalculatorData = (data) => {
    const sortedData = data?.sort(
      (a, b) => parseInt(a.step_number) - parseInt(b.step_number)
    );

    const addSelectProp = sortedData.map((el) => {
      return {
        ...el,
        step_choices: el?.step_choices?.map((ke) => {
          return {
            ...ke,
            isSelected: false,
          };
        }),
      };
    });

    return addSelectProp;
  };

  return (
    <>
      <Script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} key="jsonLd" id="schema"/>

      <div>
        {costCalculatorData && (
          <div className={styles["calculator-section-one"]}>
            <Container className={styles["calculator-section-one-container"]}>
              <CustomStepper data={sortCostCalculatorData(costCalculatorData)} />
            </Container>
          </div>
        )}
        {getInstantCostCalculator && (
          <div className={styles["calculator-section-two"]}>
            <Container className={styles["calculator-section-two-container"]}>
              <CostInformation
                title={getInstantCostCalculator.title}
                description={getInstantCostCalculator.description}
              />
            </Container>
          </div>
        )}
        {getBenefitsCalculator && (
          <div className={`${styles["caculator-section-three"]}`}>
            <Container className={styles["calculator-section-three-container"]}>
              {
                <Row>
                  <Col md={4}>
                    {
                      <div className={`${styles["growth-first-inner"]}`}>
                        {getBenefitsCalculator.title && (
                          <h1 className={styles["growth-first"]}>
                            {getBenefitsCalculator.title}
                          </h1>
                        )}
                        {getBenefitsCalculator.description && (
                          <p>{getBenefitsCalculator.description}</p>
                        )}
                      </div>
                    }
                  </Col>
                  <Col md={8}>
                    <Row>
                      {getBenefitsCalculator.items &&
                        getBenefitsCalculator.items.map((el, i) => {
                          return (
                            <Growth
                              title={el?.title}
                              description={el?.description}
                              imgSrc={el?.icon?.url}
                              addSpace={i === 0 || i === 1 ? true : false}
                              key={i}
                            />
                          );
                        })}
                    </Row>
                  </Col>
                </Row>
              }
            </Container>
          </div>
        )}
        {costCalculatorCalculatingApp && (
          <div className={styles["calculator-section-four"]}>
            <Container className={styles["calculator-section-four-container"]}>
              <CalculatingCost data={costCalculatorCalculatingApp} />
            </Container>
          </div>
        )}
        {getInstantAccurateCost && (
          <div className={styles["calculator-section-five"]}>
            <HeroSection
              title={getInstantAccurateCost.title}
              description={getInstantAccurateCost.description}
              buttonText={getInstantAccurateCost.button_label}
              buttonLink={getInstantAccurateCost.button_link || "#"}
              imgSrc={getInstantAccurateCost.subject_image}
            />
          </div>
        )}
      </div>
    </>
  );
}
