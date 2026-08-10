import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import Script from "next/script";
import ScrollAnimationObserver from "@/components/ScrollAnimationObserver";
import TagManagerClickTracking from "@/components/TagManagerClickTracking";
import siteData from "@/data.json";
import "./globals.css";

const googleAdsId = "AW-17690711801";
const googleTagManagerId = "GTM-MV7QFCQF";

const workSans = Work_Sans({
  variable: "--font-base",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: siteData.meta.siteTitle,
  description: siteData.meta.description,
  icons: {
    icon: [{ url: siteData.meta.iconUrl, type: siteData.meta.iconType }],
    shortcut: [siteData.meta.iconUrl],
    apple: [{ url: siteData.meta.iconUrl, type: siteData.meta.iconType }],
  },
  openGraph: {
    title: siteData.meta.siteTitle,
    description: siteData.meta.description,
    images: [siteData.meta.iconUrl],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={siteData.meta.language} className={`${workSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Script id="google-tag-manager" strategy="beforeInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${googleTagManagerId}');
          `}
        </Script>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${googleTagManagerId}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${googleAdsId}`}
          strategy="afterInteractive"
        />
        <Script id="google-ads-gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${googleAdsId}');
          `}
        </Script>
        <ScrollAnimationObserver />
        <TagManagerClickTracking />
        {children}
      </body>
    </html>
  );
}
