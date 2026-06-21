import type { Metadata } from "next";
import { getWritingStaticParams } from "../../../lib/writing";
import { getWritingArticleSocialMetadata } from "../../../ui/article-social";
import { WritingArticlePage } from "../../../ui/component";

type WritingPageProps = {
	params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
	return getWritingStaticParams("ja");
}

export async function generateMetadata({
	params,
}: WritingPageProps): Promise<Metadata> {
	const { slug } = await params;
	return getWritingArticleSocialMetadata({ slug, locale: "ja" });
}

export default async function Page({ params }: WritingPageProps) {
	const { slug } = await params;
	return <WritingArticlePage slug={slug} locale="ja" />;
}
