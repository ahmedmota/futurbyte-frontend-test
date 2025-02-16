"use client";

import { Stepper, Step } from "react-form-stepper";
import styles from "./stepper.module.css";
import Link from "next/link";
import { Container, Card, CardBody, Image, InputGroup } from "react-bootstrap";
import webApplication from "../../../../../../public/web-application.svg";
import mobileApplication from "../../../../../../public/mobile-application.svg";
import dollar from "../../../../../../public/dollar-icon.svg";
import clock from "../../../../../../public/clock-icon.svg";
import calendar from "../../../../../../public/calendar-icon.svg";

const StepperForm = ({ activeColor }) => {
  return (
    <>
      <Stepper
        // steps={[{ label: 'Step 1' }, { label: 'Step 2' }, { label: 'Step 3' }]}
        activeStep={0}
        connectorStyleConfig={{ size: 2, style: "dashed" }}
        stepClassName={[styles.StepButton, styles.stepper_active__ipFiI]}
        styleConfig={{
          activeBgColor: "#250C2D",
          activeTextColor: "#FFFFFF",
          completedBgColor: "#250C2D",
          inactiveBgColor: "#FFFFFF",
          inactiveTextColor: "#656565",
        }}
      >
        <Step label="Children Step 1" />
        <Step label="Children Step 2" />
        <Step label="Children Step 3" />
      </Stepper>
      {/* <div className='p-5' style={{background:'#FCF6FF'}}>
        <div className='row d-flex justify-content-between gap-2'>
            <div className={`col-8 ${styles.dataInput}`} >
            <Stepper 
        // steps={[{ label: 'Step 1' }, { label: 'Step 2' }, { label: 'Step 3' }]} 
                activeStep={0} 
                connectorStyleConfig={{size:2, style:'dashed'}}
                stepClassName={[styles.StepButton, styles.stepper_active__ipFiI]}
                
                styleConfig={{
                    activeBgColor: '#250C2D',
                    activeTextColor: '#FFFFFF',
                    completedBgColor: '#250C2D', 
                    inactiveBgColor: '#FFFFFF', 
                    inactiveTextColor: '#656565'}}
                    
            >
                    <Step label="Children Step 1" />
                    <Step label="Children Step 2" />
                    <Step label="Children Step 3" />
            </Stepper>
    
            <div className='d-flex flex-row justify-content-between m-3'>
                <h2 className={styles.categoryHeading}>Choose Category</h2>
                <div className='d-flex flex-row gap-2'>
                    <Link className={styles.Previous} href={'#'} >
                        {'<'} Previous 
                    </Link>
                    <Link className={styles.Next} href={'#'} >
                        Next {'>'}
                    </Link>
                </div>
            </div>
            <Card className='d-flex flex-row gap-2'>
            <div className={`${styles.card} flex-grow-1`} >
                
                <input type="checkbox" className={`form-check-input ${styles.cardInput}`} ></input>

                <div className={`d-flex justify-content-center align-items-center mb-3 ${styles.cardIcon}`}>
                    <Image className={styles.cardImg} src={webApplication.src} alt="iOS Logo"></Image>
                </div>


                <div className="text-center">
                    <h6 className={`mb-0 ${styles.cardLabel}`} >Website</h6>
                </div> 
            </div>
            <div className={`${styles.card} flex-grow-1`} >
                
                    <input type="checkbox" className={`form-check-input ${styles.cardInput}`} ></input>

                    <div className={`d-flex justify-content-center align-items-center mb-3 ${styles.cardIcon}`}>
                        <Image className={styles.cardImg} src={webApplication.src} alt="iOS Logo"></Image>
                    </div>


                    <div className="text-center">
                        <h6 className={`mb-0 ${styles.cardLabel}`} >Website</h6>
                    </div> 
                </div>
            </Card>
            </div>
            <div className={`col ${styles.estimate}`}>
                <div
                    className="card p-4"
                    style={{
                        maxWidth: "400px",
                        border: "1px solid #656565",
                        borderRadius: "10px",
                        margin: "0 auto",
                    }}
                >
    
                    <h4 className={`mb-4 ${styles.formHeader}`} style={{ fontWeight: "bold", color: "#1A1A1A" }}>
                        Rough Estimate
                    </h4>

            
                    <div className="mb-3">
                        <label className={`form-label ${styles.formLabel}`} style={{ color: "#1A1A1A" }}>
                        Money saved with FuturByte
                        </label>
                        <div className={`input-group ${styles.inputGroup}`}>
                        <span
                            className={`input-group-text  ${styles.inputGroupText}`}
                        >
                            <Image className="bi bi-currency-dollar" src={dollar.src}></Image>
                        </span>
                        <input
                            type="text"
                            className={`form-control border-0 p-0 m-0 ${styles.inputBox}`}
                        disabled
                        value={"1500"}
                        />
                        </div>
                    </div>

                    <div className="mb-3">
                        <label className={`form-label ${styles.formLabel}`} style={{ color: "#1A1A1A" }}>
                            Time saved with FuturByte
                        </label>
                        <div className={`input-group ${styles.inputGroup}`}>
                        <span
                            className={`input-group-text  ${styles.inputGroupText}`}
                        >
                            <Image className="bi bi-currency-dollar" src={clock.src}></Image>
                        </span>
                        <input
                            type="text"
                            className={`form-control border-0 p-0 m-0 ${styles.inputBox}`}
                        disabled
                        value={"10 Hours"}
                        />
                        </div>
                    </div>

                    <div className="mb-3">
                        <label className={`form-label ${styles.formLabel}`} style={{ color: "#1A1A1A" }}>
                            Project Timeline
                        </label>
                        <div className={`input-group ${styles.inputGroup}`}>
                        <span
                            className={`input-group-text  ${styles.inputGroupText}`}
                        >
                            <Image className="bi bi-currency-dollar" src={calendar.src}></Image>
                        </span>
                        <input
                            type="text"
                            className={`form-control border-0 p-0 m-0 ${styles.inputBox}`}
                        disabled
                        value={"4 weeks"}
                        />
                        </div>
                    </div>

        
                </div>
            </div>
        </div>
    
    </div> */}
    </>
  );
};

export default StepperForm;
