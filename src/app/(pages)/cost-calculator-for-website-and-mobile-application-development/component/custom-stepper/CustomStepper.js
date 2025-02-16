"use client";

import { Image } from "react-bootstrap";
import styles from "./CustomStepper.module.css";
import arrowRight from "../../../../../../public/cost-btn-arrow-left.svg";
import arrowLeft from "../../../../../../public/cost-btn-arrow-right.svg";
import ChooseCard from "../choose-card/ChooseCard";
import CostForm from "../cost-form/CostForm";
import { useState } from "react";
import SubmitEForm from "../submit-e-form/SubmitEForm";

const ChooseSection = ({
  changeStateButtonNext,
  changeStateButtonPrev,
  heading,
  isMultiple,
  enableNext,
  step,
}) => {
  return (
    <div className={styles["choose-section"]}>
      <div className={styles["choose-section-top"]}>
        <div className={styles["choose-section-top-content"]}>
          <h1>{heading}</h1>
          {!isMultiple ? <p>Select only (1)</p> : <p>Multiple selection</p>}
        </div>
        <div className={styles["choose-section-top-content-btns"]}>
          {step !== 0 && (
            <button onClick={changeStateButtonPrev}>
              <Image src={arrowLeft.src} alt="left-arrow" />
              Previous
            </button>
          )}
          <button
            className={`${styles["active-btn"]} ${
              enableNext ? styles["active-btn-next"] : ""
            }`}
            onClick={enableNext ? changeStateButtonNext : null}
          >
            Next
            <Image src={arrowRight.src} alt="right-arrow" />
          </button>
        </div>
      </div>
    </div>
  );
};

