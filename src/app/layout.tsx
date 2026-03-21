import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  weight: "100 900",
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
  verification: {
    google: "AhZJlzeLQxqXz6POXUVuh4Rqx7HTlvrh3dVnVo5-XKs",
    other: {
      "naver-site-verification": "515735dd4ef0c758aa616ea229756201ab6d79ec",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": "https://saerounmarketing.com",
      name: "새로운마케팅",
      url: "https://saerounmarketing.com",
      description:
        "수의사가 직접 운영하는 동물병원 전문 마케팅 에이전시. 수의학적 전문성을 바탕으로 동물병원 브랜딩, 콘텐츠 제작, 네이버 플레이스 최적화, 키워드 광고를 제공합니다.",
      founder: {
        "@type": "Person",
        name: "김범수",
        jobTitle: "수의사, 마케팅 컨설턴트",
        knowsAbout: ["수의학", "동물병원 마케팅", "콘텐츠 마케팅", "브랜딩"],
      },
      areaServed: {
        "@type": "Country",
        name: "대한민국",
      },
      serviceType: [
        "동물병원 마케팅",
        "수의사 브랜딩",
        "네이버 플레이스 최적화",
        "키워드 광고",
        "콘텐츠 제작",
      ],
      knowsAbout: ["동물병원", "수의학", "반려동물", "마케팅", "브랜딩"],
      slogan: "수의사가 직접 운영하는 마케팅 에이전시",
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "어떤 병원에 적합한가요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "1인/1차 동물병원, 치과·안과·정형외과 등 특수 진료 병원, 2차 동물병원, 신규 개원 및 리브랜딩을 원하는 모든 동물병원에 적합합니다.",
          },
        },
        {
          "@type": "Question",
          name: "일반 마케팅 에이전시와 뭐가 다른가요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "수의사가 직접 콘텐츠를 기획하고 제작합니다. 수의학적 배경 없이는 만들 수 없는 깊이 있는 전문성 콘텐츠로 보호자에게 '이 병원은 다르다'는 인식을 만들어냅니다.",
          },
        },
        {
          "@type": "Question",
          name: "성과는 언제부터 나타나나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "플레이스 노출 개선 등 즉각적인 변화는 1개월 내에 체감 가능합니다. 브랜딩 효과는 3개월 이후부터 본격적으로 나타나며, 실제 사례에서 3개월 만에 매출 50% 성장을 달성했습니다.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={pretendard.variable}>
      <head>
        {/* Google Analytics 4 */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-BXZJX18Q1M"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-BXZJX18Q1M');
            `,
          }}
        />
        {/* JSON-LD 구조화 데이터 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-[var(--font-pretendard)] antialiased">{children}</body>
    </html>
  );
}
