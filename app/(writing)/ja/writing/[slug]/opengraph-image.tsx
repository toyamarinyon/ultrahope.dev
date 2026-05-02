import {
	getWritingArticleOgImage,
	writingArticleOgImageAlt,
	writingArticleOgImageSize,
} from "../../../ui/article-social";

export const alt = writingArticleOgImageAlt;
export const size = writingArticleOgImageSize;
export const contentType = "image/png";

type WritingOgImagePageProps = {
	params: Promise<{ slug: string }>;
};

export default async function Image({ params }: WritingOgImagePageProps) {
	const { slug } = await params;
	return getWritingArticleOgImage({ slug, locale: "ja" });
}
