import { getWritingSidebarArticlesByLocale } from "@/app/(writing)/lib/writing";
import { WritingListClient } from "./writing-list-client";

export function WritingList() {
	const articlesByLocale = getWritingSidebarArticlesByLocale();

	return <WritingListClient articlesByLocale={articlesByLocale} />;
}
