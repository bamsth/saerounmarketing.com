"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import emailjs from "@emailjs/browser";
import { trackGenerateLead, trackEvent } from "@/lib/analytics";

interface FormData {
  name: string;
  hospital: string;
  phone: string;
  concern: string;
}

const PHONE_REGEX = /^01[016789]-?\d{3,4}-?\d{4}$/;

export default function Contact() {
  const router = useRouter();
  const [form, setForm] = useState<FormData>({
    name: "",
    hospital: "",
    phone: "",
    concern: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [step, setStep] = useState<1 | 2>(1);
  const [phoneError, setPhoneError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (e.target.name === "phone") {
      setPhoneError("");
    }
  };

  const handleNext = () => {
    trackEvent("form_step_1", { form_name: "consultation" });
    setStep(2);
  };

  const handlePrev = () => {
    setStep(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!PHONE_REGEX.test(form.phone)) {
      setPhoneError("올바른 전화번호를 입력해주세요 (예: 010-1234-5678)");
      return;
    }

    trackEvent("form_step_2", { form_name: "consultation" });
    setStatus("loading");

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          name: form.name,
          hospital: form.hospital,
          phone: form.phone,
          message: form.concern || "(없음)",
          time: new Date().toLocaleString("ko-KR"),
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      trackGenerateLead(form.hospital);
      setForm({ name: "", hospital: "", phone: "", concern: "" });
      setStep(1);
      router.push("/thank-you");
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#0a0f1e]">
      <div className="max-w-2xl mx-auto px-6">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-white mt-3">
            아직 결정하지 마세요.
            <br />
            <span className="text-blue-400">우선 진단부터 받아보세요.</span>
          </h2>
          <p className="text-slate-400 mt-4">
            병원 브랜딩 현황 무료 진단 후 1:1 미팅을 진행합니다
          </p>
        </div>

        {/* 폼 */}
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-8">
          {/* 스텝 인디케이터 */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                  step >= 1
                    ? "bg-blue-500 text-white"
                    : "bg-slate-700 text-slate-400"
                }`}
              >
                1
              </div>
              <span
                className={`ml-2 text-sm font-medium ${
                  step >= 1 ? "text-white" : "text-slate-500"
                }`}
              >
                기본 정보
              </span>
            </div>

            <div
              className={`w-12 h-0.5 mx-3 transition-colors ${
                step >= 2 ? "bg-blue-500" : "bg-slate-700"
              }`}
            />

            <div className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                  step >= 2
                    ? "bg-blue-500 text-white"
                    : "bg-slate-700 text-slate-400"
                }`}
              >
                2
              </div>
              <span
                className={`ml-2 text-sm font-medium ${
                  step >= 2 ? "text-white" : "text-slate-500"
                }`}
              >
                연락처
              </span>
            </div>
          </div>

          {/* 스텝 1: 이름 + 병원명 */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label
                  className="block text-slate-400 text-sm mb-1.5"
                  htmlFor="name"
                >
                  원장님 성함 <span className="text-red-400">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="홍길동"
                  className="w-full bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors text-sm"
                />
              </div>
              <div>
                <label
                  className="block text-slate-400 text-sm mb-1.5"
                  htmlFor="hospital"
                >
                  병원명 <span className="text-red-400">*</span>
                </label>
                <input
                  id="hospital"
                  name="hospital"
                  type="text"
                  required
                  value={form.hospital}
                  onChange={handleChange}
                  placeholder="OO동물병원"
                  className="w-full bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors text-sm"
                />
              </div>
              <button
                type="button"
                onClick={handleNext}
                disabled={!form.name.trim() || !form.hospital.trim()}
                className="w-full bg-blue-500 hover:bg-blue-400 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl text-base transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/30"
              >
                다음
              </button>
            </div>
          )}

          {/* 스텝 2: 연락처 + 고민 */}
          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  className="block text-slate-400 text-sm mb-1.5"
                  htmlFor="phone"
                >
                  연락처 <span className="text-red-400">*</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="010-0000-0000"
                  className={`w-full bg-slate-900/50 border rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none transition-colors text-sm ${
                    phoneError
                      ? "border-red-400 focus:border-red-400"
                      : "border-slate-600 focus:border-blue-500"
                  }`}
                />
                {phoneError && (
                  <p className="text-red-400 text-xs mt-1">{phoneError}</p>
                )}
              </div>

              <div>
                <label
                  className="block text-slate-400 text-sm mb-1.5"
                  htmlFor="concern"
                >
                  현재 가장 큰 매출 고민
                </label>
                <textarea
                  id="concern"
                  name="concern"
                  rows={4}
                  value={form.concern}
                  onChange={handleChange}
                  placeholder="예: 블로그를 운영하고 있는데 예약으로 연결이 안 됩니다..."
                  className="w-full bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors text-sm resize-none"
                />
              </div>

              {status === "error" && (
                <p className="text-red-400 text-sm text-center">
                  오류가 발생했습니다. 다시 시도해주세요.
                </p>
              )}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="flex-1 border border-slate-600 hover:border-slate-400 text-slate-300 hover:text-white font-bold py-4 rounded-xl text-base transition-all duration-200"
                >
                  이전
                </button>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="flex-[2] bg-blue-500 hover:bg-blue-400 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl text-base transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/30"
                >
                  {status === "loading" ? "신청 중..." : "무료 브랜딩 진단 신청하기"}
                </button>
              </div>

              <p className="text-slate-500 text-xs text-center">
                최대한 빠르게 회신드리겠습니다
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
