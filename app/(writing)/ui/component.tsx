import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { type Locale } from "@/lib/i18n";
import { formatWritingDate, getWritingArticle } from "../lib/writing";
import { MarkdownRenderer } from "./markdown-renderer";

type WritingArticlePageProps = {
	locale: Locale;
	slug: string;
};

function stripLeadingDuplicateH1(markdown: string, title: string) {
	const match = markdown.match(/^(\s*#\s+(.+?)\s*#*\s*\n)/);
	if (!match) {
		return markdown;
	}

	const headingText = match[2]?.trim();
	if (headingText !== title.trim()) {
		return markdown;
	}

	return markdown.slice(match[1].length).replace(/^\s*\n+/, "");
}

export function getWritingArticleMetadata({
	locale,
	slug,
}: WritingArticlePageProps): Metadata {
	const article = getWritingArticle(slug, locale);

	if (!article) {
		notFound();
	}

	return {
		title: article.title,
		description: article.description,
	};
}

export function WritingArticlePage({ locale, slug }: WritingArticlePageProps) {
	const article = getWritingArticle(slug, locale);

	if (!article) {
		notFound();
	}

	const bodyMarkdown = stripLeadingDuplicateH1(article.content, article.title);

	return (
		<main className="mx-auto mt-12 max-w-220 px-4 sm:px-8 md:mt-20 lg:px-20 mb-24">
			<header className="mb-8">
				<h2 className="text-2xl sm:text-3xl">{article.title}</h2>
				<div className="text-muted text-sm">
					<p>
						{formatWritingDate(article.publishedAt, locale)}{" "}
						{locale === "en" ? "Published" : "公開"}
					</p>
				</div>
			</header>
			<MarkdownRenderer markdown={bodyMarkdown} className="max-w-190 min-w-0" />
		</main>
	);
}
