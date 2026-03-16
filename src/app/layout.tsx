import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-noto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "동물병원 전문 마케팅 | 새로운마케팅 - 수의사가 직접 운영",
  description:
    "수의사가 직접 운영하는 동물병원 전문 마케팅 에이전시. 전문성을 보호자의 언어로 번역하여 3개월 내 매출 200% 성장을 만듭니다.",
  keywords:
    "동물병원 마케팅, 수의사 마케팅, 동물병원 브랜딩, 네이버 플레이스 최적화, 동물병원 광고, 동물병원 홍보",
  authors: [{ name: "새로운마케팅" }],
  metadataBase: new URL("https://saerounmarketing.com"),
  openGraph: {
    title: "동물병원 전문 마케팅 | 새로운마케팅",
    description:
      "수의사가 직접 운영하는 동물병원 전문 마케팅 에이전시. 전문성을 보호자의 언어로 번역합니다.",
    url: "https://saerounmarketing.com",
    siteName: "새로운마케팅",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "동물병원 전문 마케팅 | 새로운마케팅",
    description: "수의사가 직접 운영하는 동물병원 전문 마케팅 에이전시.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: "https://saerounmarketing.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={notoSansKR.variable}>
      <body className="font-[var(--font-noto)] antialiased">{children}</body>
    </html>
  );
}
