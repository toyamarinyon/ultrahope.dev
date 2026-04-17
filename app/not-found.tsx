import Link from "next/link";
import { PillLink } from "@/components/editorial";

export default function NotFound() {
	return (
		<main className="workspace-main">
			<section className="border-t border-line p-9 max-sm:border-none">
				<p className="m-0 mb-4.5 text-[0.76rem] uppercase tracking-[0.22em] text-text-faint">
					Not found
				</p>
				<h2 className="m-0 font-serif text-[clamp(2rem,4vw,3.1rem)] leading-[0.98] tracking-[-0.04em] text-accent-strong max-sm:text-[clamp(1.7rem,10vw,2.3rem)]">
					そのページはまだ静かに準備中です。
				</h2>
				<p className="mb-0 max-w-[56ch] text-text-faint">
					対応する記事は見つかりませんでした。左の一覧から別の記事へ移動できます。
				</p>
				<Link href="/" className="mt-6 inline-block">
					<PillLink>Overview に戻る</PillLink>
				</Link>
			</section>
		</main>
	);
}
