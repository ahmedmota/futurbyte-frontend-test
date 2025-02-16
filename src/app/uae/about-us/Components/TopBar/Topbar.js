import Image from "next/image";
import styles from "./Topbar.module.css";
import { getImageURL } from "@/lib/helpers";

const TopBar = ({ title, description, imgSrc, ...props }) => {
  // Check if imgSrc has the image formats
  const imageFormats = imgSrc?.formats || {};
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const largeImageUrl = imageFormats?.large?.url || imgSrc?.url; // Default fallback to imgSrc.url if formats.large is not available

  return (
    <div className={styles["top-about-main"]}>
      <div className={styles["t-a-m-body"]}>
        <h1 className={`colorBlack fw700 font64`}>{title}</h1>
        <p className="fw400 font20 colorGray">{description}</p>
      </div>
      {largeImageUrl && (
        <Image
          alt={title}
          src={
            getImageURL(imageFormats?.large?.url) || getImageURL(largeImageUrl)
          } // Fallback to `largeImageUrl` if no specific format
          className={`img-fluid ${styles["t-a-m-img"]}`}
          width={imageFormats?.large?.width || 1000} // Default to 1000px width if no format-specific width
          height={imageFormats?.large?.height || 500} // Default to 500px height if no format-specific height
          srcSet={`
      ${
        imageFormats?.small?.url
          ? getImageURL(imageFormats?.small?.url)
          : getImageURL(largeImageUrl)
      } 500w,
      ${
        imageFormats?.medium?.url
          ? getImageURL(imageFormats?.medium?.url)
          : getImageURL(largeImageUrl)
      } 750w,
      ${
        imageFormats?.large?.url
          ? getImageURL(imageFormats?.large?.url)
          : getImageURL(largeImageUrl)
      } 1000w
    `}
          sizes="
      (max-width: 500px) 500px, 
      (max-width: 750px) 750px, 
      (max-width: 1000px) 1000px, 
      1000px"
        />
      )}
    </div>
  );
};

export default TopBar;
