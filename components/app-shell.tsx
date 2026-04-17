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
			className={`inline-flex min-h-8 w-full items-center rounded-[10px] px-1 text-[0.92rem] text-text-soft transition-[background-color,color] duration-200 hover:bg-[rgba(255,255,255,0.02)] hover:text-accent-strong focus-visible:bg-[rgba(255,255,255,0.02)] focus-visible:text-accent-strong [&_strong]:text-inherit [&_strong]:font-normal [&_strong]:leading-[1.45] ${props.active ? "bg-[rgba(240,215,173,0.04)] text-accent-strong" : ""}`}
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
			<div className="relative mx-auto grid min-h-screen w-full overflow-hidden bg-[rgba(13,10,8,0.18)] min-[1181px]:grid-cols-[minmax(248px,300px)_minmax(0,1fr)] max-[1180px]:grid-cols-[272px_minmax(0,1fr)] max-[920px]:grid-cols-1">
				<aside className="flex min-h-full flex-col gap-6.5 border-r border-line bg-[linear-gradient(180deg,rgba(255,255,255,0.03),transparent_16%),rgba(23,20,16,0.82)] px-4 pb-5 max-[920px]:border-b max-[920px]:border-r-0 max-[920px]:px-5 max-[640px]:px-4">
					<section className="-mx-4 flex h-14.5 items-center px-4">
						<Link
							href="/"
							className="inline-flex items-center text-accent-strong"
							aria-current={pathname === "/" ? "page" : undefined}
						>
							<UltrahopeLogo className="h-7 w-7 shrink-0" />
						</Link>
					</section>

					<section className="min-h-0">
						<SidebarLink href="/about" active={pathname === "/about"}>
							About
						</SidebarLink>
					</section>

					<section className="min-h-0">
						<div className="mb-2.5 flex justify-start gap-3 px-1">
							<p className="m-0 text-[0.76rem] uppercase tracking-[0.22em] text-text-faint">
								Writing
							</p>
						</div>

						<div className="grid gap-0.5 pr-0.5">
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
							<p className="m-0 text-[0.76rem] uppercase tracking-[0.22em] text-text-faint">
								Recent
							</p>
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
								<p className="m-0 text-[0.76rem] uppercase tracking-[0.22em] text-text-faint">
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

					<footer className="mt-auto px-1.5 pt-1 text-[0.84rem] text-text-faint">
						<p className="mb-2 mt-0">
							静かな余白と、読み心地の良い文章でつくるプロダクトノート。
						</p>
						<a
							href="https://github.com/toyamarinyon/ultrahope"
							target="_blank"
							rel="noreferrer"
							className="text-text-faint hover:text-text-base focus-visible:text-text-base"
						>
							GitHub
						</a>
					</footer>
				</aside>

				<section className="flex min-w-0 flex-col bg-[radial-gradient(circle_at_top_right,rgba(240,215,173,0.04),transparent_28%),rgba(17,14,11,0.5)]">
					<header className="flex h-14.5 items-center justify-start gap-5 px-7.5 max-[920px]:px-5 max-[640px]:flex-col max-[640px]:px-4">
						<Link
							href="/"
							className="inline-flex min-h-8 items-center text-accent-strong"
							aria-current={pathname === "/" ? "page" : undefined}
						>
							<span className="font-sans text-[1.25rem] font-medium leading-none tracking-[-0.04em]">
								Ultrahope
							</span>
						</Link>
					</header>
					{props.children}
				</section>
			</div>
		</div>
	);
}
