import type { Metadata } from "next";
import "./globals.css";

const baseUrl =
  process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),

  // ✅ KEEP YOUR ORIGINAL STRUCTURE
  title: {
    default: "balady-gov-sa",
    template: "%s | balady-gov-sa",
  },

  description: "balady-gov-sa",

  applicationName: "balady-gov-sa",

  keywords: [
    "travel agency",
    "document management",
    "health certificate",
    "admin dashboard",
  ],

  // ✅ ONLY ADD THIS (don’t replace everything)
  openGraph: {
    title: "إصدار شهادة صحية",
    description: "balady.gov.sa.com",
    url: baseUrl,
    siteName: "balady.gov.sa.com",
    images: [
      {
        url: `${baseUrl}/logo-2.png`,
        width: 512,
        height: 512,
      },
    ],
    locale: "ar_SA",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "إصدار شهادة صحية",
    description: "balady.gov.sa.com",
    images: [`${baseUrl}/logo-2.png`],
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/logo-2.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en" // keep original unless whole app is Arabic
      className="h-full antialiased"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}