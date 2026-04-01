import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "동물병원 마케팅 블로그 | 새로운마케팅",
  description:
    "수의사가 직접 쓰는 동물병원 마케팅 실전 가이드. 네이버 플레이스 최적화, 블로그 마케팅, 광고비 전략까지 동물병원 원장님을 위한 마케팅 인사이트.",
  alternates: {
    canonical: "https://saerounmarketing.com/blog",
  },
  openGraph: {
    title: "동물병원 마케팅 블로그 | 새로운마케팅",
    description: "수의사가 직접 쓰는 동물병원 마케팅 실전 가이드.",
    url: "https://saerounmarketing.com/blog",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="min-h-screen bg-white pt-16">
      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* 섹션 헤더 */}
        <div className="mb-12">
          <p className="text-blue-600 text-sm font-semibold mb-2">BLOG</p>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900">
            동물병원 마케팅 인사이트
          </h1>
          <p className="text-slate-600 mt-3">
            수의사가 직접 쓰는 실전 마케팅 가이드
          </p>
        </div>

        {/* 포스트 그리드 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block bg-white border border-slate-200 shadow-sm hover:border-blue-400 hover:shadow-md rounded-2xl p-6 transition-all duration-200 hover:-translate-y-1"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-slate-400 text-xs">
                  {post.readingTime}분 읽기
                </span>
              </div>
              <h2 className="text-slate-900 font-bold text-base leading-snug mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                {post.title}
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                {post.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {post.keywords.slice(0, 2).map((kw) => (
                  <span
                    key={kw}
                    className="text-xs text-blue-600/80 bg-blue-50 px-2 py-0.5 rounded-full"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center border-t border-slate-200 pt-12">
          <p className="text-slate-600 mb-4">
            우리 병원에 맞는 마케팅 전략이 궁금하신가요?
          </p>
          <Link
            href="/#contact"
            className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-xl transition-colors"
          >
            무료 상담 신청하기
          </Link>
        </div>
      </div>
    </main>
  );
}
