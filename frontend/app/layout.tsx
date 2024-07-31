import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SidebarWrapper from "./SidebarWrapper";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Database Management System",
  description: "by Group 8",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-screen">
          <SidebarWrapper />
          <main className="flex-1 flex flex-col justify-center items-center overflow-y-auto">
            <BackgroundGradientAnimation className="w-full h-full flex justify-center items-center">
              {children}
            </BackgroundGradientAnimation>
          </main>
        </div>
      </body>
    </html>
  );
}
