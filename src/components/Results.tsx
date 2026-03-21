"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FadeIn, Stagger, StaggerItem } from "@/components/FadeIn";
import { motion, useInView } from "framer-motion";

const achievements = [
  { num: 50, prefix: "+", suffix: "%", label: "3개월 매출 성장" },
  { num: 50, prefix: "약 ", suffix: "%", label: "월매출 추가 상승" },
  { num: 40, prefix: "+", suffix: "%", label: "소개·입소문 내원" },
  { num: 60, prefix: "+", suffix: "%", label: "블로그 기반 내원" },
];

function CountUp({ num, prefix, suffix }: { num: number; prefix: string; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1200;
    const step = 16;
    const increment = num / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= num) { setCount(num); clearInterval(timer); }
      else { setCount(Math.floor(start)); }
    }, step);
    return () => clearInterval(timer);
  }, [inView, num]);

  return (
    <p ref={ref} className="text-3xl font-black text-white leading-none mb-2">
      {prefix}{count}{suffix}
    </p>
  );
}

export default function Results() {
  return (
    <section id="results" className="py-24 bg-slate-900">
      <div className="max-w-5xl mx-auto px-6">

        {/* 헤더 */}
        <FadeIn className="mb-16">
          <p className="text-blue-400 text-sm font-medium tracking-wider mb-4">Real Case</p>
          <h2 className="text-3xl md:text-4xl font-black text-white">
            3개월 후, 원장님이
            <span className="text-blue-400"> 사람을 뽑았습니다</span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-xl">
            좋은 진료를 하고 있었습니다. 단, 아무도 몰랐을 뿐입니다.
          </p>
        </FadeIn>

        {/* 1단: 케이스 + 전략 | 성과 수치 */}
        <div className="grid md:grid-cols-2 gap-16 items-start mb-16">

          {/* 왼쪽: 케이스 */}
          <FadeIn direction="left">
            <div className="mb-6">
              <p className="text-xs font-semibold text-blue-400 tracking-wider uppercase mb-1">
                치과 특화 동물병원
              </p>
              <p className="font-black text-white text-xl">A 동물치과병원</p>
              <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                이미 압도적인 전문성을 갖춘 치과 특화 병원이었지만,
                보호자들에게 그 &lsquo;가치&rsquo;가 전달되지 않고 있었습니다.
              </p>
            </div>

            <div className="w-full h-px bg-slate-800 mb-6" />

            <p className="font-bold text-white text-sm mb-4">적용 전략</p>
            <Stagger className="space-y-4 mb-8">
              {[
                { title: "초전문성 콘텐츠", desc: "치과 질환별 심화 블로그 콘텐츠 발행" },
                { title: "리뷰 신뢰도 강화", desc: "플레이스 리뷰 전문적 답변 관리" },
                { title: "검색 최적화", desc: "상세설명 키워드 전략 수립" },
              ].map((s, i) => (
                <StaggerItem key={i} className="flex gap-4 items-start">
                  <span className="text-slate-600 text-xs font-bold mt-0.5 w-6 flex-shrink-0 whitespace-nowrap">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="font-semibold text-slate-200 text-sm">{s.title}</p>
                    <p className="text-slate-500 text-sm">{s.desc}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>

            <div className="pl-4 border-l-2 border-blue-500">
              <p className="text-slate-300 text-sm italic leading-relaxed">
                &ldquo;요즘 보호자분들이 치료에 대해 이미 다 알고 오세요.
                설명 시간이 줄었고, 소개로 오시는 분들도 눈에 띄게 늘었어요.&rdquo;
              </p>
              <p className="text-slate-500 text-xs mt-2">— A 동물치과병원 원장님</p>
            </div>
          </FadeIn>

          {/* 오른쪽: 수치 */}
          <FadeIn direction="right" delay={0.15}>
            <div className="grid grid-cols-2 gap-px bg-slate-800">
              {achievements.map((a) => (
                <div key={a.label} className="bg-slate-900 p-6 flex flex-col justify-between">
                  <CountUp num={a.num} prefix={a.prefix} suffix={a.suffix} />
                  <p className="text-slate-500 text-xs">{a.label}</p>
                </div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-4 bg-blue-500 px-6 py-5"
            >
              <p className="font-black text-white text-lg leading-snug">
                매출이 올라서, 직원을 채용했습니다
              </p>
              <p className="text-blue-100 text-sm mt-1 leading-relaxed">
                예약이 밀려들어 기존 업무 시스템으로는 감당이 안 됐습니다
              </p>
            </motion.div>
          </FadeIn>

        </div>

        {/* 구분선 */}
        <div className="w-full h-px bg-slate-800 mb-16" />

        {/* 카카오톡 증거 — 가운데 정렬 */}
        <FadeIn>
          <p className="text-slate-500 text-xs font-semibold tracking-wider uppercase mb-4">
            원장님에게 온 카카오톡
          </p>
          <div className="max-w-lg rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
            <Image
              src="/kakao-proof.png"
              alt="실제 클라이언트 원장님 카카오톡 대화"
              width={802}
              height={558}
              className="w-full"
            />
          </div>
        </FadeIn>

      </div>
    </section>
  );
}
