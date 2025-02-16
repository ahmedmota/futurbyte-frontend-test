import { ORIGINS } from "@/lib/constants";
import React from "react";

const Custom404 = () => {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1 style={{ fontSize: "3rem", color: "#f44336" }}>404 Page Not Found</h1>
      <p style={{ fontSize: "1.2rem" }}>
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <p>
        <a
          href={"/" + ORIGINS.US}
          style={{
            fontSize: "1rem",
            color: "#3f51b5",
            textDecoration: "underline",
          }}
        >
          Go back to the homepage
        </a>
      </p>
    </div>
  );
};

export default Custom404;
