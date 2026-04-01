import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "대표 소개 | 김범수 수의사 - 새로운마케팅",
  description:
    "수의사 김범수가 동물병원 전문 마케팅 에이전시를 창업한 이유. 가금 수의사 경험에서 시작된 '전문성을 알려야 산다'는 철학.",
  alternates: {
    canonical: "https://saerounmarketing.com/about",
  },
  openGraph: {
    title: "대표 소개 | 김범수 수의사 - 새로운마케팅",
    description:
      "수의사 김범수가 동물병원 전문 마케팅 에이전시를 창업한 이유.",
    url: "https://saerounmarketing.com/about",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "김범수",
  jobTitle: "수의사 / 새로운마케팅 대표",
  worksFor: {
    "@type": "Organization",
    name: "새로운마케팅",
    url: "https://saerounmarketing.com",
  },
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
    "동물병원 마케팅",
    "네이버 SEO",
    "콘텐츠 마케팅",
    "디지털 마케팅",
  ],
  url: "https://saerounmarketing.com/about",
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <main className="min-h-screen bg-white pt-16">
        <div className="max-w-3xl mx-auto px-6 py-20">
          {/* 프로필 */}
          <div className="flex items-center gap-6 mb-16">
            <Image
              src="/profile.png"
              alt="김범수 수의사"
              width={96}
              height={96}
              className="rounded-full object-cover flex-shrink-0"
            />
            <div>
              <h1 className="text-3xl font-black text-slate-900">김범수</h1>
              <p className="text-blue-600 mt-1">수의사 · 새로운마케팅 대표</p>
              <p className="text-slate-500 text-sm mt-1">
                수의사 면허 보유 · 동물병원 전문 마케팅
              </p>
            </div>
          </div>

          {/* 핵심 철학 */}
          <blockquote className="border-l-4 border-blue-600 pl-6 mb-16">
            <p className="text-2xl md:text-3xl font-black text-slate-900 leading-tight">
              &ldquo;전문성을 키우고 알리는 것.
              <br />
              <span className="text-blue-600">이것이 유일한 생존 전략입니다.&rdquo;</span>
            </p>
          </blockquote>

          {/* 스토리 */}
          <div className="space-y-12">
            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-4">
                가격 경쟁의 한계를 깨달은 순간
              </h2>
              <p className="text-slate-600 leading-relaxed">
                가금 수의사로 시작했습니다. 전문성을 갖추고 농장주들을 도왔지만,
                수의사 면허 없는 경쟁자들이 동물약품 유통을 하며 가격으로만
                승부하는 현실에 부딪혔습니다. 아무리 좋은 진료를 해도,
                가격이 낮은 쪽으로 고객이 흘러가는 구조였습니다.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-4">
                전문성만이 살 길이다
              </h2>
              <p className="text-slate-600 leading-relaxed">
                가격으로 경쟁하는 순간, 전문가는 사라집니다. 살아남으려면
                전문성을 키우고, 그것을 제대로 알려야 한다는 것을 깨달았습니다.
                단순히 "잘한다"는 말이 아니라, 왜 잘하는지를 보호자가 이해할 수
                있는 언어로 전달해야 한다는 것을.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-4">
                동물병원 원장님들도 마찬가지
              </h2>
              <p className="text-slate-600 leading-relaxed">
                압도적인 실력이 있어도, 보호자에게 그 가치가 전달되지 않으면
                의미가 없습니다. 수의사가 아닌 마케터가 수의학을 이해하는 데는
                한계가 있습니다. 그래서 시작했습니다. 수의사가 직접,
                원장님의 전문성을 보호자의 언어로 번역하는 일을.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-4">
                새로운마케팅이 다른 이유
              </h2>
              <p className="text-slate-600 leading-relaxed">
                대한민국에서 수의사 면허를 가진 마케팅 에이전시는 새로운마케팅이
                유일합니다. 단순한 포지셔닝이 아닙니다. 수의학적 배경 없이는
                만들 수 없는 콘텐츠, 진단명과 치료법을 이해하고 쓰는 글,
                원장님과 대등하게 임상 이야기를 나눌 수 있는 능력 —
                이것이 우리의 실제 차별점입니다.
              </p>
            </section>
          </div>

          {/* CTA */}
          <div className="mt-16 pt-12 border-t border-slate-200 text-center">
            <p className="text-slate-600 mb-6">
              병원의 전문성을 제대로 알리고 싶으신가요?
            </p>
            <Link
              href="/#contact"
              className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-xl transition-colors"
            >
              무료 상담 신청하기
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
