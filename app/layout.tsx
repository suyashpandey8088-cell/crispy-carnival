import type { Metadata } from "next";
import "@fontsource-variable/space-grotesk";
import "@fontsource-variable/syne";
import "@fontsource/anton/400.css";
import "@fontsource/cormorant-garamond/400-italic.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Suyash Pandey® — The Internet Is My Canvas.",
  description:
    "A maximalist digital playground by Suyash Pandey. AI, data science, creative development, and a little controlled chaos.",
  robots: { index: true, follow: true },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
