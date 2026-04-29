import type { Metadata } from "next";
import { getWritingSlugs } from "../../lib/writing";
import {
	getWritingArticleMetadata,
	WritingArticlePage,
} from "../../ui/component";

export function generateStaticParams() {
	return getWritingSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
	params,
}: PageProps<"/writing/[slug]">): Promise<Metadata> {
	const { slug } = await params;
	return getWritingArticleMetadata({ slug, locale: "en" });
}

export default async function Page({ params }: PageProps<"/writing/[slug]">) {
	const { slug } = await params;
	return <WritingArticlePage slug={slug} locale="en" />;
}
