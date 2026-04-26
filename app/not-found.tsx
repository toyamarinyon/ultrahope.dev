import Link from "next/link";
import { PillLink } from "@/components/editorial";

export default function NotFound() {
	return (
		<main className="px-7.5 pt-7 pb-8.5 max-lg:px-5 max-sm:px-4">
			<section className="border-t border-highlight-med p-9 max-sm:border-none">
				<p className="m-0 mb-4.5 text-xs uppercase text-muted">Not found</p>
				<h2 className="m-0 font-serif text-5xl leading-none tracking-tighter text-rose max-sm:text-4xl">
					そのページはまだ静かに準備中です。
				</h2>
				<p className="mb-0 max-w-2xl text-muted">
					対応する記事は見つかりませんでした。左の一覧から別の記事へ移動できます。
				</p>
				<Link href="/" className="mt-6 inline-block">
					<PillLink>Overview に戻る</PillLink>
				</Link>
			</section>
		</main>
	);
}
