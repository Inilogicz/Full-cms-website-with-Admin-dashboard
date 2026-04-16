import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});


export const metadata: Metadata = {
  metadataBase: new URL("https://nigersanitary.com"), // Assuming this is the domain, will use relative paths elsewhere
  title: {
    default: "Niger Sanitary Industry Limited | Quality Sanitary Products",
    template: "%s | Niger Sanitary Industry Limited",
  },
  description: "Leading manufacturer of quality sanitary pads, medical consumables, and cotton wool products in Nigeria and West Africa.",
  keywords: ["sanitary pads", "medical consumables", "cotton wool", "Nigeria", "West Africa", "LadySept", "Damson"],
  authors: [{ name: "Niger Sanitary Industry Limited" }],
  creator: "Niger Sanitary Industry Limited",
  publisher: "Niger Sanitary Industry Limited",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "https://nigersanitary.com",
    siteName: "Niger Sanitary Industry Limited",
    title: "Niger Sanitary Industry Limited | Quality Sanitary Products",
    description: "Leading manufacturer of quality sanitary pads, medical consumables, and cotton wool products in Nigeria and West Africa.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Niger Sanitary Industry Limited",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Niger Sanitary Industry Limited | Quality Sanitary Products",
    description: "Leading manufacturer of quality sanitary pads, medical consumables, and cotton wool products in Nigeria and West Africa.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};


import { ToastProvider } from "@/context/ToastContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>

  );
}
