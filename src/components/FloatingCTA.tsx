"use client";

import { useState, useEffect } from "react";
import { trackCtaClick } from "@/lib/analytics";

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  const handleClick = () => {
    trackCtaClick("floating_cta");
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* 모바일: 하단 전체 너비 바 */}
      <div
        className={`md:hidden fixed bottom-0 left-0 right-0 z-50 p-4 bg-[#0a0f1e]/95 backdrop-blur-sm border-t border-slate-700/50 transition-all duration-300 ${
          visible
            ? "translate-y-0 opacity-100"
            : "translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <button
          onClick={handleClick}
          className="w-full bg-blue-500 hover:bg-blue-400 text-white font-bold py-4 rounded-xl text-base transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/30"
        >
          무료 브랜딩 진단 신청하기
        </button>
      </div>

      {/* 데스크톱: 우측 하단 플로팅 버튼 */}
      <div
        className={`hidden md:block fixed bottom-8 right-8 z-50 transition-all duration-300 ${
          visible
            ? "translate-y-0 opacity-100"
            : "translate-y-4 opacity-0 pointer-events-none"
        }`}
      >
        <button
          onClick={handleClick}
          className="bg-blue-500 hover:bg-blue-400 text-white font-bold px-6 py-4 rounded-full text-base transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/30"
        >
          무료 상담 신청
        </button>
      </div>
    </>
  );
}
