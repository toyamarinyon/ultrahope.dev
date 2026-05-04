"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
	getLocaleFromPathname,
	type Locale,
	localizedPath,
	withoutLocalePrefix,
} from "@/lib/i18n";

type ProjectItem = {
	slug: string;
	content: Record<Locale, { title: string }>;
};

export function ProjectListClient({ projects }: { projects: ProjectItem[] }) {
	const pathname = usePathname();
	const locale = getLocaleFromPathname(pathname);
	const pathnameWithoutLocale = withoutLocalePrefix(pathname);
	const activeProjectSlug = pathnameWithoutLocale.startsWith("/projects/")
		? pathnameWithoutLocale.split("/")[2]
		: null;

	return (
		<section className="grid min-w-0 gap-1">
			<p className="px-2 text-muted">Project</p>
			<div className="grid gap-0.5">
				{projects.map((project) => (
					<Link
						key={project.slug}
						href={localizedPath(locale, `/projects/${project.slug}`)}
						className={`flex w-full min-w-0 items-center rounded-md px-2 py-1 transition-colors duration-200 hover:bg-highlight-med hover:text-rose focus-visible:text-rose ${activeProjectSlug === project.slug ? "bg-highlight-med text-rose" : ""}`}
						aria-current={
							activeProjectSlug === project.slug ? "page" : undefined
						}
					>
						<span className="line-clamp-2">
							{project.content[locale]?.title ?? project.content.en.title}
						</span>
					</Link>
				))}
			</div>
		</section>
	);
}
