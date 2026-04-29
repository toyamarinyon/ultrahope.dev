"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import {
	getLocaleFromPathname,
	type Locale,
	localizedPath,
	withoutLocalePrefix,
} from "@/lib/i18n";

type WritingSidebarArticle = {
	slug: string;
	title: string;
	publishedAt: string;
};

function SidebarLink(props: {
	href: string;
	active: boolean;
	children: ReactNode;
}) {
	return (
		<Link
			href={props.href}
			className={`flex w-full min-w-0 items-center rounded-md px-2 py-1 transition-colors duration-200 hover:bg-highlight-med hover:text-rose focus-visible:text-rose ${props.active ? "bg-highlight-med text-rose" : ""}`}
			aria-current={props.active ? "page" : undefined}
		>
			<span className="truncate">{props.children}</span>
		</Link>
	);
}

type WritingListClientProps = {
	articlesByLocale: Record<Locale, WritingSidebarArticle[]>;
};

export function WritingListClient({
	articlesByLocale,
}: WritingListClientProps) {
	const pathname = usePathname();
	const locale = getLocaleFromPathname(pathname);
	const pathnameWithoutLocale = withoutLocalePrefix(pathname);
	const activeWritingSlug = pathnameWithoutLocale.startsWith("/writing/")
		? pathnameWithoutLocale.split("/")[2]
		: null;

	const articles = articlesByLocale[locale] ?? [];

	return (
		<section className="grid min-w-0 gap-1">
			<p className="px-2 text-muted">Writing</p>
			<div className="grid gap-0.5">
				{articles.map((article) => (
					<SidebarLink
						key={`${article.slug}:${locale}`}
						href={localizedPath(locale, `/writing/${article.slug}`)}
						active={activeWritingSlug === article.slug}
					>
						{article.title}
					</SidebarLink>
				))}
			</div>
		</section>
	);
}
