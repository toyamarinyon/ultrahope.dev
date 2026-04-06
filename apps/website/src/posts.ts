export interface Post {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  content: string;
}

export const posts: Post[] = [
  {
    slug: "quiet-glow",
    title: "静かな輝き — デザインの哲学",
    date: "2025-07-14",
    category: "Design",
    excerpt:
      "派手さではなく、静かな温もり。デザインにおいて「引き算」が生み出す豊かさについて考える。",
    content: `
<p>デザインには二つの方向性がある。光り輝くものと、静かに光るもの。前者は注目を集め、後者は人を落ち着かせる。</p>

<p>Ultrahopeのデザインフィロソフィーは「Not radiance — a quiet glow.」という言葉に集約される。派手な色使いや大きなアニメーションではなく、余白と節制されたタイポグラフィで空間を作る。</p>

<h2>色の温度</h2>

<p>ダークモードと言えば冷たいブルーが定番だが、ウォームなキャンバス色（<code>#1a1814</code>）は別の印象を与える。夜のカフェのような、落ち着きのある暗さだ。</p>

<p>フォアグラウンドの <code>#e8e4dc</code> はほんのわずかに黄みがかったホワイト。冷たいピュアホワイトより目に優しく、長時間の読書でも疲れにくい。</p>

<h2>タイポグラフィの役割</h2>

<p>Geist はモダンで中立的なサンセリフ。Baskervville はクラシックなセリフ体。この二つの組み合わせが、「伝統を尊重しながら前進する」というトーンを作り出す。</p>

<blockquote>Honor the classics. Never let color speak too loud.</blockquote>

<p>余白が呼吸を作る。コンテンツを詰め込まず、テキストに語らせる。それがこのジャーナルのアプローチだ。</p>
`,
  },
  {
    slug: "vite-plus-workflow",
    title: "Vite+ で整えた開発環境",
    date: "2025-07-10",
    category: "Workflow",
    excerpt:
      "pnpm、Vite、Vitest、Oxlint を一つの CLI にまとめた Vite+ の使い心地と、モノレポへの導入について。",
    content: `
<p>フロントエンドの開発環境はここ数年で大きく変わった。ビルドツール、テストランナー、リンター、フォーマッターと、それぞれ別々のツールを組み合わせていた時代から、統合されたツールチェーンへの移行が進んでいる。</p>

<h2>Vite+ とは</h2>

<p>Vite+ は Vite、Rolldown、Vitest、Oxlint、Oxfmt を一つの CLI <code>vp</code> にまとめたユニファイドツールチェーンだ。パッケージマネージャーの操作も <code>vp install</code> 経由で行うことができる。</p>

<pre><code>vp dev        # 開発サーバー起動
vp build      # プロダクションビルド
vp test       # テスト実行 (Vitest)
vp lint       # リント (Oxlint)
vp fmt        # フォーマット (Oxfmt)
vp check      # fmt + lint + 型チェックをまとめて実行</code></pre>

<h2>モノレポとの相性</h2>

<p>pnpm ワークスペースと組み合わせると、各パッケージの依存関係をカタログで一元管理できる。<code>pnpm-workspace.yaml</code> に共通バージョンを定義し、各パッケージでは <code>catalog:</code> を参照するだけでよい。</p>

<h2>体験として</h2>

<p>ツールが統一されることで、「どのツールのどのコマンド？」という認知負荷が下がる。開発者体験は細かい積み重ねで作られる。その一つが、シンプルな CLI だ。</p>
`,
  },
  {
    slug: "commit-message-craft",
    title: "コミットメッセージという小さな文章",
    date: "2025-07-03",
    category: "Writing",
    excerpt:
      "一日に何十回も書くコミットメッセージ。その質が積み重なって、プロジェクトの歴史になる。",
    content: `
<p>コミットメッセージは小さい。一行、多くても数行。でも一日に何十回も書き、プロジェクトの寿命が続く限り積み重なっていく。</p>

<p>三ヶ月後の自分、あるいはチームメンバーが <code>git log</code> を開いたとき、何が見えるだろうか。</p>

<h2>良いメッセージの条件</h2>

<p>「何をしたか」ではなく「なぜしたか」を書く。<code>fix bug</code> より <code>fix: prevent null dereference when user has no profile image</code> の方が、変更の意図が伝わる。</p>

<ul>
<li>50文字以内の件名行</li>
<li>必要であれば空行を挟んで詳細を本文に</li>
<li>命令形で書く（"Add feature" not "Added feature"）</li>
</ul>

<h2>AI の役割</h2>

<p>Ultrahope は diff から複数のコミットメッセージ候補を生成する。AI が提案し、人間が選ぶ。この分業は、メッセージの品質を上げながら、決定権を開発者に残す。</p>

<p>自動化できるのは「草案作成」だ。最終的な判断は、コードの文脈を知っている人間にある。</p>

<blockquote>AI proposes. You compare. You decide.</blockquote>

<p>小さな文章の積み重ねが、読みやすい歴史を作る。</p>
`,
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
