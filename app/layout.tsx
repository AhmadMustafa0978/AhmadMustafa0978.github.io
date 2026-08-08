import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://ahmadmustafa0978.github.io"),
  title: "شركة عبيد التجارية | الزيوت المعدنية والفلاتر",
  description: "شركة عبيد التجارية — قسم الزيوت المعدنية والفلاتر، وكيل LUTON Lubricants في حماة - كرناز.",
  openGraph: {
    title: "شركة عبيد التجارية | الزيوت المعدنية والفلاتر",
    description: "وكيل LUTON Lubricants في حماة - كرناز.",
    images: [{ url: "/og.png", width: 1728, height: 910, alt: "شركة عبيد التجارية - وكيل LUTON Lubricants" }],
  },
  twitter: { card: "summary_large_image", title: "شركة عبيد التجارية | زيوت وفلاتر", images: ["/og.png"] },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ar" dir="rtl"><body>{children}</body></html>;
}
