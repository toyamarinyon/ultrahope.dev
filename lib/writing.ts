import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { cache } from "react";
import { z } from "zod";

const WRITING_DIR = path.join(process.cwd(), "writing");
const ENGLISH_SUFFIX = ".en.md";
const MARKDOWN_SUFFIX = ".md";
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function isValidUtcCalendarDate(value: string) {
  const parsed = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) {
    return false;
  }

  return parsed.toISOString().slice(0, 10) === value;
}

const WritingFrontmatterSchema = z
  .object({
    title: z.string().trim().min(1, "title is required"),
    description: z.string().trim().min(1).optional(),
    publishedAt: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "publishedAt must be YYYY-MM-DD")
      .refine(
        (value) => isValidUtcCalendarDate(value),
        "publishedAt must be a real UTC calendar date",
      ),
    draft: z.boolean().optional(),
  })
  .strict();

export type WritingFrontmatter = z.infer<typeof WritingFrontmatterSchema>;
export type WritingLocale = "ja" | "en";

export interface WritingArticle extends WritingFrontmatter {
  slug: string;
  locale: WritingLocale;
  content: string;
}

interface ParseFilenameResult {
  slug: string;
  locale: WritingLocale;
}

function ensureValidSlug(slug: string, fileName: string) {
  if (!SLUG_PATTERN.test(slug)) {
    throw new Error(
      `Invalid writing filename "${fileName}". Slug must match ${SLUG_PATTERN.toString()}.`,
    );
  }
}

function parseFilename(fileName: string): ParseFilenameResult {
  if (fileName.endsWith(ENGLISH_SUFFIX)) {
    const slug = fileName.slice(0, -ENGLISH_SUFFIX.length);
    ensureValidSlug(slug, fileName);
    return { slug, locale: "en" };
  }

  if (fileName.endsWith(MARKDOWN_SUFFIX)) {
    const slug = fileName.slice(0, -MARKDOWN_SUFFIX.length);
    ensureValidSlug(slug, fileName);
    return { slug, locale: "ja" };
  }

  throw new Error(`Unsupported writing filename "${fileName}".`);
}

const loadAllWritingArticles = cache((): WritingArticle[] => {
  const files = readdirSync(WRITING_DIR)
    .filter((entry) => entry.endsWith(MARKDOWN_SUFFIX))
    .sort((a, b) => a.localeCompare(b));

  return files.map((fileName) => {
    const { slug, locale } = parseFilename(fileName);
    const filePath = path.join(WRITING_DIR, fileName);
    const source = readFileSync(filePath, "utf8");
    const { content, data } = matter(source);
    const frontmatterResult = WritingFrontmatterSchema.safeParse(data);

    if (!frontmatterResult.success) {
      const issues = frontmatterResult.error.issues
        .map((issue) => `${issue.path.join(".") || "(root)"}: ${issue.message}`)
        .join("; ");
      throw new Error(`Invalid frontmatter in "${fileName}": ${issues}`);
    }

    return {
      ...frontmatterResult.data,
      slug,
      locale,
      content,
    };
  });
});

export function parseWritingLocale(
  input: string | string[] | undefined,
): WritingLocale {
  if (Array.isArray(input)) {
    return input.includes("en") ? "en" : "ja";
  }
  return input === "en" ? "en" : "ja";
}

export function getWritingSlugs() {
  const articles = loadAllWritingArticles().filter((article) => !article.draft);
  const uniqueSlugs = new Set(articles.map((article) => article.slug));
  return [...uniqueSlugs].sort((a, b) => a.localeCompare(b));
}

export function hasWritingLocale(slug: string, locale: WritingLocale) {
  return loadAllWritingArticles().some(
    (article) =>
      article.slug === slug && article.locale === locale && !article.draft,
  );
}

export function getWritingArticle(
  slug: string,
  locale: WritingLocale,
): WritingArticle | undefined {
  const matches = loadAllWritingArticles().filter(
    (article) => article.slug === slug && !article.draft,
  );
  if (matches.length === 0) {
    return undefined;
  }

  return (
    matches.find((article) => article.locale === locale) ??
    matches.find((article) => article.locale === "ja") ??
    matches[0]
  );
}

export function formatWritingDate(date: string, locale: WritingLocale) {
  return new Intl.DateTimeFormat(locale === "en" ? "en-US" : "ja-JP", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}
