"use client";

// Hero 섹션 — animate-pulse 뱃지 제거, 스크롤 힌트 제거, 절제된 느낌으로 수정
export default function Hero() {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-screen bg-[#0a0f1e] flex items-center justify-center overflow-hidden">
      {/* 배경 그라디언트 */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0f1e] via-[#0d1b3e] to-[#0a0f1e]" />

      {/* 배경 블러 서클 — 위치를 비대칭으로 조정해 자연스럽게 */}
      <div className="absolute top-[15%] left-[8%] w-[520px] h-[520px] bg-blue-600/8 rounded-full blur-3xl" />
      <div className="absolute bottom-[10%] right-[12%] w-[360px] h-[360px] bg-cyan-400/5 rounded-full blur-3xl" />
      <div className="absolute top-[60%] left-[55%] w-[280px] h-[280px] bg-blue-500/4 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* 심플한 한 줄 텍스트 레이블 — pill 뱃지 + animate-pulse 대신 */}
        <p className="text-blue-400/70 text-sm font-medium tracking-wider mb-8">
          수의사가 직접 운영하는 마케팅 에이전시
        </p>

        {/* 메인 헤드라인 */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-6 animate-fade-in-up">
          좋은 진료 하는데,
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
            왜 예약이 안 찰까요?
          </span>
        </h1>

        {/* 서브텍스트 */}
        <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10 animate-fade-in-up-delay-1">
          수의사가 직접 운영하는 마케팅 에이전시는 단어 하나부터 다릅니다.
          <br className="hidden md:block" />
          새로운마케팅은 수의학적 본질을 꿰뚫는 통찰로
          <br className="hidden md:block" />
          <strong className="text-white">원장님의 가치를 증명합니다.</strong>
        </p>

        {/* CTA 버튼 — 스크롤 힌트 완전 제거 */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up-delay-2">
          <button
            onClick={scrollToContact}
            className="bg-blue-500 hover:bg-blue-400 text-white font-bold px-8 py-4 rounded-full text-base transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/30"
          >
            무료 브랜딩 진단 신청하기
          </button>
          <button
            onClick={() =>
              document
                .getElementById("story")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="border border-slate-600 hover:border-slate-400 text-slate-300 hover:text-white font-medium px-8 py-4 rounded-full text-base transition-all duration-200"
          >
            더 알아보기
          </button>
        </div>
      </div>
    </section>
  );
}
