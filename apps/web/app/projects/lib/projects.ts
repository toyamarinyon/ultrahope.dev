import type { Locale } from "@/lib/i18n";

export type ProjectSlug = "enka" | "halo" | "eslint-plugin-raula";

type LocalizedProjectContent = {
	title: string;
	summary: string;
	description: string[];
	linkLabel: string;
	visitLabel: string;
};

export type Project = {
	slug: ProjectSlug;
	url: string;
	content: Record<Locale, LocalizedProjectContent>;
};

const projects: Project[] = [
	{
		slug: "enka",
		url: "https://enka.ultrahope.dev/",
		content: {
			en: {
				title: "enka",
				summary:
					"A small macOS utility that maps left/right Command key single-taps to JIS Eisu and Kana input-source keys.",
				description: [
					"enka is an Ultrahope project for people who switch between Japanese and English input all day and want that motion to stay close to their hands. A left Command single-tap posts the JIS Eisu key event, and a right Command single-tap posts the JIS Kana key event.",
					"The scope is intentionally narrow. enka is not a general command launcher; it watches Command releases, cancels when another key is pressed, and posts the input-source key events directly with CGEvent.",
					"It ships as a Swift CLI plus Enka.app for the macOS Accessibility permission identity. The hosted installer installs the binary and app bundle, writes the LaunchAgent, opens the permission flow, waits for approval, and starts the daemon once macOS allows it.",
				],
				linkLabel: "Open project",
				visitLabel: "Visit enka",
			},
			ja: {
				title: "enka",
				summary:
					"左右の Command キー単体タップを、macOS の JIS 英数 / かなキー入力に変換する小さなユーティリティです。",
				description: [
					"enka は、日本語と英語の入力を一日に何度も切り替える人のための Ultrahope プロジェクトです。左 Command の単体タップで JIS 英数キー、右 Command の単体タップで JIS かなキーのイベントを送ります。",
					"あえて汎用ランチャーにはしていません。daemon は Command の release を見て、別のキーが押されたら取り消し、入力ソース切り替えに必要な key event だけを CGEvent で直接 post します。",
					"Swift 製の CLI と、macOS の Accessibility 権限の identity になる Enka.app を同梱しています。hosted installer は binary と app bundle を配置し、LaunchAgent を書き、権限許可のために Enka.app を開いて、許可後に daemon を起動します。",
				],
				linkLabel: "プロジェクトを見る",
				visitLabel: "enka を見る",
			},
		},
	},
	{
		slug: "eslint-plugin-raula",
		url: "https://www.npmjs.com/package/eslint-plugin-raula",
		content: {
			en: {
				title: "eslint-plugin-raula",
				summary:
					"Opinionated ESLint rules for Tailwind and Next.js App Router, with built-in reference documentation generation.",
				description: [
					"eslint-plugin-raula is an Ultrahope project for teams that want strict, predictable conventions around Tailwind and the Next.js App Router. It provides opinionated rules rather than a broad generic lint set, and this site also uses eslint-plugin-raula in its own codebase.",
					"The rules focus on `className`, `app/globals.css`, and `app/**/layout.*`, so design-system and App Router structure constraints can be enforced consistently in both code review and CI.",
					"It is not only linting. The package generates reference documentation from each rule's metadata, ships `REFERENCE.md` plus per-rule docs in the npm package, and `npx eslint-plugin-raula instruct` adds an `AGENTS.md` block that points coding agents to `node_modules/eslint-plugin-raula/REFERENCE.md`.",
				],
				linkLabel: "Open project",
				visitLabel: "Visit npm package",
			},
			ja: {
				title: "eslint-plugin-raula",
				summary:
					"Tailwind と Next.js App Router 向けの opinionated な ESLint ルールセットで、ルール metadata から参照ドキュメントも生成します。",
				description: [
					"eslint-plugin-raula は、Tailwind と Next.js App Router の運用ルールを強くそろえたいチーム向けの Ultrahope プロジェクトです。汎用的な lint 集ではなく、判断基準を明確にした opinionated なルールを提供し、このサイト自身でも eslint-plugin-raula を使っています。",
					"ルールは `className`、`app/globals.css`、`app/**/layout.*` に焦点を当てており、デザインシステムと App Router の構造に関する制約を、レビューと CI の両方で一貫して適用できます。",
					"これは lint だけのパッケージではありません。各ルールの metadata から参照ドキュメントを生成し、npm パッケージ内に `REFERENCE.md` とルールごとのドキュメントを同梱します。さらに `npx eslint-plugin-raula instruct` を実行すると、coding agent を `node_modules/eslint-plugin-raula/REFERENCE.md` に誘導する `AGENTS.md` ブロックを追加できます。",
				],
				linkLabel: "プロジェクトを見る",
				visitLabel: "npm パッケージを見る",
			},
		},
	},
	{
		slug: "halo",
		url: "https://halo.ultrahope.dev/",
		content: {
			en: {
				title: "halo",
				summary:
					"An LLM-powered CLI that turns your diff into commit message candidates directly in the terminal.",
				description: [
					"Halo is an Ultrahope project for people who commit often and want help with wording, not a tool that takes the whole workflow away from them. It reads your diff and proposes multiple commit message candidates right where you are already working.",
					"You compare the candidates, edit them inline, refine them with a short instruction, or escalate to a stronger model when needed. The point is to keep the final judgment with the developer while making the loop much faster.",
					"It works with Git and Jujutsu, can be tried without creating an account, and offers a small free tier so the CLI is easy to adopt before committing to a subscription.",
				],
				linkLabel: "Open project",
				visitLabel: "Visit halo",
			},
			ja: {
				title: "halo",
				summary:
					"diff から commit message 候補を terminal 上で生成し、比較しながら決められる LLM-powered CLI です。",
				description: [
					"Halo は、commit のたびに言い回しで手を止めたくない開発者のための Ultrahope プロジェクトです。作業中の diff を読み取り、その場で複数の commit message 候補を返します。",
					"候補を見比べて選ぶだけでなく、そのまま編集したり、短い指示で refine したり、必要なときだけ強いモデルへ escalate したりできます。AI に丸投げするのではなく、最終判断は自分で持ったまま速度を上げる設計です。",
					"Git と Jujutsu の両方に対応していて、アカウントなしでも試せます。まずは小さな free tier から使い始めて、合えばそのまま日々の workflow に組み込めます。",
				],
				linkLabel: "プロジェクトを見る",
				visitLabel: "halo を見る",
			},
		},
	},
];

export function getProjects() {
	return projects;
}

export function getProject(slug: ProjectSlug) {
	return projects.find((project) => project.slug === slug);
}
