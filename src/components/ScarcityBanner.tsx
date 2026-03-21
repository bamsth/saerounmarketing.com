export default function ScarcityBanner() {
  return (
    <div className="bg-slate-900 border-y border-slate-800 py-5 px-6">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-slate-300 text-sm font-medium">
          새로운마케팅은{" "}
          <span className="text-white font-bold">같은 상권, 같은 진료과 병원은 단 한 곳과만 계약합니다.</span>
        </p>
        <p className="text-slate-500 text-xs shrink-0">
          귀원이 계약하는 순간, 같은 지역 경쟁 병원은 받지 않습니다
        </p>
      </div>
    </div>
  );
}
