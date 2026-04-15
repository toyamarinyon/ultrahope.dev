import Link from "next/link";
import { formatDate, posts } from "@/lib/content";

export default function Home() {
	const [latestPost, ...otherPosts] = posts;
	const featuredPosts = otherPosts.slice(0, 3);

	return (
		<main className="workspace-main">
			<section className="mb-5 grid gap-[18px] border-b border-[var(--line)] pb-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.65fr)]">
				<div className="px-[10px] pb-2 pt-3">
					<Link href={`/posts/${latestPost.slug}`} className="block">
						<div className="flex items-center justify-start gap-3">
							<span className="m-0 text-[0.68rem] uppercase tracking-[0.22em] text-[var(--text-faint)]">
								{formatDate(latestPost.date)}
							</span>
						</div>
						<h2 className="m-0 font-[var(--serif)] text-[clamp(1.8rem,3vw,2.45rem)] leading-[0.98] tracking-[-0.04em] text-[var(--accent-strong)] max-sm:text-[clamp(1.7rem,10vw,2.3rem)]">
							{latestPost.title}
						</h2>
						<p className="mt-5 max-w-[58ch] text-[0.95rem] text-[var(--text-soft)]">
							{latestPost.excerpt}
						</p>
						<div className="mt-auto pt-6 text-[var(--accent)]">
							Read article
						</div>
					</Link>
				</div>
			</section>

			<section className="pt-2">
				<div className="mb-[18px] flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
					<div>
						<p className="m-0 text-[0.76rem] uppercase tracking-[0.22em] text-[var(--text-faint)]">
							More posts
						</p>
						<h2 className="mt-2 max-w-[13ch] font-[var(--serif)] text-[clamp(1.55rem,3vw,2.25rem)] leading-none tracking-[-0.04em] text-[var(--text)] max-xl:max-w-none">
							続けて読むなら、このあたりから。
						</h2>
					</div>
					<p className="m-0 max-w-[38ch] text-[var(--text-faint)]">
						最新の記事のほかにも、最近書いたものをいくつか置いています。
					</p>
				</div>

				<div className="grid gap-4 xl:grid-cols-2">
					{featuredPosts.map((post) => (
						<Link
							key={post.slug}
							href={`/posts/${post.slug}`}
							className="flex min-h-full flex-col border-t border-[rgba(232,228,220,0.08)] py-[18px] pb-[22px] transition-colors duration-200 hover:border-[rgba(240,215,173,0.24)] focus-visible:border-[rgba(240,215,173,0.24)]"
						>
							<div className="flex items-center justify-between gap-3">
								<span className="m-0 text-[0.76rem] uppercase tracking-[0.22em] text-[var(--text-faint)]">
									Journal entry
								</span>
								<span className="text-[var(--text-faint)]">
									{formatDate(post.date)}
								</span>
							</div>
							<h3 className="mt-[18px] font-[var(--serif)] text-[1.5rem] leading-[1.02] tracking-[-0.04em] text-[var(--text)] max-sm:text-[1.3rem]">
								{post.title}
							</h3>
							<p className="mt-4 text-[var(--text-soft)]">{post.excerpt}</p>
							<div className="mt-auto pt-6 text-[var(--accent)]">
								Open article
							</div>
						</Link>
					))}
				</div>
			</section>
		</main>
	);
}
