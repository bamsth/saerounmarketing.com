export default function ScarcityBanner() {
  return (
    <div className="bg-amber-500/8 border-y border-amber-500/20 py-3 px-6 text-center">
      <p className="text-amber-400 text-sm font-medium">
        이번 달 신규 계약{" "}
        <span className="font-black text-amber-300">2자리</span>{" "}
        남았습니다
        <span className="text-amber-600 ml-3 text-xs hidden sm:inline">
          3월 기준 · 매월 선착순 마감
        </span>
      </p>
    </div>
  );
}
