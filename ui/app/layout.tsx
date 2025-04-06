import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MUD-UI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="corporate">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <Header />

        <main className="flex-1 bg-white py-8 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>

        <Footer />
      </body>
    </html>
  );
}
