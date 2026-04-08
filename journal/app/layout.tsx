import type { Metadata } from "next";
import localFont from "next/font/local";
import { AppShell } from "@/components/app-shell";
import "./globals.css";

const satoshi = localFont({
  src: "./fonts/Satoshi-Variable.woff2",
  variable: "--font-satoshi",
  display: "swap",
  weight: "300 900",
});

export const metadata: Metadata = {
  title: {
    default: "Journal | Ultrahope",
    template: "%s | Ultrahope Journal",
  },
  description: "静かな余白と、読み心地の良い文章でつくるプロダクトノート。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={satoshi.variable}>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
