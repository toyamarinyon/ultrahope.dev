import {
	getMarkdownResponseHeaders,
	getWritingMarkdown,
	getWritingMarkdownStaticParams,
} from "@/app/(writing)/lib/writing-markdown";

const headers = getMarkdownResponseHeaders();

export function generateStaticParams() {
	return getWritingMarkdownStaticParams("ja");
}

type WritingMarkdownRouteProps = {
	params: Promise<{ slug: string }>;
};

export async function GET(_: Request, { params }: WritingMarkdownRouteProps) {
	const { slug } = await params;
	const markdown = getWritingMarkdown(slug, "ja");

	if (!markdown) {
		return new Response("# Not Found\n", {
			status: 404,
			headers,
		});
	}

	return new Response(markdown, { headers });
}
