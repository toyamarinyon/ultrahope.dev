import type { Metadata } from "next";
import { ArticleShell, PostHero } from "@/components/editorial";

export const metadata: Metadata = {
	title: "About",
};

export default function AboutPage() {
	return (
		<main className="px-7.5 pt-7 pb-8.5 max-[920px]:px-5 max-[640px]:px-4">
			<PostHero
				eyebrow="About"
				title="静かな余白と、読むためのインターフェース。"
				intro={
					<>
						Ultrahope Journal
						は、暖かいダークトーンを保ちながら、記事一覧と本文をひとつの視界に
						共存させるための実験です。IDE
						のような二層構造を借りながら、ブログをもっと落ち着いて
						読める形に整えています。
					</>
				}
				meta={[
					{ label: "Focus", value: "Reading experience" },
					{ label: "Base", value: "Warm dark editorial UI" },
				]}
			/>

			<ArticleShell>
				<article className="max-w-190">
					<div className="space-y-5 text-subtle">
						<p>
							派手な装飾よりも、情報の置き方と余白で気持ちよさをつくる。その考え方をベースに、
							ホームでは比較しやすく、記事ページでは没入しやすいレイアウトを目指しています。
						</p>
						<p>
							左のサイドバーは、いまどこを読んでいるかを見失わないための地図です。Recent
							と Category
							を分けることで、更新順とテーマの両方から記事へ入れるようにしています。
						</p>
						<p>
							Ultrahope 本体については{" "}
							<a href="https://ultrahope.dev" target="_blank" rel="noreferrer">
								ultrahope.dev
							</a>{" "}
							へ。
						</p>
					</div>
				</article>
			</ArticleShell>
		</main>
	);
}
