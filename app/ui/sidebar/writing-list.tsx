"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import {
	getLocaleFromPathname,
	localizedPath,
	withoutLocalePrefix,
} from "@/lib/i18n";

function SidebarLink(props: {
	href: string;
	active: boolean;
	children: ReactNode;
}) {
	return (
		<Link
			href={props.href}
			className={`flex w-full items-center rounded-md px-2 py-1 transition-colors duration-200 hover:bg-highlight-med hover:text-rose focus-visible:text-rose ${props.active ? "bg-highlight-med text-rose" : ""}`}
			aria-current={props.active ? "page" : undefined}
		>
			{props.children}
		</Link>
	);
}

export function WritingList() {
	const pathname = usePathname();
	const locale = getLocaleFromPathname(pathname);
	const pathnameWithoutLocale = withoutLocalePrefix(pathname);
	const activeWritingSlug = pathnameWithoutLocale.startsWith("/writing/")
		? pathnameWithoutLocale.split("/")[2]
		: null;

	return (
		<section className="grid gap-1">
			<p className="text-muted px-2">Writing</p>
			<div className="grid gap-0.5">
				<SidebarLink
					href={localizedPath(locale, "/writing/hermes-agent-mise")}
					active={activeWritingSlug === "hermes-agent-mise"}
				>
					Hermes Agent + mise + venv
				</SidebarLink>
			</div>
		</section>
	);
}
