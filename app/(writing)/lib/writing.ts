import type { Dirent } from "node:fs";
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";
import type { Locale } from "@/lib/i18n";

const WRITING_DIR = path.join(process.cwd(), "writing");
const MARKDOWN_SUFFIX = ".md";
const ENGLISH_FILE = "en.md";
const JAPANESE_FILE = "ja.md";
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
export type WritingLocale = Locale;

export interface WritingArticle extends WritingFrontmatter {
	slug: string;
	locale: WritingLocale;
	content: string;
}

export interface WritingSidebarArticle {
	slug: string;
	title: string;
	publishedAt: string;
}

interface ArticleSource {
	slug: string;
	locale: WritingLocale;
	fileName: string;
	filePath: string;
}

function ensureValidSlug(slug: string, fileName: string) {
	if (!SLUG_PATTERN.test(slug)) {
		throw new Error(
			`Invalid writing filename "${fileName}". Slug must match ${SLUG_PATTERN.toString()}.`,
		);
	}
}

function parseDirectoryLocaleFileName(
	fileName: string,
	directoryName: string,
): WritingLocale {
	if (fileName === ENGLISH_FILE) {
		return "en" as const;
	}

	if (fileName === JAPANESE_FILE) {
		return "ja" as const;
	}

	throw new Error(
		`Unsupported locale file "${directoryName}/${fileName}". Use "${ENGLISH_FILE}" or "${JAPANESE_FILE}".`,
	);
}

function collectDirectoryArticleSources(entry: Dirent): ArticleSource[] {
	if (!entry.isDirectory()) {
		return [] as ArticleSource[];
	}

	ensureValidSlug(entry.name, entry.name);
	const directoryPath = path.join(WRITING_DIR, entry.name);
	const markdownFiles = readdirSync(directoryPath)
		.filter((fileName) => fileName.endsWith(MARKDOWN_SUFFIX))
		.sort((a, b) => a.localeCompare(b));

	return markdownFiles.map((fileName) => ({
		slug: entry.name,
		locale: parseDirectoryLocaleFileName(fileName, entry.name),
		fileName: `${entry.name}/${fileName}`,
		filePath: path.join(directoryPath, fileName),
	}));
}

function collectArticleSources(): ArticleSource[] {
	const entries = readdirSync(WRITING_DIR, { withFileTypes: true }).sort(
		(a, b) => a.name.localeCompare(b.name),
	);
	const sources: ArticleSource[] = [];

	for (const entry of entries) {
		if (entry.isFile() && entry.name.endsWith(MARKDOWN_SUFFIX)) {
			throw new Error(
				`Unsupported top-level writing file "${entry.name}". Use "writing/<slug>/${ENGLISH_FILE}" or "writing/<slug>/${JAPANESE_FILE}".`,
			);
		}

		sources.push(...collectDirectoryArticleSources(entry));
	}

	const sourceBySlugAndLocale = new Map<string, string>();
	for (const source of sources) {
		const key = `${source.slug}:${source.locale}`;
		const existing = sourceBySlugAndLocale.get(key);
		if (existing) {
			throw new Error(
				`Duplicate writing article for "${key}" found in "${existing}" and "${source.fileName}".`,
			);
		}
		sourceBySlugAndLocale.set(key, source.fileName);
	}

	return sources;
}

function loadAllWritingArticles(): WritingArticle[] {
	const sources = collectArticleSources();

	return sources.map(({ slug, locale, fileName, filePath }) => {
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
}

export function getWritingSlugs() {
	const articles = loadAllWritingArticles().filter((article) => !article.draft);
	const uniqueSlugs = new Set(articles.map((article) => article.slug));
	return [...uniqueSlugs].sort((a, b) => a.localeCompare(b));
}

export function getWritingSidebarArticlesByLocale(): Record<
	WritingLocale,
	WritingSidebarArticle[]
> {
	const publishedArticles = loadAllWritingArticles().filter(
		(article) => !article.draft,
	);

	const byLocale: Record<WritingLocale, WritingSidebarArticle[]> = {
		en: [],
		ja: [],
	};

	for (const article of publishedArticles) {
		byLocale[article.locale].push({
			slug: article.slug,
			title: article.title,
			publishedAt: article.publishedAt,
		});
	}

	for (const locale of Object.keys(byLocale) as WritingLocale[]) {
		byLocale[locale].sort((a, b) => {
			if (a.publishedAt !== b.publishedAt) {
				return b.publishedAt.localeCompare(a.publishedAt);
			}

			return a.slug.localeCompare(b.slug);
		});
	}

	return byLocale;
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
	return loadAllWritingArticles().find(
		(article) =>
			article.slug === slug && article.locale === locale && !article.draft,
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
