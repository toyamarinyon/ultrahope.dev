import type { Locale } from "@/lib/i18n";

export type ProjectSlug = "halo";

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
