import "../globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import HeaderMbl from "@/components/HeaderMbl/HeaderMbl";
import { getData } from "@/lib/api";
import LiveChat from "@/components/LiveChat/LiveChat";
import { GoogleTagManager } from "@next/third-parties/google";
import GeoLocation from "@/components/GeoLocation/GeoLocation";

export default async function RootLayout({ children }) {
  const [footer, freeConsultant, navbar] = await Promise.all([
    getData(
      "/footer?populate=footer_pages_categories&populate=footer_pages_categories.footer_pages&populate=logo&populate=footer_social_media_icons.icon"
    ),
    getData("/book-a-free-consultation?populate=*"),
    getData(
      "/homepage-navbar?populate=logo&populate=homepage_navbar_menu_buttons&populate=homepage_navbar_menu_buttons.homepage_navbar_menus&populate=homepage_navbar_menu_buttons&populate=homepage_navbar_menu_buttons.homepage_navbar_menus.categories.items"
    ),
  ]);
  return (
    <>
      <GeoLocation />
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GOOGLE_TGM_KEY} />
      {navbar && freeConsultant && (
        <Header data={navbar} freeConsultant={freeConsultant} />
      )}
      {navbar && freeConsultant && (
        <HeaderMbl data={navbar} freeConsultant={freeConsultant} />
      )}
      <main className="main">{children}</main>
      <LiveChat />
      {footer && <Footer data={footer} />}
    </>
  );
}
