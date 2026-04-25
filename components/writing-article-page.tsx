import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PillLink, PostHero } from "@/components/editorial";
import { MarkdownRenderer } from "@/components/markdown-renderer";
import { type Locale, localizedPath } from "@/lib/i18n";
import {
	formatWritingDate,
	getWritingArticle,
	hasWritingLocale,
} from "@/lib/writing";

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

function writingHref(slug: string, locale: Locale) {
	return localizedPath(locale, `/writing/${slug}`);
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

	const hasEnglish = hasWritingLocale(slug, "en");
	const hasJapanese = hasWritingLocale(slug, "ja");
	const bodyMarkdown = stripLeadingDuplicateH1(article.content, article.title);

	return (
		<main className="max-w-220 mx-auto mt-20 px-20">
			<PostHero
				eyebrow="Writing"
				title={article.title}
				intro={article.description}
				meta={[
					{
						label: "Language",
						value: locale === "en" ? "English" : "日本語",
					},
					{
						label: "Published",
						value: formatWritingDate(article.publishedAt, locale),
					},
				]}
			/>

			<div className="mb-5.5 flex gap-2.5">
				{hasJapanese ? (
					<Link href={writingHref(slug, "ja")}>
						<PillLink active={locale === "ja"}>日本語</PillLink>
					</Link>
				) : null}
				{hasEnglish ? (
					<Link href={writingHref(slug, "en")}>
						<PillLink active={locale === "en"}>English</PillLink>
					</Link>
				) : null}
			</div>

			<MarkdownRenderer markdown={bodyMarkdown} className="max-w-190" />
		</main>
	);
}
