import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import QueryProvider from "./components/QueryProvider";

const vazir = Vazirmatn({
  subsets: ["arabic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "زرماوا",
  description: "پلتفرم تخصصی صنف طلا",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${vazir.className} antialiased`}>
        <QueryProvider>
          <Navbar />
          <main>
            {children}
          </main>
          <Footer/>
        </QueryProvider>
      </body>
    </html>
  );
}