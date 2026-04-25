import type { Metadata } from "next";
import {
	getWritingArticleMetadata,
	WritingArticlePage,
} from "@/components/writing-article-page";
import { getWritingSlugs } from "@/lib/writing";

type WritingPageProps = {
	params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
	return getWritingSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
	params,
}: WritingPageProps): Promise<Metadata> {
	const { slug } = await params;
	return getWritingArticleMetadata({ slug, locale: "ja" });
}

export default async function Page({ params }: WritingPageProps) {
	const { slug } = await params;
	return <WritingArticlePage slug={slug} locale="ja" />;
}
