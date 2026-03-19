import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Qodari",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  //force deploy
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
