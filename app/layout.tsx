import type { Metadata } from "next";
import { NEXT_PUBLIC_URL } from '@/app/config';
import { Inter } from "next/font/google";
import "../styles/globals.css"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "JoinWhitelist",
  description: "LFG",
  openGraph: {
    title: 'JoinWhitelist',
    description: 'LFG',
    images: [`${NEXT_PUBLIC_URL}/park-1.png`], // 加个图片
  },
  other: {
    // ...frameMetadata,
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1.0,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
