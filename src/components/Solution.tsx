// Solution 섹션 — 이모지 카드 제거, ❌/✅ 비교표 제거
// 좌우 텍스트 비교 (회색 일반 에이전시 vs 파란 새로운마케팅) + 세로 목록 구조로 대체
const solutions = [
  {
    title: "수의학적 통찰을 담은 콘텐츠",
    desc: "임상 경험과 수의학 지식을 바탕으로 보호자가 '이 병원은 다르다'고 느끼는 콘텐츠를 제작합니다.",
  },
  {
    title: "진료 현장의 언어를 이해",
    desc: "원장님과의 소통이 다릅니다. 수의학적 배경 없이는 만들 수 없는 깊이 있는 전략을 제시합니다.",
  },
  {
    title: "지역 내 대체 불가능한 브랜드",
    desc: "단순 노출이 아닌 장기적 신뢰 구축. 한번 자리 잡은 브랜드는 광고비 없이도 유지됩니다.",
  },
];

// 일반 에이전시 한계 vs 새로운마케팅 강점 비교 데이터
const comparison = [
  {
    general: "수의학을 모르는 마케터가 콘텐츠를 씁니다",
    saeroun: "수의사가 직접 기획하고 검수합니다",
  },
  {
    general: "감정 자극 위주의 피상적인 카피",
    saeroun: "수의학적 근거가 담긴 전문 콘텐츠",
  },
  {
    general: "단기 노출 수치만 쫓습니다",
    saeroun: "장기 브랜드 신뢰를 쌓습니다",
  },
  {
    general: "진료 현장 소통이 어렵습니다",
    saeroun: "같은 언어로 원장님과 대화합니다",
  },
];

export default function Solution() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6">

        {/* 섹션 헤더 — 좌측 정렬 */}
        <div className="mb-16">
          <p className="text-blue-500 text-sm font-medium tracking-wider mb-4">
            The Solution
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900">
            수의사만이 가능한 마케팅
          </h2>
          <p className="text-slate-500 mt-4">
            수의사가 직접 기획하고 운영합니다
          </p>
        </div>

        {/* 솔루션 목록 — 세로형, 배경색으로만 구분, 카드 border 제거 */}
        <div className="space-y-0 mb-20">
          {solutions.map((item, i) => (
            <div
              key={i}
              className="grid md:grid-cols-[1fr_2fr] gap-6 md:gap-16 items-start py-8 border-t border-slate-100"
            >
              <h3 className="font-bold text-slate-900 text-lg leading-snug">
                {item.title}
              </h3>
              <p className="text-slate-500 leading-relaxed text-sm">
                {item.desc}
              </p>
            </div>
          ))}
          <div className="border-t border-slate-100" />
        </div>

        {/* 비교 섹션 — ❌/✅ 테이블 대신 좌우 텍스트 컬럼 */}
        <div>
          <h3 className="font-bold text-slate-900 text-lg mb-8">
            일반 에이전시 vs 새로운마케팅
          </h3>

          {/* 컬럼 헤더 */}
          <div className="grid grid-cols-2 gap-6 md:gap-12 mb-6">
            <p className="text-slate-400 text-xs font-semibold tracking-wider uppercase">
              일반 에이전시
            </p>
            <p className="text-blue-500 text-xs font-semibold tracking-wider uppercase">
              새로운마케팅
            </p>
          </div>

          {/* 비교 항목 — 좌우 텍스트 나열 */}
          <div className="space-y-0">
            {comparison.map((row, i) => (
              <div
                key={i}
                className="grid grid-cols-2 gap-6 md:gap-12 py-5 border-t border-slate-100"
              >
                {/* 왼쪽: 회색톤 — 일반 에이전시 한계 */}
                <p className="text-slate-400 text-sm leading-relaxed">
                  {row.general}
                </p>
                {/* 오른쪽: 파란톤 — 새로운마케팅 강점 */}
                <p className="text-slate-700 text-sm leading-relaxed font-medium">
                  <span className="text-blue-500 mr-2 font-bold">—</span>
                  {row.saeroun}
                </p>
              </div>
            ))}
            <div className="border-t border-slate-100" />
          </div>
        </div>

      </div>
    </section>
  );
}
