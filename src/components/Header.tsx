"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-black text-slate-900 text-lg tracking-tight hover:text-blue-600 transition-colors"
        >
          새로운마케팅
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            href="/blog"
            className="text-slate-500 hover:text-slate-900 text-sm font-medium transition-colors"
          >
            블로그
          </Link>
          <Link
            href="/about"
            className="text-slate-500 hover:text-slate-900 text-sm font-medium transition-colors"
          >
            대표 소개
          </Link>
          <Link
            href="/#contact"
            className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            무료 상담
          </Link>
        </nav>
      </div>
    </header>
  );
}
