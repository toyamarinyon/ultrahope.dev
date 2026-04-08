import Link from "next/link";

export default function NotFound() {
  return (
    <main className="workspace-main">
      <section className="empty-state">
        <p className="eyebrow">Not found</p>
        <h2>そのページはまだ静かに準備中です。</h2>
        <p>対応する記事は見つかりませんでした。左の一覧から別の記事へ移動できます。</p>
        <Link href="/" className="inline-action">
          Overview に戻る
        </Link>
      </section>
    </main>
  );
}
