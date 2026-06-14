"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
	getLocaleFromPathname,
	localizedPath,
	withoutLocalePrefix,
} from "@/lib/i18n";

export function BaselineLink() {
	const pathname = usePathname();
	const locale = getLocaleFromPathname(pathname);
	const pathnameWithoutLocale = withoutLocalePrefix(pathname);
	const active = pathnameWithoutLocale === "/baseline";

	return (
		<section className="mb-6">
			<Link
				href={localizedPath(locale, "/baseline")}
				className={`flex w-full min-w-0 items-center rounded-md px-2.5 py-1.5 transition-colors duration-200 hover:bg-highlight-med hover:text-rose focus-visible:text-rose ${active ? "bg-highlight-med text-rose" : ""}`}
				aria-current={active ? "page" : undefined}
			>
				<span className="truncate">Baseline</span>
			</Link>
		</section>
	);
}
