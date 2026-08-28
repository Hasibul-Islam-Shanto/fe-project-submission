import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import Header from "@/components/ui/Header";
import UrqlProvider from "@/components/providers/UrqlProvider";
import "./globals.css";

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-work-sans",
});

export const metadata: Metadata = {
  title: "TonMart — Electronics & Appliances",
  description: "Browse electronics and appliances at TonMart",
};

const RootLayout = ({ children }: LayoutProps<"/">) => {
  return (
    <html lang="en" className={`${workSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Header />
        <UrqlProvider>
          <main>{children}</main>
        </UrqlProvider>
      </body>
    </html>
  );
};

export default RootLayout;
