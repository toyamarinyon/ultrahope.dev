import type { ReactNode } from "react";

type PostHeroMetaItem = {
	label: ReactNode;
	value: ReactNode;
};

function Eyebrow(props: { children: ReactNode }) {
	return (
		<p className="m-0 mb-4.5 text-[0.76rem] uppercase tracking-[0.22em] text-muted">
			{props.children}
		</p>
	);
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
		<section className="mb-5.5 grid gap-4.5 border-b border-highlight-med pb-5.5 xl:grid-cols-[minmax(0,1fr)_220px]">
			<div>
				<Eyebrow>{props.eyebrow}</Eyebrow>
				<h2 className="m-0 font-serif text-[clamp(2rem,4vw,3.1rem)] leading-[0.98] tracking-[-0.04em] text-rose max-sm:text-[clamp(1.7rem,10vw,2.3rem)]">
					{props.title}
				</h2>
				{props.intro ? (
					<p className="mt-5 max-w-[58ch] text-[0.95rem] text-subtle">
						{props.intro}
					</p>
				) : null}
			</div>
			<PostMeta items={props.meta} />
		</section>
	);
}

function ArticleShell(props: { children: ReactNode }) {
	return (
		<section className="bg-transparent p-[clamp(24px,4vw,42px)]">
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
