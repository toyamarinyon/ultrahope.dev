"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { posts } from "@/lib/content";
import { UltrahopeLogo } from "./ultrahope-logo";

function SidebarLink(props: {
	href: string;
	active: boolean;
	children: ReactNode;
}) {
	return (
		<Link
			href={props.href}
			className={`flex w-full items-center rounded-md px-2 py-1 transition-[background-color,color] duration-200 hover:bg-highlight-med hover:text-rose focus-visible:text-rose ${props.active ? "bg-highlight-med text-rose" : ""}`}
			aria-current={props.active ? "page" : undefined}
		>
			{props.children}
		</Link>
	);
}

export function AppShell(props: { children: ReactNode }) {
	const pathname = usePathname();
	const activePostSlug = pathname?.startsWith("/posts/")
		? pathname.split("/")[2]
		: null;
	const activeWritingSlug = pathname?.startsWith("/writing/")
		? pathname.split("/")[2]
		: null;
	const recentPosts = posts.slice(0, 2);
	const categorizedPosts = posts
		.slice(2)
		.reduce<Record<string, typeof posts>>((groups, post) => {
			groups[post.category] ??= [];
			groups[post.category].push(post);
			return groups;
		}, {});

	return (
		<div className="min-h-screen">
			<div className="relative mx-auto min-h-screen w-full overflow-hidden">
				<aside className="fixed w-[240] top-0 bottom-0 border-r border-highlight-med p-2">
					<section className="flex h-14.5 items-center mb-8 pl-2">
						<Link
							href="/"
							className="flex items-center text-rose gap-2"
							aria-current={pathname === "/" ? "page" : undefined}
						>
							<UltrahopeLogo className="size-8 shrink-0" />
							<span className="font-sans text-[20px] font-medium leading-none tracking-[-0.04em]">
								Ultrahope
							</span>
						</Link>
					</section>

					<div className="grid gap-6">
						<section className="grid gap-1">
							<p className="text-muted px-2">Writing</p>
							<div className="grid gap-0.5">
								<SidebarLink
									href="/writing/hermes-agent-mise"
									active={activeWritingSlug === "hermes-agent-mise"}
								>
									Hermes Agent + mise + venv
								</SidebarLink>
							</div>
						</section>
					</div>
				</aside>

				<section className="flex min-w-0 flex-col ml-[240]">
					{props.children}
				</section>
			</div>
		</div>
	);
}
