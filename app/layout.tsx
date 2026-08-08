import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://luton-lubricants-syria.sites.app"),
  title: "LUTON Lubricants | الوكيل الحصري في سوريا",
  description: "زيوت محركات LUTON بمعايير عالمية — الوكيل الحصري في سوريا.",
  openGraph: {
    title: "LUTON Lubricants | سوريا",
    description: "زيوت محركات بمعايير عالمية. الوكيل الحصري في سوريا.",
    images: [{ url: "/og.png", width: 1728, height: 910, alt: "LUTON Lubricants Syria" }],
  },
  twitter: { card: "summary_large_image", title: "LUTON Lubricants | سوريا", images: ["/og.png"] },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ar" dir="rtl"><body>{children}</body></html>;
}
