import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 + "px" }}>{children}</body>
    </html>
  );
}
