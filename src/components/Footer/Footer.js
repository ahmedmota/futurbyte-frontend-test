"use client";

import React from "react";
import styles from "@/components/Footer/Footer.module.css";
import { Container, Row, Col, Image } from "react-bootstrap";
import Link from "next/link";
import logo from "../../../public/logo.png";
import footerscroolicon from "../../../public/footerscroolicon.svg";
import { getImageURL } from "@/lib/helpers";
import { getOriginPath } from "@/lib/helpers/getOriginPath";

const Footer = ({ data }) => {
  const origin = typeof window !== "undefined" ? localStorage.getItem("currentOrigin") : "";

  return (
    <footer className={`${styles.footer} footer`}>
      <Container>
        <div className={styles.footerTop}>
          <div>
            <Image
              src={data.logo ? getImageURL(data.logo.url) : logo}
              className="img-fluid"
              alt={data.logo?.alternativeText}
              height={data.logo?.height}
              width={data.logo?.width}
            />
          </div>
          <div className="readyDigital">
            <h4 className="text-white fw500 font30 linhight45">
              {data.heading}
            </h4>
          </div>
          <div className={styles.footeImage}>
            <Image
              src={footerscroolicon.src}
              className={`${styles.footerIconImage} img-fluid`}
              alt="scrollIcon"
            />
          </div>
        </div>

        <Row className={styles.footerSpace}>
          {data.footer_pages_categories.map((fp) => {
            return (
              <Col xl={3} md={6} key={fp.id}>
                <h3 className="text-white fw500 font22">{fp.label}</h3>
                <ul className={styles.footerNavLinks} key={origin}>
                  {fp.footer_pages?.map((item) => {
                    return (
                      <li key={item.id} className="text-white fw300 font18">
                        <Link
                          className="text-white textdecoration"
                          href={item.link ? getOriginPath(origin) + item.link : "#"}
                        >
                          {item.label}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </Col>
            );
          })}
          <Col xl={3} md={6} className={styles.skilss}>
            <h3 className="text-white fw500">{`Don't Miss an Update`}</h3>
            <form className={styles.footerForms}>
              <input
                type="email"
                placeholder={data.subscription_form_email_placeholder}
                required
              />
              <button type="submit">
                {data.subscription_form_button_form}
              </button>
              <div className={styles.footerCheckbox}>
                <input type="checkbox" className="form-check-input" />
                <label className="text-white fw400 font13">
                  {data.subscription_form_privacy_policy_agreement}
                </label>
              </div>
            </form>
            <div className={styles.socialIcons}>
              {data.footer_social_media_icons?.map((sm) => {
                return (
                  <Link
                    key={sm.id}
                    className="text-white textdecoration"
                    href={sm.link ? sm.link : "#"}
                  >
                    <Image
                      src={getImageURL(sm?.icon?.url)}
                      width={sm.icon?.width}
                      height={sm.icon?.height}
                      className="img-fluid"
                      alt={sm.icon?.alternativeText}
                    />
                  </Link>
                );
              })}
            </div>
          </Col>
        </Row>
        <Row>
          <div className={styles.footerBottom}>
            <p className="text-white pb-0 mb-0 font18">
              © 2025 - FuturByte Technologies
            </p>
            <p className={`${styles.footerCopy} text-white pb-0 mb-0`}>
              <Link className="text-white textdecoration font18" href="#">
                Privacy Policy
              </Link>
              <span>-</span>
              <Link className="text-white textdecoration font18" href="#">
                Terms & Conditions
              </Link>
            </p>
          </div>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
