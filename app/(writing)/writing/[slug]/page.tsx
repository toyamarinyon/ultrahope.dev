import type { Metadata } from "next";
import { getWritingSlugs } from "../../lib/writing";
import {
	getWritingArticleMetadata,
	WritingArticlePage,
} from "../../ui/component";

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
	return getWritingArticleMetadata({ slug, locale: "en" });
}

export default async function Page({ params }: WritingPageProps) {
	const { slug } = await params;
	return <WritingArticlePage slug={slug} locale="en" />;
}
