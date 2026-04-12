export interface Post {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  content: string;
}

export interface HomeVariantSection {
  label: string;
  title: string;
  body: string;
}

export interface HomeVariant {
  slug: string;
  name: string;
  eyebrow: string;
  title: string;
  intro: string;
  noteTitle: string;
  noteBody: string;
  audience: string;
  mood: string;
  keyPoints: string[];
  sections: HomeVariantSection[];
  ctaLabel: string;
}

export const posts: Post[] = [
  {
    slug: "quiet-glow",
    title: "静かな輝き - デザインの哲学",
    date: "2025-07-14",
    category: "Design",
    excerpt:
      "派手さではなく、静かな温もり。デザインにおいて「引き算」が生み出す豊かさについて考える。",
    content: `
<p>デザインには二つの方向性がある。光り輝くものと、静かに光るもの。前者は注目を集め、後者は人を落ち着かせる。</p>

<p>Ultrahopeのデザインフィロソフィーは「Not radiance - a quiet glow.」という言葉に集約される。派手な色使いや大きなアニメーションではなく、余白と節制されたタイポグラフィで空間を作る。</p>

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

export const homeVariants: HomeVariant[] = [
  {
    slug: "quiet-editorial",
    name: "静かな文芸寄り",
    eyebrow: "Concept 01",
    title: "読む前に、もう空気感で好きになるトップページ。",
    intro:
      "文章そのものの手触りを前に出す案です。ヒーローではサイトの思想を短く語り、最新記事も数を絞って、まずは一番深く読んでほしい入口だけを見せます。",
    noteTitle: "向いているサイト",
    noteBody:
      "書き手としての感性や言葉選びを前に出したいときに強い構成です。更新頻度が高くなくても、佇まいで価値を伝えやすくなります。",
    audience: "文章の温度感や美意識を大事にしたい読者向け",
    mood: "静か、余白多め、エッセイ寄り",
    keyPoints: [
      "短いステートメント",
      "厳選した最新2〜3本",
      "カテゴリより空気感を優先",
    ],
    sections: [
      {
        label: "Opening note",
        title: "この場所は、何を書くためにあるのか。",
        body: "トップで最初に伝えるのは記事の本数ではなく、書く理由です。『デザインと開発のあいだで考えたことを、静かな文章で残す場所』のような一文が主役になります。",
      },
      {
        label: "Featured reading",
        title: "おすすめ記事は、棚ではなく選書の感覚で並べる。",
        body: "更新順に全部を見せるよりも、今のサイトらしさが出る記事を大きく置く構成です。読者に『どれから読めばいいか』を考えさせません。",
      },
      {
        label: "Small profile",
        title: "自己紹介は、履歴書よりも編集後記に近く。",
        body: "所属や実績を並べるより、『最近何に惹かれているか』『何を観察しているか』を2〜3文で置くと、文章と人柄が自然につながります。",
      },
    ],
    ctaLabel: "このトーンでトップを組む",
  },
  {
    slug: "product-notes",
    name: "プロダクト開発寄り",
    eyebrow: "Concept 02",
    title: "何を作っている人かが、3秒でわかるトップページ。",
    intro:
      "個人ブログというより、プロダクトノート兼ラボの入口に寄せた案です。いま作っているもの、考えているテーマ、最近の更新を並列に見せて、活動の輪郭を明確にします。",
    noteTitle: "向いているサイト",
    noteBody:
      "サービスやOSS、デザイン実験など『つくっているもの』があるならかなり相性が良いです。初見の人にも仕事や興味領域が伝わりやすくなります。",
    audience: "仕事相手、コラボ相手、同業の読者向け",
    mood: "明快、構造的、プロダクトショーケース寄り",
    keyPoints: [
      "現在進行中のもの",
      "記事テーマの整理",
      "外部リンク導線を強める",
    ],
    sections: [
      {
        label: "Now building",
        title: "いま作っているものを、ヒーロー直下で見せる。",
        body: "プロダクト名、短い説明、進捗の一言を置くだけで、サイト全体がぐっと現在進行形に見えます。記事もその延長線上にあると伝えやすくなります。",
      },
      {
        label: "Activity map",
        title: "Design / Workflow / Writing を、活動領域として見せる。",
        body: "カテゴリはアーカイブ整理ではなく、どの視点で考えている人かを表すラベルとして使います。読む前から専門性の広がりが伝わります。",
      },
      {
        label: "Clear next step",
        title: "About や GitHub への導線を、迷わせず置く。",
        body: "初めて来た人は、記事を読む前に『この人の全体像』を知りたいことがあります。プロフィールや制作物への入口をトップに置くと回遊しやすくなります。",
      },
    ],
    ctaLabel: "この構成で見せる",
  },
  {
    slug: "personal-desk",
    name: "個人サイト寄り",
    eyebrow: "Concept 03",
    title: "近況と興味が自然ににじむ、ひらいた作業机みたいなトップ。",
    intro:
      "少し生活感のある個人サイト案です。最近考えていること、読んでほしい記事、ちいさなリンク集をゆるく並べて、人となりが先に伝わるようにします。",
    noteTitle: "向いているサイト",
    noteBody:
      "堅いポートフォリオにはしたくないけれど、個人の輪郭は見せたい場合にちょうどいい案です。更新の揺らぎも魅力として扱えます。",
    audience: "友人、フォロワー、たまたま訪れた読者向け",
    mood: "親しみやすい、雑記と作品集の中間",
    keyPoints: ["近況メモ", "最近よかった記事", "小さな外部リンク集"],
    sections: [
      {
        label: "Now / Next",
        title: "最近やっていることを、短い近況として置く。",
        body: "『最近は Vite+ で開発環境を整えている』『文章の読みやすさを考えている』のような短い近況があるだけで、トップページが生きて見えます。",
      },
      {
        label: "A few favorites",
        title: "記事一覧ではなく、いま読んでほしい数本を手渡す。",
        body: "記事の全件表示よりも、『まずこの3本をどうぞ』のほうが個人サイトらしい温度が出ます。読み手との距離も少し縮まります。",
      },
      {
        label: "Links with character",
        title: "GitHub や About も、無機質なリンク集にしない。",
        body: "リンクの横に一言添えて、どこへ行けるのかをやわらかく説明します。外部導線まで含めて、その人の机まわりを覗く感覚にできます。",
      },
    ],
    ctaLabel: "この方向で育てる",
  },
];

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}

export function getHomeVariant(slug: string) {
  return homeVariants.find((variant) => variant.slug === slug);
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));
}