const CustomStepper = ({ data, ...restProps }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [anySelected, setAnySelected] = useState(false);
  const [estimatedValue, setEstimatedValue] = useState({
    moneySaved: 0,
    timeSaved: 0,
    projectTime: 0,
    minPrice: 0,
    maxPrice: 0,
  });
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const [selectCategory, setSelectCategory] = useState(null);
  const [showValues, setShowValues] = useState(false);
  const [selections, setSelections] = useState({
    data,
  });
  const [categorySelections, setCategorySelections] = useState({
    data,
  });
  const [constSelections, setConstSelections] = useState({
    data,
  });
  const [stepsChoosenCount, setStepsChoosenCount] = useState(0);

  const chooseFirstCategory = (
    label,
    category,
    value,
    first,
    valueUnselected,
    isMultiple,
    id
  ) => {
    setSelectCategory(value);
    let response = null;
    if (first) {
      response = filterData(data, value);
      setSelections(response);
    } else {
      response = selections;
    }

    filterCategorySelections(
      response,
      label,
      category,
      value,
      valueUnselected,
      isMultiple,
      id
    );
  };

  const filterCategorySelections = (
    myData,
    label,
    category,
    value,
    valueUnselected,
    isMultiple,
    id
  ) => {
    let anySel = false;

    let checkOnData = null;

    if (selectCategory && currentStep != 0) {
      checkOnData = categorySelections;
    } else {
      checkOnData = myData;
    }

    const response = checkOnData?.data?.map((el, i) => {
      let isSelected = false;

      if (el.label == label) {
        if (isMultiple) {
          const selectedCount = checkOnData?.data?.filter(
            (le) => el.label == label && le?.isSelected === true
          ).length;

          if (valueUnselected) {
            isSelected = true;
          } else {
            if (selectedCount == 1) {
              isSelected = false;
            } else {
              isSelected = true;
            }
          }
        } else {
          if (valueUnselected) {
            isSelected = true;
          } else {
            isSelected = false;
          }
        }
      } else {
        const selectedCount = checkOnData?.data?.filter(
          (le) => el.label == label && le?.isSelected === true
        ).length;

        if (el?.isSelected != null) {
          isSelected = el?.isSelected;
        } else {
          isSelected = false;
        }
      }

      return {
        ...el,
        label: el.label,
        isSelected: isSelected,
        step_choices: el.step_choices.map((choice, j) => {
          // if (choice.category == category && choice.label == value) {
          if (choice.documentId == id) {
            if (isMultiple) {
              const selectedCount = checkOnData?.data?.filter(
                (le) => le?.isSelected === true
              ).length;

              if (choice?.isSelected) {
                if (selectedCount === 1) {
                  // anySel = false;
                } else {
                  // anySel = true;
                }

                return {
                  ...choice,
                  isSelected: false,
                };
              } else {
                // anySel = true;
                return {
                  ...choice,
                  isSelected: true,
                };
              }
            } else {
              if (choice?.isSelected) {
                // anySel = false;
                return {
                  ...choice,
                  isSelected: false,
                };
              } else {
                // anySel = true;
                return {
                  ...choice,
                  isSelected: true,
                };
              }
            }
          } else {
            if (el.label == label) {
              if (isMultiple) {
                const selectedCount = checkOnData?.data?.filter(
                  (le) => el.label == label && le?.isSelected === true
                ).length;

                if (valueUnselected) {
                  // anySel = true;
                } else {
                  if (selectedCount == 1) {
                    // anySel = false;
                  } else {
                    // anySel = true;
                  }
                }

                return choice;
              } else {
                return {
                  ...choice,
                  isSelected: false,
                };
              }
            } else {
              return choice;
            }
          }
        }),
      };
    });

    response?.forEach((p, u) => {
      if (p.label == label) {
        p?.step_choices.forEach((j) => {
          if (j.isSelected) {
            anySel = true;
          }
        });
      }
    });

    setAnySelected(anySel);
    setCategorySelections({
      ...checkOnData,
      data: response,
    });
  };

  const filterData = (myData, value) => {
    return {
      ...myData.data,
      data: myData.map((item, index) => {
        if (index === 0) {
          return item;
        }

        return {
          ...item,
          step_choices: item.step_choices.filter((choice) => {
            if (choice.category == value) {
              return choice;
            } else {
              return null;
            }
          }),
        };
      }),
    };
  };

  const handleNext = (section) => {
    if (currentStep < selections.data.length - 1) {
      setCurrentStep(currentStep + 1);
    }

    if (currentStep == selections.data.length - 1) {
      openModal();
    }

    if (
      currentStep < categorySelections.data.length - 1 &&
      categorySelections?.data?.[currentStep + 1].isSelected
    ) {
      setAnySelected(true);
    } else {
      setAnySelected(false);
    }

    checkToShow();
  };

  const checkToShow = () => {
    let allCount = 0;

    categorySelections.data.forEach((el) => {
      const hasSelected = el.step_choices.some((pe) => pe.isSelected === true);

      if (hasSelected) {
        allCount++; // Add only once per category if at least one isSelected is true
      }
    });

    const estimate = {
      moneySaved: 0,
      timeSaved: 0,
      projectTime: 0,
      minPrice: 0,
      maxPrice: 0,
    };

    // categorySelections.data.forEach((el) => {
    //   el.step_choices.forEach((pe) => {
    //     if (pe.isSelected) {
    //       estimate.moneySaved += +(pe.money_saved_column_value ?? 0);
    //       estimate.timeSaved += +(pe.time_saved_column_value_in_days ?? 0);
    //       estimate.projectTime += +(+(
    //         pe.project_timeline_column_value_in_days ?? 0
    //       ));
    //       estimate.minPrice += +(pe.minimum_price_column_value ?? 0);
    //       estimate.maxPrice += +(pe.maximum_price_column_value ?? 0);
    //     }
    //   });
    // });

    categorySelections.data.forEach((el) => {
      el.step_choices.forEach((pe) => {
        if (pe.isSelected) {
          estimate.moneySaved +=
            isNaN(+pe?.money_saved_column_value) ||
            pe?.money_saved_column_value == null
              ? 0
              : +pe.money_saved_column_value;

          estimate.timeSaved +=
            isNaN(+pe?.time_saved_column_value_in_days) ||
            pe?.time_saved_column_value_in_days == null
              ? 0
              : +pe.time_saved_column_value_in_days;

          estimate.projectTime +=
            isNaN(+pe?.project_timeline_column_value_in_days) ||
            pe?.project_timeline_column_value_in_days == null
              ? 0
              : +pe.project_timeline_column_value_in_days;

          estimate.minPrice +=
            isNaN(+pe?.minimum_price_column_value) ||
            pe?.minimum_price_column_value == null
              ? 0
              : +pe.minimum_price_column_value;

          estimate.maxPrice +=
            isNaN(+pe?.maximum_price_column_value) ||
            pe?.maximum_price_column_value == null
              ? 0
              : +pe.maximum_price_column_value;
        }
      });
    });

    // Apply division only at the end
    estimate.timeSaved = Math.round((estimate.timeSaved * 5) % 12);
    estimate.projectTime = estimate.projectTime;

    setEstimatedValue(estimate);

    setStepsChoosenCount(allCount);
  };

  const handlePrevious = (section) => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }

    if (categorySelections?.data?.[currentStep - 1].isSelected) {
      setAnySelected(true);
    } else {
      setAnySelected(false);
    }

    if (showValues) {
      setShowValues(false);
    }
  };

  const handleSelectionChange = (section, newSelections) => {};

  return (
    <>
      <div>
        <div className={styles["steps-count-main-row"]}>
          <div className={styles["steps-count-main-col"]}>
            <div className={`${styles["steps-count-main"]} d-none d-md-block`}>
              <div className={styles["steps-count"]}>
                {selections?.data.map((item, index) => (
                  <div
                    key={item.id}
                    className={`${styles["step-item"]} ${
                      currentStep === index ? styles["step-item-active"] : ""
                    }`}
                  >
                    <div
                      className={`${styles["step"]} ${
                        currentStep === index ? styles["active"] : ""
                      } ${index === 0 ? styles["first-step"] : ""} ${
                        index === selections.data?.length - 1
                          ? styles["last-step"]
                          : ""
                      }`}
                    >
                      {`${item.step_number}`}
                    </div>
                    <p>{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className={`${styles["steps-count-main"]} d-block d-md-none`}>
              <div className={styles["steps-count"]}>
                {selections.data.map((item, index) => {
                  if (index < 5) {
                    return (
                      <div
                        key={item.id}
                        className={`${styles["step-item"]} ${
                          currentStep === index
                            ? styles["step-item-active"]
                            : ""
                        }`}
                      >
                        <div
                          className={`${styles["step"]} ${
                            currentStep === index ? styles["active"] : ""
                          } ${index === 0 ? styles["first-step"] : ""} ${
                            index === selections.data.length - 1
                              ? styles["last-step"]
                              : ""
                          }`}
                        >
                          {`${item.step_number}`}
                        </div>
                        <p>{item.label}</p>
                      </div>
                    );
                  } else if (index === 5) {
                    return (
                      <div
                        key={item.id}
                        className={`${styles["step-item"]} ${
                          currentStep >= 5 ? styles["step-item-active"] : ""
                        }`}
                      >
                        <div
                          className={`${styles["step"]} ${
                            currentStep >= 5 ? styles["active"] : ""
                          } ${index === 0 ? styles["first-step"] : ""} ${
                            index === selections.data.length - 1
                              ? styles["last-step"]
                              : ""
                          }`}
                        >
                          {`...`}
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
            <div
              className={`d-flex flex-column ${styles["choose-section-main-div"]}`}
            >
              {selections?.data?.map((el, i) => {
                if (currentStep == i) {
                  return (
                    <ChooseSection
                      changeStateButtonNext={() => handleNext(i)}
                      changeStateButtonPrev={() => handlePrevious(i)}
                      heading={el.heading}
                      isMultiple={el.select_multiple}
                      enableNext={anySelected}
                      key={i}
                      step={currentStep}
                    />
                  );
                }
              })}

              {selections.data.map((el, i) => {
                if (currentStep == i) {
                  return (
                    <ChooseCard
                      isMultiple={el.select_multiple}
                      section={el.label}
                      selections={el.step_choices}
                      selectSelections={
                        categorySelections
                          ? categorySelections.data?.[i].step_choices
                          : null
                      }
                      onSelectionChange={handleSelectionChange}
                      firstCards={i === 0}
                      key={i}
                      isFirst={i == 0}
                      onSelect={chooseFirstCategory}
                    />
                  );
                }
              })}
            </div>
            <div className={styles["choose-section-top-content-btns-mob"]}>
              {currentStep !== 0 && (
                <button onClick={handlePrevious}>
                  <Image src={arrowLeft.src} alt="left-arrow" />
                  Previous
                </button>
              )}
              <button
                className={`${styles["active-btn"]} ${
                  anySelected ? styles["active-btn-next"] : ""
                }`}
                onClick={handleNext}
              >
                Next
                <Image src={arrowRight.src} alt="right-arrow" />
              </button>
            </div>
          </div>
          <div className={styles["stepper-form-col"]}>
            <CostForm
              show={showValues}
              isOpen={modalOpen}
              onClose={closeModal}
              estimatedValues={estimatedValue}
            />
          </div>
        </div>
      </div>
      <SubmitEForm
        openShowValues={() => setShowValues(!showValues)}
        isOpen={modalOpen}
        onClose={closeModal}
      />
    </>
  );
};

export default CustomStepper;
