import { FadeIn, Stagger, StaggerItem } from "@/components/FadeIn";

const problems = [
  {
    title: "수의학을 모릅니다",
    desc: "감정에만 호소하는 피상적인 콘텐츠로 일관합니다. 전문성 없는 콘텐츠는 오히려 신뢰를 깎습니다.",
  },
  {
    title: "전문성을 표현하지 못합니다",
    desc: "원장님의 진짜 강점을 놓칩니다. 수의학적 지식 없이는 차별점을 만들 수 없습니다.",
  },
  {
    title: "단순 노출에만 집중합니다",
    desc: "브랜딩 없는 매출은 모래성일 뿐입니다. 지속 가능한 성장은 신뢰에서 시작합니다.",
  },
];

export default function Problem() {
  return (
    <section className="py-24 bg-slate-900">
      <div className="max-w-5xl mx-auto px-6">

        <FadeIn className="mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-white">
            지금 당신이 쓰는 마케팅 대행사,
            <span className="text-red-400"> 괜찮은 거 맞나요?</span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-xl">
            좋은 진료를 해도 예약이 안 차는 이유는 바로 여기 있습니다
          </p>
        </FadeIn>

        <Stagger className="space-y-0">
          {problems.map((item, i) => (
            <StaggerItem
              key={i}
              className="grid md:grid-cols-[80px_1fr_2fr] gap-6 md:gap-10 items-start py-8 border-t border-slate-800 group"
            >
              {/* 번호 — 크게 */}
              <span className="text-5xl font-black text-slate-700 group-hover:text-red-400/40 transition-colors duration-300 leading-none">
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* 타이틀 */}
              <h3 className="font-bold text-white text-lg leading-snug pt-1">
                {item.title}
              </h3>

              {/* 설명 */}
              <p className="text-slate-400 leading-relaxed text-sm pt-1">
                {item.desc}
              </p>
            </StaggerItem>
          ))}
          <div className="border-t border-slate-800" />
        </Stagger>

      </div>
    </section>
  );
}
