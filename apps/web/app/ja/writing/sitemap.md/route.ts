import {
	getMarkdownResponseHeaders,
	getWritingSitemapMarkdown,
} from "@/app/(writing)/lib/writing-markdown";

const headers = getMarkdownResponseHeaders();

export const dynamic = "force-static";

export function GET() {
	return new Response(getWritingSitemapMarkdown("ja"), {
		headers,
	});
}
