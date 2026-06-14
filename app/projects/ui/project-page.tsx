import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Locale } from "@/lib/i18n";
import { getProject, type ProjectSlug } from "../lib/projects";

type ProjectPageProps = {
	heroMedia?: {
		alt: string;
		src: string;
		height: number;
		type?: "gif" | "image";
		width: number;
	};
	locale: Locale;
	slug: ProjectSlug;
};

export function getProjectMetadata({
	locale,
	slug,
}: ProjectPageProps): Metadata {
	const project = getProject(slug);

	if (!project) {
		notFound();
	}

	const content = project.content[locale];

	return {
		title: content.title,
		description: content.summary,
	};
}

export function ProjectPage({ heroMedia, locale, slug }: ProjectPageProps) {
	const project = getProject(slug);

	if (!project) {
		notFound();
	}

	const content = project.content[locale];

	return (
		<main className="mx-auto mt-12 mb-24 max-w-220 px-4 sm:px-8 md:mt-20 lg:px-20">
			<div className="grid gap-8">
				<header className="grid gap-4">
					<p className="text-sm text-muted">Project</p>
					<div className="grid gap-3">
						<h1 className="text-3xl sm:text-4xl">{content.title}</h1>
						<p className="max-w-150 text-subtle">{content.summary}</p>
						<div>
							<Link
								href={project.url}
								target="_blank"
								rel="noopener noreferrer"
								className="text-rose underline decoration-highlight-high underline-offset-4"
							>
								{content.linkLabel}
							</Link>
						</div>
					</div>
				</header>

				<section className="grid gap-4 max-w-170">
					{content.description.map((paragraph) => (
						<p key={paragraph}>{paragraph}</p>
					))}
				</section>

				{heroMedia ? (
					<section className="grid gap-3">
						<div className="overflow-hidden rounded-2xl border border-highlight-med bg-highlight-low">
							{heroMedia.type === "gif" ? (
								// biome-ignore lint/a11y/useAltText: alt is provided dynamically below
								// eslint-disable-next-line @next/next/no-img-element
								<img
									src={heroMedia.src}
									alt={heroMedia.alt}
									width={heroMedia.width}
									height={heroMedia.height}
									className="h-auto w-full"
								/>
							) : (
								<Image
									src={heroMedia.src}
									alt={heroMedia.alt}
									width={heroMedia.width}
									height={heroMedia.height}
									className="h-auto w-full"
								/>
							)}
						</div>
					</section>
				) : null}

				<div>
					<Link
						href={project.url}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center rounded-md border border-highlight-high px-4 py-2 text-sm text-rose transition-colors duration-200 hover:bg-highlight-med"
					>
						{content.visitLabel}
					</Link>
				</div>
			</div>
		</main>
	);
}
