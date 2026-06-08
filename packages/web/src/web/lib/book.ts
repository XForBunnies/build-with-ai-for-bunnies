import bookIndex from "../book-index.json";

export interface ChapterMeta {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  chapterLabel?: string;
  chapterNum: number | null;
  part: number;
  partTitle: string;
}

export interface Chapter extends ChapterMeta {
  content: string;
}

export const chapterIndex: ChapterMeta[] = bookIndex as ChapterMeta[];

export const parts = [
  { num: 1, title: "What Even Is AI?", color: "#5a9e4a" },
  { num: 2, title: "Tools of the Trade", color: "#d4a853" },
  { num: 3, title: "Building Your First App", color: "#e07830" },
  { num: 4, title: "Deploying & Scaling", color: "#5878d8" },
  { num: 5, title: "Where Do You Go From Here?", color: "#9858c8" },
];

export const partChapters = parts.map(p => ({
  ...p,
  chapters: chapterIndex.filter(c => c.part === p.num),
}));

export function getMetaBySlug(slug: string): ChapterMeta | undefined {
  return chapterIndex.find(c => c.slug === slug);
}

// Fetch a single chapter's content on demand
const cache = new Map<string, string>();

export async function fetchChapterContent(slug: string): Promise<string> {
  if (cache.has(slug)) return cache.get(slug)!;
  const res = await fetch(`/book/${slug}.json`);
  if (!res.ok) throw new Error(`Failed to load chapter: ${slug}`);
  const data = await res.json();
  cache.set(slug, data.content);
  return data.content;
}

// Reading order
const READING_ORDER = [
  "foreword",
  "introduction",
  ...Array.from({ length: 20 }, (_, i) => `chapter-${String(i + 1).padStart(2, "0")}`),
  "glossary",
  "cheatsheet",
  "about-the-author",
];

export function getNextMeta(slug: string): ChapterMeta | undefined {
  const idx = READING_ORDER.indexOf(slug);
  if (idx === -1 || idx === READING_ORDER.length - 1) return undefined;
  return chapterIndex.find(c => c.slug === READING_ORDER[idx + 1]);
}

export function getPrevMeta(slug: string): ChapterMeta | undefined {
  const idx = READING_ORDER.indexOf(slug);
  if (idx <= 0) return undefined;
  return chapterIndex.find(c => c.slug === READING_ORDER[idx - 1]);
}
