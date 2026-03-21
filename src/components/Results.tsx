"use client";

import { useEffect, useRef, useState } from "react";
import { FadeIn, Stagger, StaggerItem } from "@/components/FadeIn";
import { motion, useInView } from "framer-motion";

const achievements = [
  { value: "+50%", label: "3개월 매출 성장", num: 50, prefix: "+", suffix: "%" },
  { value: "+47%", label: "월매출 추가 상승", num: 47, prefix: "+", suffix: "%" },
  { value: "+40%", label: "소개·입소문 내원", num: 40, prefix: "+", suffix: "%" },
  { value: "+60%", label: "블로그 기반 내원", num: 60, prefix: "+", suffix: "%" },
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
      if (start >= num) {
        setCount(num);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, step);
    return () => clearInterval(timer);
  }, [inView, num]);

  return (
    <p ref={ref} className="text-3xl font-black text-slate-900 leading-none mb-2">
      {prefix}{count}{suffix}
    </p>
  );
}

export default function Results() {
  return (
    <section id="results" className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6">

        <FadeIn className="mb-16">
          <p className="text-blue-500 text-sm font-medium tracking-wider mb-4">
            Real Case
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900">
            본질의 강화가 가져온 매출의 혁신
          </h2>
          <p className="text-slate-500 mt-4">
            전문성을 제대로 전달했을 때, 숫자는 자연스럽게 따라옵니다
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-16 items-start">

          {/* 왼쪽: 케이스 상세 */}
          <FadeIn direction="left">
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

            <div className="w-full h-px bg-slate-100 mb-6" />

            <p className="font-bold text-slate-900 text-sm mb-4">적용 전략</p>
            <Stagger className="space-y-4">
              {[
                { title: "초전문성 콘텐츠", desc: "치과 질환별 심화 블로그 콘텐츠 발행" },
                { title: "리뷰 신뢰도 강화", desc: "플레이스 리뷰 전문적 답변 관리" },
                { title: "검색 최적화", desc: "상세설명 키워드 전략 수립" },
              ].map((s, i) => (
                <StaggerItem key={i} className="flex gap-4 items-start">
                  <span className="text-slate-300 text-xs font-bold mt-0.5 w-4 flex-shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="font-semibold text-slate-800 text-sm">{s.title}</p>
                    <p className="text-slate-500 text-sm">{s.desc}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>

            <div className="mt-8 pl-4 border-l-2 border-blue-500">
              <p className="text-slate-600 text-sm italic leading-relaxed">
                &ldquo;요즘 보호자분들이 치료에 대해 이미 다 알고 오세요.
                설명 시간이 줄었고, 소개로 오시는 분들도 눈에 띄게 늘었어요.&rdquo;
              </p>
              <p className="text-slate-400 text-xs mt-2">— A 동물치과병원 원장님</p>
            </div>

            <div className="mt-4 pl-4 border-l-2 border-cyan-400">
              <p className="text-slate-600 text-sm italic leading-relaxed">
                &ldquo;전문성이 느껴져서 선택했어요&rdquo;
              </p>
              <p className="text-slate-400 text-xs mt-2">— 실제 내원 보호자</p>
            </div>
          </FadeIn>

          {/* 오른쪽: 성과 수치 카운팅 */}
          <FadeIn direction="right" delay={0.15}>
            <div className="grid grid-cols-2 gap-px bg-slate-100">
              {achievements.map((a) => (
                <div key={a.label} className="bg-white p-6 flex flex-col justify-between">
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
              className="mt-4 bg-blue-500 px-6 py-5 text-white"
            >
              <p className="font-black text-lg leading-snug">
                3개월 만에 매출 50% 성장
              </p>
              <p className="text-blue-100 text-sm mt-1 leading-relaxed">
                콘텐츠가 쌓이면서 보호자가 먼저 알고 오고, 입소문까지 만들어집니다
              </p>
            </motion.div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
}
