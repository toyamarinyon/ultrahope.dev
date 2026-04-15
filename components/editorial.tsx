import type { ReactNode } from "react";

type PostHeroMetaItem = {
	label: ReactNode;
	value: ReactNode;
};

function Eyebrow(props: { children: ReactNode }) {
	return (
		<p className="m-0 mb-[18px] text-[0.76rem] uppercase tracking-[0.22em] text-[var(--text-faint)]">
			{props.children}
		</p>
	);
}

function PostMeta(props: { items: PostHeroMetaItem[] }) {
	return (
		<dl className="border-l border-[rgba(232,228,220,0.08)] pl-[18px]">
			{props.items.map((item, index) => (
				<div key={index}>
					<dt className="m-0 text-[0.76rem] uppercase tracking-[0.22em] text-[var(--text-faint)]">
						{item.label}
					</dt>
					<dd className="my-[10px] mb-[18px] text-[var(--text-faint)] last:mb-0">
						{item.value}
					</dd>
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
		<section className="mb-[22px] grid gap-[18px] border-b border-[var(--line)] pb-[22px] xl:grid-cols-[minmax(0,1fr)_220px]">
			<div>
				<Eyebrow>{props.eyebrow}</Eyebrow>
				<h2 className="m-0 font-[var(--serif)] text-[clamp(2rem,4vw,3.1rem)] leading-[0.98] tracking-[-0.04em] text-[var(--accent-strong)] max-sm:text-[clamp(1.7rem,10vw,2.3rem)]">
					{props.title}
				</h2>
				{props.intro ? (
					<p className="mt-5 max-w-[58ch] text-[0.95rem] text-[var(--text-soft)]">
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

export { ArticleShell, PostHero };
