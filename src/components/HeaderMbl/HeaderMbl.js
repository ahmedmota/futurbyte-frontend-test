"use client";

import React, { useState } from "react";
import Link from "next/link";
import styles from "./HeaderMbl.module.css";
import plus from "../../../public/plus.png";
import callicon from "../../../public/callicon.png";
import arrowsright from "../../../public/arrowsright.png";
import arrowright from "../../../public/pinkicon.png";
import moblicon from "../../../public/moblicon.png";
import mbliconcros from "../../../public/mbliconcros.png";
import minus from "../../../public/minus.png";
import Image from "next/image";
import headphone from "../../../public/headphone.png";
import arrowslide from "../../../public/arrowslide.png";
import callcalling from "../../../public/callcalling.png";
import { getImageURL } from "@/lib/helpers";
import dynamic from "next/dynamic";
import OriginSelect from "../OriginSelect/OriginSelect";
import { getOriginPath } from "@/lib/helpers/getOriginPath";

const HeaderMbl = ({ data, freeConsultant }) => {
  const origin = typeof window !== "undefined" ? localStorage.getItem("currentOrigin") : "";

  const navbarItems = {};
  data.homepage_navbar_menu_buttons.forEach((item) => {
    navbarItems[item.label] = item.homepage_navbar_menus[0] || {};
  });
  const [activeMenu, setActiveMenu] = useState(null); // State to track the active menu
  const [myDymaicMenu, setMyDymaicMenu] = useState(null); // State to track the active menu

  const handleMenuClick = (id) => {
    // Toggle the active menu when clicking on a menu item
    setActiveMenu((prev) => (prev === id ? null : id));
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openedSubMenu, setOpenedSubMenu] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) setIsVisible(false);
  };

  const toggleServices = (value, second) => {
    setOpenedSubMenu(value);
    if (second) {
      handleMenuClick(second);
      setMyDymaicMenu(null);
    } else {
      setMyDymaicMenu(true);
    }
  };
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
    if (!isVisible) setIsMenuOpen(false);
  };

  const closeMenus = () => {
    setIsMenuOpen(false);
    setIsVisible(false);
  };
  return (
    <>
      <header className={styles.header} key={origin}>
        <div className={styles.container}>
          <div className={styles.logo}>
            <Link href={getOriginPath(origin) ?? "/"}>
              <Image
                src={getImageURL(data.logo.url)}
                alt={data.logo.alternativeText}
                height={data.logo.height}
                width={data.logo.width}
              />
            </Link>
          </div>

          <div className={styles.cta}>
            <div className={styles.phoneIcon}>
              <Image
                onClick={toggleVisibility}
                className="img-fluid"
                src={callicon}
                alt="dropdown"
              />
            </div>
            <div className={styles.phoneIconmbl} onClick={toggleMenu}>
              {isMenuOpen ? (
                <Image
                  className="img-fluid"
                  src={mbliconcros}
                  alt="menu icon"
                />
              ) : (
                <Image className="img-fluid" src={moblicon} alt="menu icon" />
              )}
            </div>
            <Link
              href={
                freeConsultant.button_link
                  ? getOriginPath(origin) + freeConsultant.button_link
                  : "#"
              }
              className={styles.ctaButton}
            >
              {freeConsultant.button_label}
              <Image className="img-fluid" src={arrowsright} alt="dropdown" />
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className={styles.mobileMenu}>
          <ul className={styles.moblShort}>
            {data.homepage_navbar_menu_buttons.map((hn) => {
              const isMenuOpen = openedSubMenu === hn.documentId;
              if (!(hn.label == "Industries" || hn.label == "Company")) {
                return (
                  <li key={hn.id}>
                    <Link onClick={(e) => e.preventDefault()} href={"#"}>
                      <Link
                        onClick={() => setIsMenuOpen(false)}
                        href={
                          hn.link
                            ? getOriginPath(origin) + hn.link
                            : "#"
                        }
                      >
                        {hn.label}
                      </Link>
                      {!!hn.homepage_navbar_menus?.length && (
                        <Image
                          className="img-fluid"
                          src={isMenuOpen ? minus : plus}
                          alt="plus"
                          onClick={() => {
                            toggleServices(
                              isMenuOpen ? hn.documentId : hn.documentId,
                              null
                            );
                          }}
                        />
                      )}
                      {hn.label.toLowerCase() == "industries" && (
                        <Image
                          className="img-fluid"
                          src={isMenuOpen ? minus : plus}
                          alt="plus"
                          onClick={() => {
                            toggleServices(
                              isMenuOpen ? hn.documentId : hn.documentId,
                              null
                            );
                          }}
                        />
                      )}
                      {hn.label.toLowerCase() == "company" && (
                        <Image
                          className="img-fluid"
                          src={isMenuOpen ? minus : plus}
                          alt="plus"
                          onClick={() => {
                            toggleServices(
                              isMenuOpen ? hn.documentId : hn.documentId,
                              null
                            );
                          }}
                        />
                      )}
                    </Link>
                    {isMenuOpen && (
                      <>
                        <ul className={styles.subMenu}>
                          {hn.homepage_navbar_menus[0]?.categories?.map((c) => (
                            <div className={styles["submenu-inner"]} key={c.id}>
                              {c?.items?.length > 0 ? (
                                <li key={c.id}>
                                  <Link
                                    href={
                                      c.slug
                                        ? getOriginPath(origin) +
                                        (!c.slug.startsWith("/") ? "/" + c.slug : c.slug)
                                        : "#"
                                    }
                                    onClick={closeMenus}
                                  >
                                    {c.label}
                                  </Link>
                                  {c?.items?.length > 0 && (
                                    <Image
                                      className="img-fluid"
                                      src={activeMenu == c.id ? minus : plus}
                                      alt="plus"
                                      onClick={() => handleMenuClick(c.id)}
                                    />
                                  )}
                                </li>
                              ) : (
                                <li
                                  key={c.id}
                                  onClick={() => handleMenuClick(c.id)}
                                >
                                  <Link
                                    href={
                                      c.link
                                        ? getOriginPath(origin) + c.link
                                        : "#"
                                    }
                                  >
                                    {c.label}
                                  </Link>
                                </li>
                              )}
                              {c.items?.length > 0 && (
                                <ul
                                  className={`${styles["submenu-menu"]} ${activeMenu === c.id
                                      ? styles["submenu-active"]
                                      : ""
                                    }`}
                                >
                                  {c.items?.map((category, index) => {
                                    let itemSlug = category.slug;
                                    if (itemSlug) {
                                      if (!itemSlug.startsWith("/"))
                                        itemSlug = "/" + itemSlug;
                                    } else {
                                      itemSlug = "#";
                                    }

                                    return (
                                      <li key={index}>
                                        <Link
                                          href={getOriginPath(origin) + itemSlug}
                                          className={styles.title}
                                          onClick={closeMenus}
                                        >
                                          {category.label}
                                        </Link>
                                      </li>
                                    );
                                  })}
                                </ul>
                              )}
                            </div>
                          ))}
                        </ul>
                        {hn.label?.toLowerCase() == "services" && (
                          <Link
                            onClick={closeMenus}
                            className={styles.consitancycustom}
                            href="#"
                          >
                            View All Services
                            <Image
                              className="img-fluid"
                              src={arrowright}
                              alt="plus"
                            />
                          </Link>
                        )}
                      </>
                    )}
                  </li>
                );
              } else {
                return hn.label == "Industries" ? (
                  <li key={hn.id}>
                    <Link href={"#"}>
                      <Link
                        onClick={() => setIsMenuOpen(false)}
                        href={
                          hn.link
                            ? getOriginPath(origin) + hn.link
                            : "#"
                        }
                      >
                        {hn.label}
                      </Link>
                      {hn.label == "Industries" && (
                        <Image
                          className="img-fluid"
                          src={activeMenu === "Industries" ? minus : plus}
                          alt="plus"
                          onClick={() =>
                            toggleServices(
                              isMenuOpen ? null : hn.documentId,
                              "Industries"
                            )
                          }
                        />
                      )}
                    </Link>
                    {activeMenu === "Industries" && (
                      <>
                        <ul className={styles.subMenu}>
                          {hn.label == "Industries" && (
                            <ul
                              className={`${styles["submenu-menu"]} ps-0 ${activeMenu === "Industries" && !myDymaicMenu
                                  ? styles["submenu-active"]
                                  : ""
                                }`}
                            >
                              <div className={styles["submenu-inner"]}>
                                <li>
                                  <Link
                                    href={getOriginPath(origin) + "/industries/automotive/"}
                                    className={styles.title}
                                    onClick={closeMenus}
                                  >
                                    Automotive
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    href={getOriginPath(origin) + "/industries/education"}
                                    className={styles.title}
                                    onClick={closeMenus}
                                  >
                                    Education
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    href={getOriginPath(origin) + "/industries/media-entertainment"}
                                    className={styles.title}
                                    onClick={closeMenus}
                                  >
                                    Media & Entertainment
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    href={getOriginPath(origin) + "/industries/fintech-industry"}
                                    className={styles.title}
                                    onClick={closeMenus}
                                  >
                                    Fintech
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    href={getOriginPath(origin) + "/industries/healthcare"}
                                    className={styles.title}
                                    onClick={closeMenus}
                                  >
                                    Healthcare
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    href={getOriginPath(origin) + "/industries/on-demand"}
                                    className={styles.title}
                                    onClick={closeMenus}
                                  >
                                    On-Demand
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    href={getOriginPath(origin) + "/industries/real-estate"}
                                    className={styles.title}
                                    onClick={closeMenus}
                                  >
                                    Real Estate
                                  </Link>
                                </li>
                              </div>
                            </ul>
                          )}
                        </ul>
                      </>
                    )}
                  </li>
                ) : (
                  <li key={hn.id}>
                    <Link href={"#"}>
                      <Link
                        onClick={() => setIsMenuOpen(false)}
                        href={
                          hn.link
                            ? getOriginPath(origin) + hn.link
                            : "#"
                        }
                      >
                        {hn.label}
                      </Link>
                      {hn.label == "Company" && (
                        <Image
                          className="img-fluid"
                          src={activeMenu == "Company" ? minus : plus}
                          alt="plus"
                          onClick={() =>
                            toggleServices(
                              isMenuOpen ? null : hn.documentId,
                              "Company"
                            )
                          }
                        />
                      )}
                    </Link>
                    {activeMenu == "Company" && (
                      <>
                        <ul className={styles.subMenu}>
                          {hn.label == "Company" && (
                            <ul
                              className={`${styles["submenu-menu"]} ps-0 ${activeMenu === "Company" && !myDymaicMenu
                                  ? styles["submenu-active"]
                                  : ""
                                }`}
                            >
                              <div className={styles["submenu-inner"]}>
                                <li>
                                  <Link
                                    href={getOriginPath(origin) + "/why-us"}
                                    className={styles.title}
                                    onClick={closeMenus}
                                  >
                                    Why Us
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    href={getOriginPath(origin) + "/about-us"}
                                    className={styles.title}
                                    onClick={closeMenus}
                                  >
                                    About Us
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    href={getOriginPath(origin) + "/contact-us"}
                                    className={styles.title}
                                    onClick={closeMenus}
                                  >
                                    Contact Us
                                  </Link>
                                </li>
                              </div>
                            </ul>
                          )}
                        </ul>
                      </>
                    )}
                  </li>
                );
              }
            })}
          </ul>
          {/* <OriginSelect /> */}
          <Link className={styles.consitancy} href="#">
            Schedule Free Consultancy
            <Image className="img-fluid" src={arrowright} alt="plus" />
          </Link>
        </div>
      )}

      {isVisible && (
        <div className={styles.salesAdvisorSection}>
          <h3>{freeConsultant.button_label}</h3>
          <p>{freeConsultant.description}</p>
          <div className={styles.contactDetails}>
            {freeConsultant.contacts &&
              freeConsultant.contacts.map((c) => (
                <a
                  href={`tel:${c.number ? c.number : "0000"}`}
                  key={c.id}
                  className={styles.contactItem}
                >
                  <Image
                    src={callcalling}
                    alt="callcalling"
                    className="img-fluid"
                  />
                  <div>
                    <span>{c.type}</span>
                    <p>{c.number}</p>
                  </div>
                </a>
              ))}
          </div>
          <button
            className={styles.requestCallback}
            href={freeConsultant.button_two_link || "#"}
          >
            <Image src={headphone} alt="headphone" className="img-fluid" />
            <h4 className={styles.backcall}>
              {freeConsultant.button_two_label}
            </h4>
            <div className={styles.typicallyTop}>
              <p className={styles.typically}>
                {freeConsultant.button_two_description}
              </p>
              <Image src={arrowslide} alt="headphone" className="img-fluid" />
            </div>
          </button>
        </div>
      )}
    </>
  );
};

export default HeaderMbl;
