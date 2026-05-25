import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LearnOS — Student Dashboard",
  description: "Your futuristic learning hub",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#080C10] text-[#E6EDF3] antialiased">
        {children}
      </body>
    </html>
  );
}
