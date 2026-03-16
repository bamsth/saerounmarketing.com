"use client";

import { useState } from "react";

const faqs = [
  {
    q: "어떤 병원에 적합한가요?",
    a: "브랜딩이 필요한 모든 동물병원에 적합합니다.\n\n• 1인/1차 동물병원 — 지역 내 입지를 다지고 싶은 곳\n• 특수 진료 병원 — 치과, 안과, 정형외과 등 전문성을 강조하고 싶은 곳\n• 2차 동물병원 — 고난도 진료 역량을 알리고 싶은 곳\n• 신규 개원/리브랜딩 — 처음부터 제대로 브랜딩하고 싶은 곳\n\n특히 현재 마케팅이 없거나, 기존 마케팅 효과에 만족하지 못하시는 경우 더욱 효과적입니다.",
  },
  {
    q: "비용은 어떻게 되나요?",
    a: "병원의 상황, 목표, 필요한 서비스 범위에 따라 맞춤 견적을 제공합니다.\n\n기본적으로 월 관리 비용 + 프로젝트 시작 비용 구조이며, 키워드 광고를 진행하실 경우 광고 세팅비가 별도로 발생합니다.\n\n무료 브랜딩 진단 미팅을 통해 병원 현황을 분석한 후, 가장 효율적인 맞춤 전략을 안내드립니다.",
  },
  {
    q: "계약 기간은 어떻게 되나요?",
    a: "브랜딩은 단기간에 완성되지 않습니다. 최소 3개월 이상의 지속적인 관리를 권장드립니다.\n\n첫 3개월간 콘텐츠 기반을 구축하고, 이후 성과를 분석하며 최적화를 진행합니다. 장기 계약일수록 더 깊이 있는 브랜딩 전략을 수립할 수 있습니다.",
  },
  {
    q: "일반 마케팅 에이전시와 뭐가 다른가요?",
    a: "수의사가 직접 콘텐츠를 기획하고 제작합니다.\n\n일반 에이전시는 수의학을 모르기 때문에 감정에만 호소하거나, 피상적인 내용으로 일관합니다. 새로운마케팅은 원장님의 임상 경험과 전문성을 정확히 이해하고, 그것을 보호자의 언어로 번역합니다.\n\n결과적으로 '이 병원은 다르다'는 인식을 만들어냅니다.",
  },
  {
    q: "성과는 언제부터 나타나나요?",
    a: "플레이스 노출 개선 등 즉각적인 변화는 1개월 내에 체감 가능합니다.\n\n하지만 진짜 브랜딩 효과 — '이 병원이라면 믿을 수 있다'는 인식 — 는 3개월 이후부터 본격적으로 나타납니다.\n\n꾸준한 전문성 콘텐츠 발행이 쌓이면서 매출은 기하급수적으로 증가합니다.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 bg-slate-50">
      <div className="max-w-3xl mx-auto px-6">
        {/* 섹션 헤더 */}
        <div className="text-center mb-16">
          <span className="text-blue-500 font-semibold text-sm tracking-widest uppercase">
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-3">
            자주 묻는 질문
          </h2>
        </div>

        {/* FAQ 아코디언 */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden"
            >
              <button
                className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span className="font-semibold text-slate-900">{faq.q}</span>
                <span
                  className={`flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-transform duration-200 ${
                    openIndex === i ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>
              {openIndex === i && (
                <div className="px-6 pb-6">
                  <div className="border-t border-slate-100 pt-4">
                    <p className="text-slate-600 leading-relaxed whitespace-pre-line text-sm">
                      {faq.a}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
