"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
	getLocaleFromPathname,
	localizedPath,
	withoutLocalePrefix,
} from "@/lib/i18n";
import { UltrahopeLogo } from "../ultrahope-logo";

export function HomeLink() {
	const pathname = usePathname();
	const locale = getLocaleFromPathname(pathname);
	const pathnameWithoutLocale = withoutLocalePrefix(pathname);

	return (
		<Link
			href={localizedPath(locale)}
			className="flex items-center gap-2 text-rose"
			aria-current={pathnameWithoutLocale === "/" ? "page" : undefined}
		>
			<UltrahopeLogo className="size-8 shrink-0" />
			<span className="font-sans text-xl font-medium leading-none tracking-tighter">
				Ultrahope
			</span>
		</Link>
	);
}
