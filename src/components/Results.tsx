// Results 섹션 — 이모지 아이콘 전면 제거
// 성과 수치를 큰 타이포그래피로 강조, 🦷 → 텍스트 레이블로 대체
const achievements = [
  { value: "+50%", label: "3개월 매출 성장" },
  { value: "+100%", label: "플레이스 노출 증가" },
  { value: "증가", label: "소개·입소문 내원" },
  { value: "증가", label: "블로그 기반 내원" },
];

export default function Results() {
  return (
    <section id="results" className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6">

        {/* 섹션 헤더 — 좌측 정렬 */}
        <div className="mb-16">
          <p className="text-blue-500 text-sm font-medium tracking-wider mb-4">
            Real Case
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900">
            본질의 강화가 가져온 매출의 혁신
          </h2>
          <p className="text-slate-500 mt-4">
            전문성을 제대로 전달했을 때, 숫자는 자연스럽게 따라옵니다
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-start">

          {/* 왼쪽: 케이스 상세 */}
          <div>
            {/* 병원 레이블 — 이모지 아이콘 대신 텍스트로 */}
            <div className="mb-6">
              <p className="text-xs font-semibold text-blue-500 tracking-wider uppercase mb-1">
                치과 특화 동물병원
              </p>
              <p className="font-black text-slate-900 text-xl">A 동물치과병원</p>
              <p className="text-slate-500 text-sm mt-2 leading-relaxed">
                이미 압도적인 전문성을 갖춘 치과 특화 병원이었지만, 보호자들에게
                그 &lsquo;가치&rsquo;가 전달되지 않고 있었습니다.
              </p>
            </div>

            {/* 구분선 */}
            <div className="w-full h-px bg-slate-100 mb-6" />

            {/* 적용 전략 */}
            <p className="font-bold text-slate-900 text-sm mb-4">적용 전략</p>
            <div className="space-y-4">
              {[
                { title: "초전문성 콘텐츠", desc: "치과 질환별 심화 블로그 콘텐츠 발행" },
                { title: "리뷰 신뢰도 강화", desc: "플레이스 리뷰 전문적 답변 관리" },
                { title: "검색 최적화", desc: "상세설명 키워드 전략 수립" },
              ].map((s, i) => (
                <div key={i} className="flex gap-4 items-start">
                  {/* 번호 — 작은 텍스트 */}
                  <span className="text-slate-300 text-xs font-bold mt-0.5 w-4 flex-shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="font-semibold text-slate-800 text-sm">{s.title}</p>
                    <p className="text-slate-500 text-sm">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* 인용 — 원장님 후기 */}
            <div className="mt-8 pl-4 border-l-2 border-blue-500">
              <p className="text-slate-600 text-sm italic leading-relaxed">
                &ldquo;요즘 보호자분들이 치료에 대해 이미 다 알고 오세요.
                설명 시간이 줄었고, 소개로 오시는 분들도 눈에 띄게 늘었어요.&rdquo;
              </p>
              <p className="text-slate-400 text-xs mt-2">— A 동물치과병원 원장님</p>
            </div>

            {/* 인용 — 보호자 후기 */}
            <div className="mt-4 pl-4 border-l-2 border-cyan-400">
              <p className="text-slate-600 text-sm italic leading-relaxed">
                &ldquo;전문성이 느껴져서 선택했어요&rdquo;
              </p>
              <p className="text-slate-400 text-xs mt-2">— 실제 내원 보호자</p>
            </div>
          </div>

          {/* 오른쪽: 성과 수치 — 이모지 없이 큰 타이포그래피로 */}
          <div>
            {/* 수치 그리드 */}
            <div className="grid grid-cols-2 gap-px bg-slate-100">
              {achievements.map((a) => (
                <div
                  key={a.label}
                  className="bg-white p-6 flex flex-col justify-between"
                >
                  <p className="text-3xl font-black text-slate-900 leading-none mb-2">
                    {a.value}
                  </p>
                  <p className="text-slate-500 text-xs">{a.label}</p>
                </div>
              ))}
            </div>

            {/* 결론 강조 */}
            <div className="mt-4 bg-blue-500 px-6 py-5 text-white">
              <p className="font-black text-lg leading-snug">
                3개월 만에 매출 50% 성장
              </p>
              <p className="text-blue-100 text-sm mt-1 leading-relaxed">
                콘텐츠가 쌓이면서 보호자가 먼저 알고 오고, 입소문까지 만들어집니다
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
