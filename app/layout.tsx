import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "ClassSupport - Teacher Support Tool",
  description: "AI-powered support for teachers managing classroom challenges",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} font-sans antialiased bg-gray-light min-h-screen overflow-x-hidden`}>
        <Navbar />
        <main className="max-w-4xl mx-auto px-4 py-6 animate-page-in">
          {children}
        </main>
      </body>
    </html>
  );
}
