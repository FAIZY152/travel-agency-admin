import type { Metadata } from "next";
import "./globals.css";

const baseUrl =
  process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),

  // ✅ Force exact text in preview
  title: "إصدار شهادة صحية",
  description: "balady.gov.sa.com",

  applicationName: "balady-gov-sa.com",

  keywords: [
    "travel agency",
    "document management",
    "health certificate",
    "admin dashboard",
  ],

  // ✅ Open Graph (WhatsApp/Facebook)
  openGraph: {
    title: "إصدار شهادة صحية",
    description: "balady.gov.sa.com",
    url: baseUrl,
    siteName: "balady.gov.sa.com",
    images: [
      {
        url: `${baseUrl}/logo.png`, // from /public
        width: 512,
        height: 512,
        alt: "balady",
      },
    ],
    locale: "ar_SA",
    type: "website",
  },

  // ✅ Twitter fallback
  twitter: {
    card: "summary_large_image",
    title: "إصدار شهادة صحية",
    description: "balady.gov.sa.com",
    images: [`${baseUrl}/logo.svg`],
  },

  // ✅ Favicon (separate from preview)
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className="h-full antialiased"
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}