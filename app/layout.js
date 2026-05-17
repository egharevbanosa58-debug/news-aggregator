import "./globals.css";

import { Geist, Geist_Mono } from "next/font/google";
import Providers from "./Providers";

import { Analytics } from "@vercel/analytics/next";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  robots: {
    index: true,
    follow: false,
  },

  metadataBase: new URL('https://newslitenews.vercel.app/'),
  alternates: {
    canonical: '/',
  },

  title: "NewsLite news aggregator",
  description: "A News aggregator web app created by NOSA",
  images: [{ url: '/NewsLite.PNG'}],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>


      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen dark:bg-blue-950 dark:text-white text-black bg-stone-50 transition-colors duration-200`}
      >
          <Analytics />
          
            <Providers>
              <main>
                {children}
              </main>
            </Providers>
      </body>
    </html >
  );
}
