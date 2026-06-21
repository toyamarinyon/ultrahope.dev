import type { Metadata } from "next";
import { getWritingStaticParams } from "../../lib/writing";
import { getWritingArticleSocialMetadata } from "../../ui/article-social";
import { WritingArticlePage } from "../../ui/component";

export function generateStaticParams() {
	return getWritingStaticParams("en");
}

export async function generateMetadata({
	params,
}: PageProps<"/writing/[slug]">): Promise<Metadata> {
	const { slug } = await params;
	return getWritingArticleSocialMetadata({ slug, locale: "en" });
}

export default async function Page({ params }: PageProps<"/writing/[slug]">) {
	const { slug } = await params;
	return <WritingArticlePage slug={slug} locale="en" />;
}
