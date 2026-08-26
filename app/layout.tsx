import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import { Toaster } from "sonner";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Hotel Bee — Premium Hospitality & Events",
    template: "%s | Hotel Bee",
  },
  description:
    "Hotel Bee is a boutique hotel, restaurant, banquet, and events venue delivering unforgettable experiences. Explore our menu, book a hall, register for events, or enquire about catering.",
  keywords: ["hotel", "restaurant", "banquet", "events", "catering", "Hotel Bee"],
  icons: {
    icon: "/vercel.svg",
  },
  openGraph: {
    title: "Hotel Bee — Premium Hospitality & Events",
    description:
      "A boutique hotel and restaurant crafted for memorable moments.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} h-full`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="flex flex-col min-h-full">
        <Nav />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
        <Toaster
          theme="dark"
          position="bottom-right"
          toastOptions={{
            style: {
              background: "var(--surface-2)",
              border: "1px solid var(--border)",
              color: "var(--warm-white)",
            },
          }}
        />
      </body>
    </html>
  );
}
