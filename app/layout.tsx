import type { Metadata, Viewport } from "next";
import { Anton, Manrope, Noto_Serif_Ethiopic } from "next/font/google";
import { MotionProvider } from "@/components/motion";
import "./globals.css";

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const ethiopic = Noto_Serif_Ethiopic({
  variable: "--font-ethiopic",
  subsets: ["ethiopic"],
  weight: ["400", "500"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://konjo.com.au"),
  title: "Konjo Cafe & Restaurant · Authentic Ethiopian Food in Footscray",
  description:
    "Family-run Ethiopian café-restaurant at 89 Irving St, Footscray. Traditional jebana coffee ceremony, house-made berbere and big shared platters on injera. Book a table.",
  openGraph: {
    title: "Konjo Cafe & Restaurant",
    description:
      "Authentic Ethiopian food and coffee ceremony in Footscray, Melbourne. Family-run since the mid-2000s.",
    url: "https://konjo.com.au",
    siteName: "Konjo Cafe & Restaurant",
    locale: "en_AU",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#ee9d38",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-AU"
      data-scroll-behavior="smooth"
      className={`${anton.variable} ${manrope.variable} ${ethiopic.variable} antialiased`}
    >
      <body className="min-h-full">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
