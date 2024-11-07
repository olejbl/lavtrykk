import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Trykktest",
  description: "her er det trykk ja!",
  openGraph: {
    type: "article",
    url: "https://lavtrykk-orse.vercel.app/",
    title: "Er det lavtrykk?",
    description: "Eller er det høytrykk?",
    siteName: "Trykktestern",
    images: [
      {
        url: "https://lavtrykk-orse.vercel.app/image",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
