import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

const postsDirectory = path.join(process.cwd(), "src/_posts");

export interface PostMeta {
  title: string;
  description: string;
  date: string;
  keywords: string[];
  slug: string;
  readingTime: number;
}

export interface Post extends PostMeta {
  content: string;
}

function calcReadingTime(text: string): number {
  const wordsPerMinute = 500; // 한국어 기준
  const words = text.replace(/<[^>]+>/g, "").length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

export function getAllPosts(): PostMeta[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames
    .filter((f) => f.endsWith(".md"))
    .map((fileName) => {
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);
      return {
        title: data.title as string,
        description: data.description as string,
        date: data.date as string,
        keywords: (data.keywords as string[]) || [],
        slug: data.slug as string,
        readingTime: calcReadingTime(content),
      };
    });

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const fileNames = fs.readdirSync(postsDirectory);
  const fileName = fileNames.find((f) => {
    const fullPath = path.join(postsDirectory, f);
    const { data } = matter(fs.readFileSync(fullPath, "utf8"));
    return data.slug === slug;
  });

  if (!fileName) return null;

  const fullPath = path.join(postsDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const processedContent = await remark()
    .use(remarkHtml as any) // eslint-disable-line @typescript-eslint/no-explicit-any
    .process(content);

  return {
    title: data.title as string,
    description: data.description as string,
    date: data.date as string,
    keywords: (data.keywords as string[]) || [],
    slug: data.slug as string,
    content: processedContent.toString(),
    readingTime: calcReadingTime(content),
  };
}

export function getAllSlugs(): string[] {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((f) => f.endsWith(".md"))
    .map((fileName) => {
      const fullPath = path.join(postsDirectory, fileName);
      const { data } = matter(fs.readFileSync(fullPath, "utf8"));
      return data.slug as string;
    });
}
