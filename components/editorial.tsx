import type { ReactNode } from "react";

type PostHeroMetaItem = {
	label: ReactNode;
	value: ReactNode;
};

function Eyebrow(props: { children: ReactNode }) {
	return <p className="text-muted">{props.children}</p>;
}

function PostHero(props: {
	eyebrow: ReactNode;
	title: ReactNode;
	intro?: ReactNode;
	meta: PostHeroMetaItem[];
}) {
	return (
		<section>
			<div>
				<Eyebrow>{props.eyebrow}</Eyebrow>
				<h2 className="text-3xl">{props.title}</h2>
				<div className="text-muted text-sm">
					<p>2026年4月24日 公開</p>
				</div>
			</div>
		</section>
	);
}

function ArticleShell(props: { children: ReactNode }) {
	return (
		<section className="max-w-220 mx-auto mt-20 px-20">
			{props.children}
		</section>
	);
}

function PillLink(props: {
	children: ReactNode;
	active?: boolean;
	className?: string;
}) {
	return (
		<span
			className={`inline-flex min-h-7 items-center rounded-full border border-[rgba(240,215,173,0.12)] px-2.5 text-[0.84rem] text-gold ${props.active ? "border-[rgba(240,215,173,0.36)] bg-[rgba(240,215,173,0.08)] text-rose" : ""} ${props.className ?? ""}`}
		>
			{props.children}
		</span>
	);
}

export { ArticleShell, PillLink, PostHero };
