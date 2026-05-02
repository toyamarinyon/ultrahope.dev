/* eslint-disable @next/next/no-img-element, standards/no-inline-style-prop */
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ImageResponse } from "next/og";
import { type Locale, localizedPath } from "@/lib/i18n";
import { getWritingArticle, hasWritingLocale } from "../lib/writing";

type WritingArticleSocialProps = {
	slug: string;
	locale: Locale;
};

export const writingArticleOgImageSize = {
	width: 1200,
	height: 630,
};

export const writingArticleOgImageAlt = "Ultrahope Journal article preview";

let logotypeDataUrl: Promise<string> | undefined;

function getWritingArticlePath({ locale, slug }: WritingArticleSocialProps) {
	return localizedPath(locale, `/writing/${slug}`);
}

function getLogotypeDataUrl() {
	logotypeDataUrl ??= readFile(join(process.cwd(), "app/logotype.png")).then(
		(buffer) => `data:image/png;base64,${buffer.toString("base64")}`,
	);

	return logotypeDataUrl;
}

function formatWritingOgDate(date: string) {
	return date.replaceAll("-", "/");
}

export function getWritingArticleSocialMetadata({
	slug,
	locale,
}: WritingArticleSocialProps): Metadata {
	const article = getWritingArticle(slug, locale);

	if (!article) {
		notFound();
	}

	const pathname = getWritingArticlePath({ locale, slug });
	const alternateLanguages: Record<string, string> = {
		en: localizedPath("en", `/writing/${slug}`),
	};

	if (hasWritingLocale(slug, "ja")) {
		alternateLanguages.ja = localizedPath("ja", `/writing/${slug}`);
	}

	return {
		title: article.title,
		description: article.description,
		alternates: {
			canonical: pathname,
			languages: alternateLanguages,
		},
		openGraph: {
			type: "article",
			title: article.title,
			description: article.description,
			url: pathname,
			locale: locale === "ja" ? "ja_JP" : "en_US",
			publishedTime: `${article.publishedAt}T00:00:00.000Z`,
			siteName: "Ultrahope Journal",
		},
		twitter: {
			card: "summary_large_image",
			title: article.title,
			description: article.description,
		},
	};
}

export async function getWritingArticleOgImage({
	slug,
	locale,
}: WritingArticleSocialProps) {
	const article = getWritingArticle(slug, locale);

	if (!article) {
		notFound();
	}

	const logotypeSrc = await getLogotypeDataUrl();

	return new ImageResponse(
		<div
			style={{
				height: "100%",
				width: "100%",
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
				padding: "56px",
				background:
					"linear-gradient(180deg, #0f1115 0%, #090b0f 60%, #06070a 100%)",
				color: "#f7f7f5",
				fontFamily: "sans-serif",
			}}
		>
			<div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						fontSize: 26,
						fontWeight: 600,
						letterSpacing: 0,
						color: "#d7ccc0",
						fontFamily: "sans-serif",
					}}
				>
					<img
						alt="Ultrahope"
						src={logotypeSrc}
						width={170}
						height={60}
						style={{
							display: "flex",
							width: 170,
							height: 60,
							objectFit: "contain",
						}}
					/>
				</div>
				<div
					style={{
						display: "flex",
						fontSize: 68,
						lineHeight: 1.1,
						fontWeight: 700,
						letterSpacing: 0,
						fontFamily: "sans-serif",
						maxWidth: "100%",
						whiteSpace: "pre-wrap",
					}}
				>
					{article.title}
				</div>
			</div>
			<div
				style={{
					display: "flex",
					justifyContent: "flex-end",
					alignItems: "center",
					fontSize: 26,
					color: "#aeb0b8",
				}}
			>
				<div style={{ display: "flex", textAlign: "right" }}>
					{formatWritingOgDate(article.publishedAt)}
				</div>
			</div>
		</div>,
		writingArticleOgImageSize,
	);
}
