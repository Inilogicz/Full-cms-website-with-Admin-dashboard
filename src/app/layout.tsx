import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Niger Sanitary Industry Limited | Quality Sanitary Products",
    template: "%s | Niger Sanitary Industry Limited",
  },
  description: "Leading manufacturer of quality sanitary pads, medical consumables, and cotton wool products in Nigeria and West Africa.",
  keywords: ["sanitary pads", "medical consumables", "cotton wool", "Nigeria", "West Africa", "LadySept", "Damson"],
  openGraph: {
    type: "website",
    locale: "en_NG",
    siteName: "Niger Sanitary Industry Limited",
  },
};

import { ToastProvider } from "@/context/ToastContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
