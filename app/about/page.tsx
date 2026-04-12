import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <main className="workspace-main">
      <section className="post-hero">
        <div>
          <p className="eyebrow">About</p>
          <h2>静かな余白と、読むためのインターフェース。</h2>
          <p className="post-intro">
            Ultrahope Journal
            は、暖かいダークトーンを保ちながら、記事一覧と本文をひとつの視界に
            共存させるための実験です。IDE
            のような二層構造を借りながら、ブログをもっと落ち着いて
            読める形に整えています。
          </p>
        </div>
        <dl className="post-meta">
          <dt>Focus</dt>
          <dd>Reading experience</dd>
          <dt>Base</dt>
          <dd>Warm dark editorial UI</dd>
        </dl>
      </section>

      <section className="article-shell">
        <article className="article">
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
        </article>
      </section>
    </main>
  );
}
