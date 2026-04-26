"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import {
	getLocaleFromPathname,
	localizedPath,
	withoutLocalePrefix,
} from "@/lib/i18n";
import { LanguageSwitcher } from "./language-switcher";
import { UltrahopeLogo } from "./ultrahope-logo";

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

export function AppShell(props: { children: ReactNode }) {
	const pathname = usePathname();
	const locale = getLocaleFromPathname(pathname);
	const pathnameWithoutLocale = withoutLocalePrefix(pathname);
	const activeWritingSlug = pathnameWithoutLocale.startsWith("/writing/")
		? pathnameWithoutLocale.split("/")[2]
		: null;

	return (
		<div className="min-h-screen">
			<div className="relative mx-auto min-h-screen w-full overflow-hidden">
				<aside className="fixed w-60 top-0 bottom-0 flex flex-col border-r border-highlight-med p-2">
					<div className="min-h-0 flex-1">
						<section className="flex h-14.5 items-center mb-8 pl-2">
							<Link
								href={localizedPath(locale)}
								className="flex items-center text-rose gap-2"
								aria-current={
									pathnameWithoutLocale === "/" ? "page" : undefined
								}
							>
								<UltrahopeLogo className="size-8 shrink-0" />
								<span className="font-sans text-xl font-medium leading-none tracking-tighter">
									Ultrahope
								</span>
							</Link>
						</section>

						<div className="grid gap-6">
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
						</div>
					</div>

					<div className="pb-2">
						<LanguageSwitcher />
					</div>
				</aside>

				<main className="flex min-w-0 flex-col ml-60">{props.children}</main>
			</div>
		</div>
	);
}
