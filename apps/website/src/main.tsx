import { Agentation } from "agentation";
import { StrictMode, type ReactNode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { getPost, posts } from "./posts";
import "./style.css";
import { UltrahopeLogo } from "./ultrahope-logo";

type Route =
  | { kind: "home" }
  | { kind: "about" }
  | { kind: "home-variant"; slug: string }
  | { kind: "post"; slug: string }
  | { kind: "not-found"; slug: string };

interface HomeVariantSection {
  label: string;
  title: string;
  body: string;
}

interface HomeVariant {
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

const homeVariants: HomeVariant[] = [
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
    keyPoints: ["短いステートメント", "厳選した最新2〜3本", "カテゴリより空気感を優先"],
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
    keyPoints: ["現在進行中のもの", "記事テーマの整理", "外部リンク導線を強める"],
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

function getHomeVariant(slug: string) {
  return homeVariants.find((variant) => variant.slug === slug);
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));
}

function parseRoute(pathname: string): Route {
  const cleanedPath = pathname.replace(/\/+$/, "") || "/";
  const parts = cleanedPath.split("/").filter(Boolean);

  if (parts.length === 0) {
    return { kind: "home" };
  }

  if (parts[0] === "about" && parts.length === 1) {
    return { kind: "about" };
  }

  if (parts[0] === "ideas" && parts[1] && parts.length === 2) {
    const slug = parts[1];

    if (getHomeVariant(slug)) {
      return { kind: "home-variant", slug };
    }

    return { kind: "not-found", slug: parts.join("/") };
  }

  if (parts[0] === "posts" && parts[1]) {
    const slug = parts[1];

    if (getPost(slug)) {
      return { kind: "post", slug };
    }

    return { kind: "not-found", slug };
  }

  return { kind: "not-found", slug: parts.join("/") };
}

function navigateTo(path: string) {
  window.history.pushState({}, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
}

function useRoute() {
  const [route, setRoute] = useState<Route>(() => parseRoute(window.location.pathname));

  useEffect(() => {
    const onPopState = () => {
      setRoute(parseRoute(window.location.pathname));
      window.scrollTo({ top: 0, behavior: "auto" });
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  return route;
}

function AppLink(props: {
  href: string;
  className?: string;
  children: ReactNode;
  ariaCurrent?: "page";
}) {
  return (
    <a
      href={props.href}
      className={props.className}
      aria-current={props.ariaCurrent}
      onClick={(event) => {
        if (
          event.defaultPrevented ||
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey
        ) {
          return;
        }

        event.preventDefault();
        navigateTo(props.href);
      }}
    >
      {props.children}
    </a>
  );
}

function Sidebar(props: { route: Route }) {
  const activeSlug = props.route.kind === "post" ? props.route.slug : null;
  const recentPosts = posts.slice(0, 2);
  const categorizedPosts = posts.slice(2).reduce<Record<string, typeof posts>>((groups, post) => {
    groups[post.category] ??= [];
    groups[post.category].push(post);
    return groups;
  }, {});

  return (
    <aside className="workspace-sidebar">
      <section className="sidebar-brand-block">
        <AppLink
          href="/"
          className="sidebar-brand"
          ariaCurrent={props.route.kind === "home" ? "page" : undefined}
        >
          <UltrahopeLogo className="sidebar-brand-logo" />
        </AppLink>
      </section>

      <section className="sidebar-section">
        <AppLink
          href="/about"
          className={`sidebar-primary-link ${props.route.kind === "about" ? "is-active" : ""}`}
          ariaCurrent={props.route.kind === "about" ? "page" : undefined}
        >
          About
        </AppLink>
      </section>

      <section className="sidebar-section">
        <div className="sidebar-section-head sidebar-section-head-stack">
          <p>Recent</p>
        </div>

        <div className="sidebar-thread-list">
          {recentPosts.map((post) => (
            <AppLink
              key={post.slug}
              href={`/posts/${post.slug}`}
              className={`sidebar-primary-link ${activeSlug === post.slug ? "is-active" : ""}`}
              ariaCurrent={activeSlug === post.slug ? "page" : undefined}
            >
              <strong>{post.title}</strong>
            </AppLink>
          ))}
        </div>
      </section>

      {Object.entries(categorizedPosts).map(([category, entries]) => (
        <section key={category} className="sidebar-section">
          <div className="sidebar-section-head sidebar-section-head-stack">
            <p>{category}</p>
          </div>

          <div className="sidebar-thread-list sidebar-thread-list-compact">
            {entries.map((post) => (
              <AppLink
                key={post.slug}
                href={`/posts/${post.slug}`}
                className={`sidebar-primary-link ${activeSlug === post.slug ? "is-active" : ""}`}
                ariaCurrent={activeSlug === post.slug ? "page" : undefined}
              >
                <strong>{post.title}</strong>
              </AppLink>
            ))}
          </div>
        </section>
      ))}

      <footer className="sidebar-footer">
        <p>静かな余白と、読み心地の良い文章でつくるプロダクトノート。</p>
        <a href="https://github.com/toyamarinyon/ultrahope" target="_blank" rel="noreferrer">
          GitHub
        </a>
      </footer>
    </aside>
  );
}

function WorkspaceTopbar(props: { route: Route }) {
  return (
    <header className="workspace-topbar">
      <AppLink
        href="/"
        className="workspace-topbar-brand"
        ariaCurrent={props.route.kind === "home" ? "page" : undefined}
      >
        <span className="workspace-topbar-brand-text">Ultrahope</span>
      </AppLink>
    </header>
  );
}

function HomePage() {
  const [latestPost, ...otherPosts] = posts;
  const featuredPosts = otherPosts.slice(0, 3);

  return (
    <main className="workspace-main">
      <section className="hero-panel hero-panel-home">
        <div className="hero-copy-block">
          <AppLink href={`/posts/${latestPost.slug}`} className="latest-post-link">
            <div className="post-card-meta">
              <span>{formatDate(latestPost.date)}</span>
            </div>
            <h2>{latestPost.title}</h2>
            <p className="hero-copy">{latestPost.excerpt}</p>
            <div className="post-card-footer">Read article</div>
          </AppLink>
        </div>
      </section>

      <section className="content-section">
        <div className="section-head">
          <div>
            <p className="section-label">More posts</p>
            <h2>続けて読むなら、このあたりから。</h2>
          </div>
          <p>最新の記事のほかにも、最近書いたものをいくつか置いています。</p>
        </div>

        <div className="post-grid">
          {featuredPosts.map((post) => (
            <AppLink key={post.slug} href={`/posts/${post.slug}`} className="post-card">
              <div className="post-card-meta">
                <span>Journal entry</span>
                <span>{formatDate(post.date)}</span>
              </div>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <div className="post-card-footer">Open article</div>
            </AppLink>
          ))}
        </div>
      </section>
    </main>
  );
}

function HomeVariantPage(props: { slug: string }) {
  const variant = getHomeVariant(props.slug);

  if (!variant) {
    return <NotFoundPage slug={`ideas/${props.slug}`} />;
  }

  return (
    <main className="workspace-main">
      <section className="post-hero">
        <div>
          <p className="eyebrow">{variant.eyebrow}</p>
          <h2>{variant.title}</h2>
          <p className="post-intro">{variant.intro}</p>
        </div>
        <dl className="post-meta">
          <dt>Audience</dt>
          <dd>{variant.audience}</dd>
          <dt>Mood</dt>
          <dd>{variant.mood}</dd>
        </dl>
      </section>

      <section className="variant-summary-grid" aria-label="Variant summary">
        <article className="variant-note-card">
          <span>{variant.noteTitle}</span>
          <p>{variant.noteBody}</p>
        </article>

        <article className="variant-note-card">
          <span>Key points</span>
          <ul className="variant-bullet-list">
            {variant.keyPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="variant-section-list">
        {variant.sections.map((section) => (
          <article key={section.title} className="variant-section-card">
            <p className="section-label">{section.label}</p>
            <h3>{section.title}</h3>
            <p>{section.body}</p>
          </article>
        ))}
      </section>

      <aside className="more-posts">
        <div className="section-head section-head-compact">
          <div>
            <p className="section-label">Compare</p>
            <h2>ほかの方向性も並べて見られます。</h2>
          </div>
        </div>
        <div className="idea-index-grid">
          {homeVariants
            .filter((entry) => entry.slug !== variant.slug)
            .map((entry) => (
              <AppLink key={entry.slug} href={`/ideas/${entry.slug}`} className="idea-index-card">
                <span>{entry.eyebrow}</span>
                <h3>{entry.name}</h3>
                <p>{entry.noteBody}</p>
                <div className="post-card-footer">{entry.ctaLabel}</div>
              </AppLink>
            ))}
        </div>
      </aside>
    </main>
  );
}

function AboutPage() {
  return (
    <main className="workspace-main">
      <section className="post-hero">
        <div>
          <p className="eyebrow">About</p>
          <h2>静かな余白と、読むためのインターフェース。</h2>
          <p className="post-intro">
            Ultrahope Journal は、暖かいダークトーンを保ちながら、記事一覧と本文をひとつの視界に
            共存させるための実験です。IDE のような二層構造を借りながら、ブログをもっと落ち着いて
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
            左のサイドバーは、いまどこを読んでいるかを見失わないための地図です。Recent と Category
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

function PostPage(props: { slug: string }) {
  const post = getPost(props.slug);

  if (!post) {
    return <NotFoundPage slug={props.slug} />;
  }

  const relatedPosts = posts.filter((entry) => entry.slug !== post.slug).slice(0, 2);

  return (
    <main className="workspace-main">
      <section className="post-hero">
        <div>
          <p className="eyebrow">Journal entry</p>
          <h2>{post.title}</h2>
          <p className="post-intro">{post.excerpt}</p>
        </div>
        <dl className="post-meta">
          <dt>Published</dt>
          <dd>{formatDate(post.date)}</dd>
          <dt>Slug</dt>
          <dd>{post.slug}</dd>
        </dl>
      </section>

      <section className="article-shell">
        <article className="article" dangerouslySetInnerHTML={{ __html: post.content }} />
      </section>

      <aside className="more-posts">
        <div className="section-head section-head-compact">
          <div>
            <p className="section-label">Continue reading</p>
            <h2>同じ温度感で、次の記事へ。</h2>
          </div>
        </div>
        <div className="more-posts-grid">
          {relatedPosts.map((entry) => (
            <AppLink key={entry.slug} href={`/posts/${entry.slug}`} className="more-post-link">
              <strong>{entry.title}</strong>
              <span>{formatDate(entry.date)}</span>
            </AppLink>
          ))}
        </div>
      </aside>
    </main>
  );
}

function NotFoundPage(props: { slug: string }) {
  return (
    <main className="workspace-main">
      <section className="empty-state">
        <p className="eyebrow">Not found</p>
        <h2>そのページはまだ静かに準備中です。</h2>
        <p>
          <code>/{props.slug}</code>{" "}
          に対応する記事は見つかりませんでした。左の一覧から別の記事へ移動できます。
        </p>
        <AppLink href="/" className="inline-action">
          Overview に戻る
        </AppLink>
      </section>
    </main>
  );
}

function WebsiteApp() {
  const route = useRoute();

  useEffect(() => {
    if (route.kind === "home") {
      document.title = "Journal | Ultrahope";
      return;
    }

    if (route.kind === "about") {
      document.title = "About | Ultrahope Journal";
      return;
    }

    if (route.kind === "home-variant") {
      const variant = getHomeVariant(route.slug);
      document.title = variant
        ? `${variant.name} | Ultrahope Journal`
        : "Top page concept | Ultrahope Journal";
      return;
    }

    if (route.kind === "post") {
      const post = getPost(route.slug);
      document.title = post ? `${post.title} | Ultrahope Journal` : "Journal | Ultrahope";
      return;
    }

    document.title = "Not Found | Ultrahope Journal";
  }, [route]);

  return (
    <div className="app-frame">
      <div className="page-shell">
        <Sidebar route={route} />
        <section className="workspace-shell">
          <WorkspaceTopbar route={route} />
          {route.kind === "home" && <HomePage />}
          {route.kind === "about" && <AboutPage />}
          {route.kind === "home-variant" && <HomeVariantPage slug={route.slug} />}
          {route.kind === "post" && <PostPage slug={route.slug} />}
          {route.kind === "not-found" && <NotFoundPage slug={route.slug} />}
        </section>
      </div>
    </div>
  );
}

const container = document.getElementById("app");

if (!container) {
  throw new Error("App root not found");
}

createRoot(container).render(
  <StrictMode>
    <>
      <WebsiteApp />
      {import.meta.env.DEV && <Agentation />}
    </>
  </StrictMode>,
);
