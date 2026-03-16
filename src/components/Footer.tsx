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
          </div>
        </div>
      </div>
    </footer>
  );
}
