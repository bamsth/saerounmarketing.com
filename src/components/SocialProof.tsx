import Image from "next/image";
import { FadeIn } from "@/components/FadeIn";

export default function SocialProof() {
  return (
    <section className="py-24 bg-slate-900">
      <div className="max-w-5xl mx-auto px-6">

        <FadeIn className="mb-16">
          <p className="text-blue-400 text-sm font-medium tracking-wider mb-4">
            Real Proof
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-white">
            3개월 후, 원장님이 바빠졌습니다
          </h2>
          <p className="text-slate-400 mt-4">
            말이 아닌, 실제로 일어난 일입니다
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-12 items-start">

          <FadeIn direction="left">
            <p className="text-slate-500 text-xs font-semibold tracking-wider uppercase mb-4">
              원장님에게 온 카카오톡
            </p>
            <div className="rounded-2xl overflow-hidden shadow-2xl shadow-black/40">
              <Image
                src="/kakao-proof.png"
                alt="실제 클라이언트 원장님 카카오톡 대화"
                width={600}
                height={800}
                className="w-full"
              />
            </div>
          </FadeIn>

          <FadeIn direction="right" delay={0.15}>
            <p className="text-slate-500 text-xs font-semibold tracking-wider uppercase mb-4">
              실제 매출 변화
            </p>

            {/* 매출 테이블 */}
            <div className="rounded-2xl overflow-hidden bg-slate-800/50">
              {/* 헤더 */}
              <div className="grid grid-cols-2 px-6 py-4 border-b border-slate-700/60">
                <span className="text-slate-500 text-xs font-semibold">월</span>
                <span className="text-slate-500 text-xs font-semibold text-right">매출액</span>
              </div>

              {/* 11월 */}
              <div className="grid grid-cols-2 px-6 py-5 border-b border-slate-800">
                <span className="text-slate-400 text-sm">2025년 11월</span>
                <span className="text-slate-300 text-sm text-right tabular-nums">약 4,000만원</span>
              </div>

              {/* 12월 */}
              <div className="grid grid-cols-2 px-6 py-5 border-b border-slate-800">
                <span className="text-slate-400 text-sm">2025년 12월</span>
                <span className="text-slate-300 text-sm text-right tabular-nums">약 4,100만원</span>
              </div>

              {/* 1월 — 강조 */}
              <div className="grid grid-cols-2 px-6 py-5 bg-blue-500/10">
                <span className="text-white text-sm font-semibold">2026년 01월</span>
                <span className="text-blue-400 text-sm font-bold text-right tabular-nums">약 5,900만원</span>
              </div>

              {/* 성장 하이라이트 */}
              <div className="px-6 py-5 bg-blue-500">
                <p className="text-white font-black text-xl">+47% 매출 성장</p>
                <p className="text-blue-100 text-sm mt-1">
                  2개월 만에 — 실제 클라이언트 데이터 기준
                </p>
              </div>
            </div>

            {/* 카톡 인용 */}
            <div className="mt-8 pl-4 border-l-2 border-blue-500">
              <p className="text-slate-300 text-sm italic leading-relaxed">
                &ldquo;저번주부터 시술예약이 틈틈이 들어와서 해결하고 있는데
                자료정리도 못하고있네요...기존방식보다는 업무시스템을 조정해야 할 것 같습니다.&rdquo;
              </p>
              <p className="text-slate-500 text-xs mt-2">— 실제 클라이언트 원장님</p>
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
}
