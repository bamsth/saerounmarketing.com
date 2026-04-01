import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllSlugs, getPostBySlug } from "@/lib/posts";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.title} | 새로운마케팅`,
    description: post.description,
    keywords: post.keywords.join(", "),
    alternates: {
      canonical: `https://saerounmarketing.com/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://saerounmarketing.com/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      authors: ["김범수"],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: "김범수",
      jobTitle: "수의사",
      url: "https://saerounmarketing.com/about",
    },
    publisher: {
      "@type": "Organization",
      name: "새로운마케팅",
      url: "https://saerounmarketing.com",
    },
    mainEntityOfPage: `https://saerounmarketing.com/blog/${post.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <main className="min-h-screen bg-slate-950 pt-16">
        <article className="max-w-3xl mx-auto px-6 py-12">
          {/* 뒤로가기 */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-slate-400 hover:text-white text-sm mb-8 transition-colors"
          >
            ← 블로그 목록
          </Link>

          {/* 메타 */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-slate-500 text-sm">
              {post.readingTime}분 읽기
            </span>
          </div>

          {/* 제목 */}
          <h1 className="text-2xl md:text-3xl font-black text-white leading-tight mb-6">
            {post.title}
          </h1>

          {/* 저자 박스 */}
          <div className="flex items-center gap-4 p-4 bg-slate-900 border border-slate-800 rounded-xl mb-10">
            <Image
              src="/profile.png"
              alt="김범수 수의사"
              width={48}
              height={48}
              className="rounded-full object-cover flex-shrink-0"
            />
            <div>
              <p className="text-white font-semibold text-sm">
                김범수 수의사
              </p>
              <p className="text-slate-400 text-xs">
                새로운마케팅 대표 · 수의사 면허 보유 · 동물병원 전문 마케팅
              </p>
            </div>
          </div>

          {/* 본문 */}
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* CTA */}
          <div className="mt-12 p-6 bg-blue-600/10 border border-blue-500/30 rounded-2xl text-center">
            <p className="text-white font-bold mb-2">
              우리 병원에 맞는 마케팅 전략이 궁금하신가요?
            </p>
            <p className="text-slate-400 text-sm mb-4">
              수의사가 직접 병원 현황을 분석하고 전략을 제안합니다.
            </p>
            <Link
              href="/#contact"
              className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-3 rounded-xl transition-colors"
            >
              무료 상담 신청하기
            </Link>
          </div>

          {/* 저자 박스 하단 */}
          <div className="mt-10 pt-8 border-t border-slate-800 flex items-start gap-4">
            <Image
              src="/profile.png"
              alt="김범수 수의사"
              width={56}
              height={56}
              className="rounded-full object-cover flex-shrink-0"
            />
            <div>
              <p className="text-white font-bold">김범수</p>
              <p className="text-blue-400 text-sm">수의사 · 새로운마케팅 대표</p>
              <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                수의사 면허를 보유한 대한민국 유일의 동물병원 전문 마케팅
                에이전시 대표. 수의학적 전문성을 보호자의 언어로 번역하는
                마케팅을 연구합니다.
              </p>
            </div>
          </div>
        </article>
      </main>
    </>
  );
}
