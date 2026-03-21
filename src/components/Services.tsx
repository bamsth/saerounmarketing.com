"use client";

import { FadeIn, Stagger, StaggerItem } from "@/components/FadeIn";
const services = [
  {
    title: "전문성 콘텐츠 제작",
    subtitle: "네이버 블로그 정기 발행",
    desc: "원장님의 임상 경험과 수의학적 지식을 보호자가 이해할 수 있는 언어로 번역합니다.",
    items: ["질환별 심화 콘텐츠", "실제 케이스 스터디 형식", "보호자 교육 시리즈"],
    accent: "bg-blue-500",
  },
  {
    title: "플레이스 최적화",
    subtitle: "네이버 플레이스 관리",
    desc: "리뷰 관리 및 상세설명 최적화로 검색 노출을 높이고 신뢰도를 강화합니다.",
    items: ["리뷰 답변 전문 관리", "상세설명 키워드 최적화", "노출 순위 모니터링"],
    accent: "bg-indigo-500",
  },
  {
    title: "키워드 광고 관리",
    subtitle: "네이버/구글 광고 대행",
    desc: "키워드 광고 세팅 및 운영 대행으로 광고비 효율을 최대화합니다.",
    items: ["타겟 키워드 선정", "광고 소재 제작", "성과 분석 및 최적화"],
    accent: "bg-cyan-500",
  },
  {
    title: "랜딩페이지 제작",
    subtitle: "병원 전용 브랜드 사이트",
    desc: "블로그·플레이스가 관심을 끌었다면, 랜딩페이지가 신뢰를 확정합니다. 원장님의 철학과 전문성을 담은 페이지를 제작합니다.",
    items: ["브랜드 스토리 설계", "모바일 최적화 디자인", "상담 전환 구조 설계"],
    accent: "bg-violet-500",
  },
];

export default function Services() {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="services" className="py-24 bg-slate-900">
      <div className="max-w-5xl mx-auto px-6">

        {/* 섹션 헤더 — 좌측 정렬 */}
        <div className="mb-16">
          <p className="text-blue-400 text-sm font-medium tracking-wider mb-4">
            Services
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-white">
            어떻게 브랜딩할까요?
          </h2>
          <p className="text-slate-400 mt-4 max-w-xl">
            단순 노출이 아닌, 원장님의 전문성을 보호자가 체감하게 만드는 전략적 마케팅
          </p>
        </div>

        <Stagger className="grid md:grid-cols-2 gap-4 mb-12">
          {services.map((svc) => (
            <StaggerItem key={svc.title} className="h-full">
            <div
              className="h-full rounded-2xl p-7 bg-slate-800/50 hover:-translate-y-1 transition-transform duration-200"
            >
              {/* 상단 액센트 라인 — 번호 뱃지 대신 */}
              <div className={`w-8 h-0.5 ${svc.accent} mb-6`} />

              {/* 서비스 타이틀 크게 */}
              <h3 className="font-black text-white text-xl mb-1">{svc.title}</h3>
              <p className="text-slate-500 text-sm mb-4">{svc.subtitle}</p>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">{svc.desc}</p>

              <ul className="space-y-2.5">
                {svc.items.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-slate-400 text-sm">
                    <span className={`w-1 h-1 rounded-full flex-shrink-0 ${svc.accent}`} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            </StaggerItem>
          ))}
        </Stagger>

        <FadeIn>
        <div className="text-center">
          <p className="text-slate-500 text-sm mb-6">
            월 100만원~부터 시작합니다
            <br />
            <span className="text-slate-600 text-xs">상세 구성 및 패키지는 미팅을 통해 맞춤 안내드립니다</span>
          </p>
          <button
            onClick={scrollToContact}
            className="bg-blue-500 hover:bg-blue-400 text-white font-bold px-8 py-4 rounded-full text-base transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/30"
          >
            무료 브랜딩 진단 신청하기
          </button>
        </div>
        </FadeIn>

      </div>
    </section>
  );
}
