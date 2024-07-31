import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SidebarWrapper from "./SidebarWrapper";

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
        <div className="flex h-screen w-auto"> 
          <SidebarWrapper />
          <main className="flex-1 overflow-y-auto w-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}