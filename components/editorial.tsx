import type { ReactNode } from "react";

type PostHeroMetaItem = {
	label: ReactNode;
	value: ReactNode;
};

function Eyebrow(props: { children: ReactNode }) {
	return <p className="text-muted">{props.children}</p>;
}

function PostMeta(props: { items: PostHeroMetaItem[] }) {
	return (
		<dl className="border-l border-[rgba(232,228,220,0.08)] pl-4.5">
			{props.items.map((item, index) => (
				<div key={index}>
					<dt className="m-0 text-[0.76rem] uppercase tracking-[0.22em] text-muted">
						{item.label}
					</dt>
					<dd className="my-2.5 mb-4.5 text-muted last:mb-0">{item.value}</dd>
				</div>
			))}
		</dl>
	);
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
