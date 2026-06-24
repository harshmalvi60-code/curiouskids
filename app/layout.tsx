import type { Metadata, Viewport } from "next";
import "./globals.css";
import Starfield from "@/components/Starfield";
import Chrome from "@/components/Chrome";

const title = "Curious Kids Universe — turn screen time into discovery time";
const description =
  "Six magical worlds where kids 5–12 explore space, animals, oceans, dinosaurs, the human body and nature through interactive adventures. No ads. No subscription. Works offline. ₹499 once.";

export const metadata: Metadata = {
  title,
  description,
  applicationName: "Curious Kids Universe",
  manifest: "/manifest.webmanifest",
  keywords: [
    "learning app for kids",
    "science for kids",
    "screen time alternative",
    "educational app India",
    "curious kids",
  ],
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "Curious Kids Universe",
  },
  twitter: { card: "summary_large_image", title, description },
  appleWebApp: { capable: true, title: "Curious Kids Universe", statusBarStyle: "black-translucent" },
};

export const viewport: Viewport = {
  themeColor: "#0A0823",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Starfield />
        <div className="app">{children}</div>
        <Chrome />
      </body>
    </html>
  );
}
