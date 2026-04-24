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
			className={`flex w-full items-center rounded-md px-2 py-1 text-[0.92rem] text-subtle transition-[background-color,color] duration-200 hover:bg-highlight-med hover:text-rose focus-visible:bg-[rgba(255,255,255,0.02)] focus-visible:text-rose [&_strong]:text-inherit [&_strong]:font-normal [&_strong]:leading-[1.45] ${props.active ? "bg-highlight-med text-rose" : ""}`}
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
							<UltrahopeLogo className="h-7 w-7 shrink-0" />
							<span className="font-sans text-[1.25rem] font-medium leading-none tracking-[-0.04em]">
								Ultrahope
							</span>
						</Link>
					</section>

					<div className="grid gap-6">
						<section>
							<SidebarLink href="/about" active={pathname === "/about"}>
								About
							</SidebarLink>
						</section>

						<section className="grid gap-2">
							<p className="text-muted text-sm px-2">Writing</p>
							<div className="grid gap-0.5">
								<SidebarLink
									href="/writing/hermes-agent-mise"
									active={activeWritingSlug === "hermes-agent-mise"}
								>
									<strong>Hermes Agent + mise + venv</strong>
								</SidebarLink>
							</div>
						</section>

						<section className="min-h-0">
							<div className="mb-2.5 flex justify-start gap-3 px-1">
								<p className="text-muted">Recent</p>
							</div>

							<div className="grid gap-0.5 pr-0.5">
								{recentPosts.map((post) => (
									<SidebarLink
										key={post.slug}
										href={`/posts/${post.slug}`}
										active={activePostSlug === post.slug}
									>
										<strong>{post.title}</strong>
									</SidebarLink>
								))}
							</div>
						</section>

						{Object.entries(categorizedPosts).map(([category, entries]) => (
							<section key={category} className="min-h-0">
								<div className="mb-2.5 flex justify-start gap-3 px-1">
									<p className="m-0 text-[0.76rem] uppercase tracking-[0.22em] text-muted">
										{category}
									</p>
								</div>

								<div className="grid gap-0.5 pr-0.5">
									{entries.map((post) => (
										<SidebarLink
											key={post.slug}
											href={`/posts/${post.slug}`}
											active={activePostSlug === post.slug}
										>
											<strong>{post.title}</strong>
										</SidebarLink>
									))}
								</div>
							</section>
						))}
					</div>

					<footer className="mt-auto px-1.5 pt-1 text-[0.84rem] text-muted">
						<p className="mb-2 mt-0">
							静かな余白と、読み心地の良い文章でつくるプロダクトノート。
						</p>
						<a
							href="https://github.com/toyamarinyon/ultrahope"
							target="_blank"
							rel="noreferrer"
							className="text-muted hover:text-text focus-visible:text-text"
						>
							GitHub
						</a>
					</footer>
				</aside>

				<section className="flex min-w-0 flex-col ml-[240]">
					{props.children}
				</section>
			</div>
		</div>
	);
}
