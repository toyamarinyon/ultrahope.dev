import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Theme Tokens",
	description: "Tailwind theme token preview for Ultrahope Journal.",
};

const colorTokens = [
	{
		name: "base",
		cssVar: "--color-base",
		value: "#171410",
		swatchClass: "bg-base",
	},
	{
		name: "surface",
		cssVar: "--color-surface",
		value: "rgba(37, 33, 26, 0.82)",
		swatchClass: "bg-surface",
	},
	{
		name: "overlay",
		cssVar: "--color-overlay",
		value: "rgba(28, 24, 19, 0.94)",
		swatchClass: "bg-overlay",
	},
	{
		name: "muted",
		cssVar: "--color-muted",
		value: "#7f776d",
		swatchClass: "bg-muted",
	},
	{
		name: "subtle",
		cssVar: "--color-subtle",
		value: "#b0a79c",
		swatchClass: "bg-subtle",
	},
	{
		name: "text",
		cssVar: "--color-text",
		value: "#e8e3d8",
		swatchClass: "bg-text",
	},
	{
		name: "love",
		cssVar: "--color-love",
		value: "#cc3333",
		swatchClass: "bg-love",
	},
	{
		name: "gold",
		cssVar: "--color-gold",
		value: "#f0d7ad",
		swatchClass: "bg-gold",
	},
	{
		name: "rose",
		cssVar: "--color-rose",
		value: "#f7e7c9",
		swatchClass: "bg-rose",
	},
	{
		name: "highlight-low",
		cssVar: "--color-highlight-low",
		value: "rgba(255, 255, 255, 0.025)",
		swatchClass: "bg-highlight-low",
	},
	{
		name: "highlight-med",
		cssVar: "--color-highlight-med",
		value: "rgba(232, 228, 220, 0.12)",
		swatchClass: "bg-highlight-med",
	},
	{
		name: "highlight-high",
		cssVar: "--color-highlight-high",
		value: "rgba(232, 228, 220, 0.18)",
		swatchClass: "bg-highlight-high",
	},
	{
		name: "selection",
		cssVar: "--color-selection",
		value: "color-mix(in srgb, var(--color-gold) 18%, transparent)",
		swatchClass: "bg-selection",
	},
] as const;

const semanticTokens = [
	{
		name: "background",
		cssVar: "--background",
		sampleClass: "bg-base text-text",
	},
	{
		name: "foreground",
		cssVar: "--foreground",
		sampleClass: "bg-surface text-text",
	},
	{ name: "card", cssVar: "--card", sampleClass: "bg-surface text-text" },
	{ name: "popover", cssVar: "--popover", sampleClass: "bg-overlay text-text" },
	{ name: "primary", cssVar: "--primary", sampleClass: "bg-gold text-base" },
	{
		name: "secondary",
		cssVar: "--secondary",
		sampleClass: "bg-overlay text-text",
	},
	{
		name: "border",
		cssVar: "--border",
		sampleClass: "bg-highlight-med text-text",
	},
	{ name: "ring", cssVar: "--ring", sampleClass: "bg-gold text-base" },
] as const;

export default function TokensPage() {
	return (
		<main className="min-h-screen px-6 py-8 sm:px-8 lg:px-12">
			<div className="mx-auto flex max-w-7xl flex-col gap-10">
				<header className="flex flex-col gap-4 border-b border-highlight-med pb-6">
					<p className="text-xs uppercase tracking-label-wide text-muted">
						Theme tokens
					</p>
					<div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
						<div>
							<h1 className="font-serif text-5xl leading-none tracking-tighter text-rose">
								Ultrahope Theme Preview
							</h1>
							<p className="mt-3 max-w-3xl text-subtle">
								`app/globals.css` で定義している Tailwind theme token を、色、
								文字、質感ごとにまとめて確認するためのページです。
							</p>
						</div>
						<p className="max-w-md text-sm text-muted">
							Route: <code>/tokens</code>
						</p>
					</div>
				</header>

				<section className="grid gap-4 lg:grid-cols-3">
					<div className="rounded-xl border border-highlight-med bg-surface p-5 shadow-editorial lg:col-span-2">
						<p className="text-xs uppercase text-muted">Color palette</p>
						<div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
							{colorTokens.map((token) => (
								<div
									key={token.name}
									className="rounded-xl border border-highlight-med bg-base/70 p-4"
								>
									<div
										className={`h-24 rounded-lg border border-highlight-med ${token.swatchClass}`}
									/>
									<div className="mt-3 space-y-1">
										<p className="font-mono text-sm text-text">{token.name}</p>
										<p className="font-mono text-xs text-muted">
											{token.cssVar}
										</p>
										<p className="font-mono text-xs text-subtle">
											{token.value}
										</p>
									</div>
								</div>
							))}
						</div>
					</div>

					<div className="rounded-xl border border-highlight-med bg-overlay p-5">
						<p className="text-xs uppercase text-muted">Type samples</p>
						<div className="mt-5 space-y-5">
							<div className="rounded-lg border border-highlight-med bg-base/70 p-4">
								<p className="text-xs uppercase text-muted">font-sans</p>
								<p className="mt-3 font-sans text-2xl text-text">
									Quiet interfaces for thoughtful work.
								</p>
							</div>
							<div className="rounded-lg border border-highlight-med bg-base/70 p-4">
								<p className="text-xs uppercase text-muted">font-serif</p>
								<p className="mt-3 font-serif text-3xl leading-tight tracking-tighter text-rose">
									Calm, warm, editorial.
								</p>
							</div>
							<div className="rounded-lg border border-highlight-med bg-base/70 p-4">
								<p className="text-xs uppercase text-muted">font-mono</p>
								<pre className="mt-3 overflow-x-auto text-sm text-gold">
									<code>const tone = &quot;quiet glow&quot;;</code>
								</pre>
							</div>
						</div>
					</div>
				</section>

				<section className="grid gap-4 lg:grid-cols-2">
					<div className="rounded-xl border border-highlight-med bg-surface p-5">
						<p className="text-xs uppercase text-muted">Semantic aliases</p>
						<div className="mt-5 grid gap-3 md:grid-cols-2">
							{semanticTokens.map((token) => (
								<div
									key={token.name}
									className="rounded-lg border border-highlight-med p-4"
								>
									<div className={`rounded-md px-3 py-4 ${token.sampleClass}`}>
										<p className="font-mono text-sm">{token.name}</p>
									</div>
									<p className="mt-3 font-mono text-xs text-muted">
										{token.cssVar}
									</p>
								</div>
							))}
						</div>
					</div>

					<div className="rounded-xl border border-highlight-med bg-overlay p-5">
						<p className="text-xs uppercase text-muted">Shape and depth</p>
						<div className="mt-5 space-y-4">
							<div className="rounded-md border border-highlight-med bg-base/80 p-4">
								<p className="font-mono text-sm text-text">radius-md</p>
								<p className="mt-2 font-mono text-xs text-muted">0.5rem</p>
							</div>

							<div className="rounded-xl border border-highlight-med bg-base/60 p-4">
								<p className="text-sm text-subtle">
									Selection color can be checked by selecting this sentence on
									the page.
								</p>
							</div>
						</div>
					</div>
				</section>
			</div>
		</main>
	);
}
