"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

function CountDown() {
  const [count, setCount] = useState(300);

  useEffect(() => {
    const delay = setTimeout(() => {
      const duration = 1800;
      const start = 300;
      const end = 1;
      const startTime = Date.now();

      const timer = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 2);
        const current = Math.round(start + (end - start) * eased);
        setCount(current);
        if (progress >= 1) clearInterval(timer);
      }, 16);

      return () => clearInterval(timer);
    }, 600);

    return () => clearTimeout(delay);
  }, []);

  return <span className="font-bold tabular-nums">{count}</span>;
}

export default function Hero() {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-screen bg-[#0a0f1e] flex items-center justify-center overflow-hidden">
      {/* 배경 그라디언트 */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0f1e] via-[#0d1b3e] to-[#0a0f1e]" />

      {/* 그리드 패턴 */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `linear-gradient(rgba(99,179,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(99,179,255,1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* 배경 블러 서클 */}
      <div className="absolute top-[15%] left-[8%] w-[520px] h-[520px] bg-blue-600/12 rounded-full blur-3xl" />
      <div className="absolute bottom-[10%] right-[12%] w-[400px] h-[400px] bg-cyan-400/8 rounded-full blur-3xl" />
      <div className="absolute top-[55%] left-[50%] w-[300px] h-[300px] bg-blue-500/6 rounded-full blur-3xl" />

      {/* 빛나는 수평선 */}
      <div className="absolute top-[28%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/25 to-transparent" />
      <div className="absolute top-[72%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/15 to-transparent" />

      {/* 코너 장식 */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l border-t border-blue-500/20" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r border-b border-blue-500/20" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-blue-400/70 text-sm font-medium tracking-wider mb-8"
        >
          수의사가 직접 운영하는 마케팅 에이전시
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-6"
        >
          좋은 진료 하는데,
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
            왜 예약이 안 찰까요?
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10"
        >
          전국에 동물병원 마케팅 대행사는 <CountDown /> 곳.
          <br className="hidden md:block" />
          <strong className="text-white">수의사 면허를 가진 곳은 단 하나입니다.</strong>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
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
        </motion.div>
      </div>
    </section>
  );
}
