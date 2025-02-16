"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./Header.module.css";
import dropdown from "../../../public/dropdown.png";
import callicon from "../../../public/callicon.png";
import arrowsright from "../../../public/arrowsright.png";
import arrowright from "../../../public/arrowright.png";
import headphone from "../../../public/headphone.png";
import arrowslide from "../../../public/arrowslide.png";
import callcalling from "../../../public/callcalling.png";
import Image from "next/image";
import { useState } from "react";
import { getImageURL } from "@/lib/helpers";
import CustomNavListItem from "../CustomNavListItem/page";
import OriginSelect from "../OriginSelect/OriginSelect";
import { ORIGINS } from "@/lib/constants";
import { getOriginPath } from "@/lib/helpers/getOriginPath";

const Header = ({ data, freeConsultant }) => {
  const origin = typeof window !== "undefined" ? localStorage.getItem("currentOrigin") : "";
  const navbarItems = {};
  data.homepage_navbar_menu_buttons.forEach((item) => {
    navbarItems[item.label] = item.homepage_navbar_menus[0] || {};
  });
  const [hovered, setHovered] = useState("");
  const [hoveredOther, setHoveredOther] = useState(true);

  function closeMenu() {
    setHovered("");
  }

  function closeOtherMenu() {
    setHoveredOther(false);
  }

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
    setHovered("");
  };

  // Create a ref for the sales advisor section
  const salesAdvisorRef = useRef(null);

  // Close the sales advisor section when clicking outside of it
  useEffect(() => {
    // Function to handle clicks outside the div
    const handleClickOutside = (event) => {
      if (
        salesAdvisorRef.current &&
        !salesAdvisorRef.current.contains(event.target)
      ) {
        setIsVisible(false); // Hide the sales advisor section
      }
    };

    // Add event listener for click
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener when the component is unmounted
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.logo}>
            <Link href={getOriginPath(origin) || "/"}>
              <Image
                src={getImageURL(data.logo.url)}
                alt={data.logo.alternativeText}
                height={data.logo.height}
                width={data.logo.width}
              />
            </Link>
          </div>

          <nav className={styles.nav}>
            <ul className={styles.navList} key={origin}>
              {data.homepage_navbar_menu_buttons.map((item) => {
                const itemSlug = item.link ? getOriginPath(origin) + item.link : "";
                return (
                  <li
                    key={item.id}
                    className={`${styles.navItem} ${styles.servicesItem}`}
                  >
                    {item.homepage_navbar_menus?.length ? (
                      <Link
                        onMouseOver={() => {
                          setHovered(item.label);
                          setIsVisible(false);
                        }}
                        onMouseOut={() => setHovered("")}
                        onClick={() => {
                          setHovered("")
                        }}
                        className={styles.service}
                        href={itemSlug}
                      >
                        {item.label}
                        <Image
                          className="img-fluid"
                          src={dropdown}
                          alt="dropdown"
                        />
                      </Link>
                    ) : (
                      <>
                        {item.label.toLowerCase() == "industries" && (
                          <CustomNavListItem
                            key={item.id}
                            link={itemSlug}
                            label={item.label}
                            items={[
                              {
                                label: "Automotive",
                                link: "/industries/automotive/",
                              },
                              {
                                label: "Education",
                                link: "/industries/education/",
                              },
                              {
                                label: "Media & Entertainment",
                                link: "/industries/media-entertainment/",
                              },
                              {
                                label: "Fintech",
                                link: "/industries/fintech-industry/",
                              },
                              {
                                label: "Healthcare",
                                link: "/industries/healthcare/",
                              },
                              {
                                label: "On-Demand",
                                link: "/industries/on-demand/",
                              },
                              {
                                label: "Real Estate",
                                link: "/industries/real-estate/",
                              },
                            ]}
                          />
                        )}
                        {item.label.toLowerCase() == "company" && (
                          <CustomNavListItem
                            key={item.id}
                            link={itemSlug}
                            label={item.label}
                            items={[
                              {
                                label: "Why Us",
                                link: getOriginPath(origin) + "/why-us/",
                              },
                              {
                                label: "About Us",
                                link: getOriginPath(origin) + "/about-us/",
                              },
                              {
                                label: "Contact Us",
                                link: getOriginPath(origin) + "/contact-us/",
                              },
                            ]}
                          />
                        )}
                        {!(
                          item.label.toLowerCase() == "industries" ||
                          item.label.toLowerCase() == "company"
                        ) && (
                            <CustomNavListItem
                              key={item.id}
                              link={itemSlug}
                              label={item.label}
                            />
                          )}
                      </>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className={styles.cta}>
            <div className={styles.phoneIcon}>
              <Image
                className="img-fluid"
                onClick={toggleVisibility}
                src={callicon}
                alt="dropdown"
              />
            </div>
            <Link
              href={freeConsultant.button_link ? getOriginPath(origin) + freeConsultant.button_link : "#"}
              className={styles.ctaButton}
            >
              {freeConsultant.button_label}
              <Image className="img-fluid" src={arrowsright} alt="dropdown" />
            </Link>
          </div>
          {/* <OriginSelect /> */}
        </div>
      </header>
      {navbarItems[hovered] && navbarItems[hovered]?.categories?.length > 0 && (
        <div
          onMouseOver={() => setHovered(hovered)}
          onMouseOut={() => setHovered("")}
          className={styles.dropdown}
        >
          <div className={styles.dropdownContent}>
            <div className={styles.scale}>
              <h3>{navbarItems[hovered].heading}</h3>
              <Link
                onClick={closeMenu}
                className={styles.allServices}
                href={navbarItems[hovered].button_link || "#"}
              >
                {navbarItems[hovered].button_label}
                <Image className="img-fluid" src={arrowright} alt="dropdown" />
              </Link>
            </div>
            <div className={`${styles.column} ${styles.serviceList} w-100`}>
              {navbarItems[hovered].categories.map((category, index) => {
                let itemSlug = category.slug;
                if (itemSlug) {
                  if (!itemSlug.startsWith("/")) itemSlug = "/" + itemSlug;
                } else {
                  itemSlug = "#";
                }

                return (
                  <div key={index}>
                    <h4 className={styles.title}>
                      <Link onClick={closeMenu} href={getOriginPath(origin) + itemSlug} className={styles.title}>
                        {category.label}
                      </Link>
                    </h4>
                    <ul className={styles.list}>
                      {category.items.map((item, idx) => {
                        let itemSlug = item.slug;
                        if (itemSlug) {
                          if (!itemSlug.startsWith("/"))
                            itemSlug = "/" + itemSlug;
                        } else {
                          itemSlug = "#";
                        }

                        return (
                          <li onClick={closeMenu} key={idx}>
                            <Link href={getOriginPath(origin) + itemSlug}>{item.label}</Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
              {/* </div> */}
              {/* <div>
                {mobileAppDevelopment.map((category, index) => (
                  <div key={index}>
                    <h4 className={styles.title}>{category.title}</h4>
                    <ul className={styles.list}>
                      {category.items.map((item, idx) => (
                        <li key={idx}>
                          <Link href={item.link}>{item.name}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div> */}
            </div>
            {/* <div className={`${styles.column} ${styles.serviceListNav}`}>
              <div>
                {devOps.map((category, index) => (
                  <div key={index}>
                    <h4 className={styles.title}>{category.title}</h4>
                    <ul className={styles.list}>
                      {category.items.map((item, idx) => (
                        <li key={idx}>
                          <Link href={item.link}>{item.name}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div>
                {ecommerce.map((category, index) => (
                  <div key={index}>
                    <h4 className={styles.title}>{category.title}</h4>
                    <ul className={styles.list}>
                      {category.items.map((item, idx) => (
                        <li key={idx}>
                          <Link href={item.link}>{item.name}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            <div className={`${styles.column} ${styles.serviceListPost}`}>
              <div>
                {solutions.map((category, index) => (
                  <div key={index}>
                    <h4 className={styles.title}>{category.title}</h4>
                    <ul className={styles.list}>
                      {category.items.map((item, idx) => (
                        <li key={idx}>
                          <Link href={item.link}>{item.name}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div>
                {cloud.map((category, index) => (
                  <div key={index}>
                    <h4 className={styles.title}>{category.title}</h4>
                    <ul className={styles.list}>
                      {category.items.map((item, idx) => (
                        <li key={idx}>
                          <Link href={item.link}>{item.name}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            <div className={`${styles.column} ${styles.serviceListTitle}`}>
              <div>
                {technologies.map((category, index) => (
                  <div key={index}>
                    <h4 className={styles.title}>{category.title}</h4>
                    <ul className={styles.list}>
                      {category.items.map((item, idx) => (
                        <li key={idx}>
                          <Link href={item.link}>{item.name}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            <div className={`${styles.column} ${styles.serviceListCategory}`}>
              <div>
                {seo.map((category, index) => (
                  <div key={index}>
                    <h4 className={styles.title}>{category.title}</h4>
                    <ul className={styles.list}>
                      {category.items.map((item, idx) => (
                        <li key={idx}>
                          <Link href={item.link}>{item.name}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div> */}
          </div>
        </div>
      )}

      {isVisible && (
        <div ref={salesAdvisorRef} className={styles.salesAdvisorSection}>
          <h3>{freeConsultant.button_label}</h3>
          <p>{freeConsultant.description}</p>
          <div className={styles.contactDetails}>
            {freeConsultant.contacts &&
              freeConsultant.contacts.map((c) => (
                <Link
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
                </Link>
              ))}
          </div>
          <Link
            className={styles.requestCallback}
            href={getOriginPath(origin) + freeConsultant.button_two_link || "#"}
          >
            <Image src={headphone} alt="headphone" className="img-fluid" />
            <h4 className={styles.backcall}>
              {" "}
              {freeConsultant.button_two_label}
            </h4>
            <p className={styles.typically}>
              {freeConsultant.button_two_description}
            </p>
            <Image src={arrowslide} alt="headphone" className="img-fluid" />
          </Link>
        </div>
      )}
    </>
  );
};

export default Header;
