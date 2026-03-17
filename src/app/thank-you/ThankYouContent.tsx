"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { trackEvent } from "@/lib/analytics";

export default function ThankYouContent() {
  const router = useRouter();

  useEffect(() => {
    // 감사 페이지 도달 추적 (generate_lead는 Contact.tsx에서 이미 발생)
    trackEvent("thank_you_page_view");
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0f1e] flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-10 h-10 text-green-400"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </div>

        <h1 className="text-2xl md:text-3xl font-black text-white mb-3">
          상담 신청이 완료됐습니다!
        </h1>
        <p className="text-slate-400 mb-10 leading-relaxed">
          최대한 빠르게 연락드리겠습니다.
          <br />
          보통 24시간 이내에 회신드립니다.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => router.push("/")}
            className="bg-blue-500 hover:bg-blue-400 text-white font-bold px-8 py-4 rounded-xl text-base transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/30"
          >
            홈으로 돌아가기
          </button>
          {/* TODO: 카카오톡 채널 ID 확보 후 href 교체 필요 */}
          <a
            href="#"
            className="border border-[#FEE500] bg-[#FEE500]/10 hover:bg-[#FEE500]/20 text-[#FEE500] font-bold px-8 py-4 rounded-xl text-base transition-all duration-200"
          >
            카카오톡 문의하기
          </a>
        </div>
      </div>
    </div>
  );
}
