import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
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
        url: "https://saerounmarketing.com/about",
        hasCredential: {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "수의사 면허",
          recognizedBy: {
            "@type": "Organization",
            name: "농림축산식품부",
          },
        },
        knowsAbout: [
          "수의학",
          "동물병원 경영",
          "디지털 마케팅",
          "네이버 SEO",
          "콘텐츠 마케팅",
        ],
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
            text: "브랜딩이 필요한 모든 동물병원에 적합합니다. 1인/1차 동물병원, 치과·안과·정형외과 등 특수 진료 병원, 2차 동물병원, 신규 개원 및 리브랜딩을 원하는 모든 동물병원에 적합합니다. 특히 현재 마케팅이 없거나, 기존 마케팅 효과에 만족하지 못하시는 경우 더욱 효과적입니다.",
          },
        },
        {
          "@type": "Question",
          name: "비용은 어떻게 되나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "월 100만원부터 시작합니다. 콘텐츠 제작 단독: 월 100만원~, 콘텐츠 + 플레이스 관리: 월 140만원~, 콘텐츠 + 플레이스 + 광고 운영: 월 190만원~. 키워드 광고 진행 시 광고비는 별도입니다.",
          },
        },
        {
          "@type": "Question",
          name: "계약 기간은 어떻게 되나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "최소 3개월 이상의 지속적인 관리를 권장드립니다. 첫 3개월간 콘텐츠 기반을 구축하고, 이후 성과를 분석하며 최적화를 진행합니다.",
          },
        },
        {
          "@type": "Question",
          name: "일반 마케팅 에이전시와 뭐가 다른가요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "수의사가 직접 콘텐츠를 기획하고 제작합니다. 일반 에이전시는 수의학을 모르기 때문에 감정에만 호소하거나 피상적인 내용으로 일관합니다. 새로운마케팅은 원장님의 임상 경험과 전문성을 정확히 이해하고, 그것을 보호자의 언어로 번역합니다.",
          },
        },
        {
          "@type": "Question",
          name: "성과는 언제부터 나타나나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "플레이스 노출 개선 등 즉각적인 변화는 1개월 내에 체감 가능합니다. 진짜 브랜딩 효과는 3개월 이후부터 본격적으로 나타나며, 실제 사례에서 3개월 만에 매출 50% 성장을 달성했습니다.",
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
        {/* JSON-LD 구조화 데이터 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-[var(--font-pretendard)] antialiased">
        {children}
        {/* Google Analytics 4 — afterInteractive로 렌더링 차단 방지 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-BXZJX18Q1M"
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-BXZJX18Q1M');
          `}
        </Script>
      </body>
    </html>
  );
}
