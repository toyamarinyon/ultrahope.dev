import type { Locale } from "@/lib/i18n";
import { renderScrollFadeExamplesMarkdown } from "./scroll-fade-examples";
import {
	getWritingArticle,
	getWritingSidebarArticlesByLocale,
	getWritingSlugs,
	hasWritingLocale,
	type WritingArticle,
} from "./writing";

const markdownResponseHeaders = {
	"Content-Type": "text/markdown; charset=utf-8",
	Vary: "Accept",
};

function getCanonicalPath(locale: Locale, slug: string) {
	if (locale === "ja") {
		return `/ja/writing/${slug}`;
	}

	return `/writing/${slug}`;
}

function toFrontmatterLine(key: string, value: string) {
	const escaped = value.replaceAll("\\", "\\\\").replaceAll('"', '\\"');
	return `${key}: "${escaped}"`;
}

export function getMarkdownResponseHeaders() {
	return markdownResponseHeaders;
}

export function getWritingMarkdown(slug: string, locale: Locale) {
	const article = getWritingArticle(slug, locale);
	if (!article) {
		return undefined;
	}

	return renderWritingMarkdown(article);
}

export function getWritingMarkdownStaticParams(locale: Locale) {
	return getWritingSlugs()
		.filter((slug) => hasWritingLocale(slug, locale))
		.map((slug) => ({ slug }));
}

function renderWritingMarkdown(article: WritingArticle) {
	const canonicalPath = getCanonicalPath(article.locale, article.slug);
	const frontmatterLines = ["---", toFrontmatterLine("title", article.title)];

	if (article.description) {
		frontmatterLines.push(
			toFrontmatterLine("description", article.description),
		);
	}

	frontmatterLines.push(
		toFrontmatterLine("publishedAt", article.publishedAt),
		toFrontmatterLine("canonical_path", canonicalPath),
		"---",
		"",
	);

	const markdownBody = renderMarkdownBodyForAgents(article).trim();
	return `${frontmatterLines.join("\n")}${markdownBody}\n`;
}

function renderMarkdownBodyForAgents(article: WritingArticle) {
	if (article.format !== "mdx") {
		return article.content;
	}

	return article.content.replace(
		/^<ScrollFadeExamples\s*\/>\s*$/gm,
		renderScrollFadeExamplesMarkdown,
	);
}

export function getWritingSitemapMarkdown(locale: Locale) {
	const articles = getWritingSidebarArticlesByLocale()[locale];
	const heading = locale === "ja" ? "# 記事一覧" : "# Writing Sitemap";
	const lines = [heading, ""];

	for (const article of articles) {
		const path = getCanonicalPath(locale, article.slug);
		lines.push(`- [${article.title}](${path}) - ${article.publishedAt}`);
	}

	lines.push("");
	return lines.join("\n");
}
