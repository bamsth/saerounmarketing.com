import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 py-10">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-black text-white text-lg">새로운마케팅</p>
            <p className="text-slate-500 text-sm">
              수의사가 직접 운영하는 동물병원 전문 마케팅 에이전시
            </p>
          </div>
          <div className="text-center md:text-right">
            <p className="text-slate-500 text-xs">
              Veterinary Marketing · Branding Strategy · Content Creation
            </p>
            <p className="text-slate-600 text-xs mt-1">
              © 2025 – 2026 새로운마케팅. All Rights Reserved.
            </p>
            <div className="flex items-center justify-center md:justify-end gap-4 mt-2">
              <Link
                href="/about"
                className="text-slate-600 hover:text-slate-400 text-xs transition-colors"
              >
                대표 소개
              </Link>
              <span className="text-slate-700 text-xs">·</span>
              <Link
                href="/privacy"
                className="text-slate-600 hover:text-slate-400 text-xs transition-colors"
              >
                개인정보처리방침
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
