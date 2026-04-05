import { StrictMode, type ReactNode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { getPost, posts } from "./posts";
import "./style.css";

type Route =
  | { kind: "home" }
  | { kind: "post"; slug: string }
  | { kind: "not-found"; slug: string };

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

  return (
    <aside className="workspace-sidebar">
      <section className="sidebar-brand-block">
        <p className="sidebar-kicker">Ultrahope Journal</p>
        <AppLink
          href="/"
          className="sidebar-brand"
          ariaCurrent={props.route.kind === "home" ? "page" : undefined}
        >
          Quiet glow for builders.
        </AppLink>
        <p className="sidebar-copy">
          今の暖かいダークトーンは維持しつつ、読む体験を IDE のような二層構造に整理しました。
        </p>
      </section>

      <nav className="sidebar-nav" aria-label="Main">
        <AppLink
          href="/"
          className={`sidebar-nav-link ${props.route.kind === "home" ? "is-active" : ""}`}
          ariaCurrent={props.route.kind === "home" ? "page" : undefined}
        >
          Overview
        </AppLink>
        <a
          href="https://ultrahope.dev"
          className="sidebar-nav-link"
          target="_blank"
          rel="noreferrer"
        >
          Ultrahope
        </a>
      </nav>

      <section className="sidebar-section">
        <div className="sidebar-section-head">
          <p>Journal entries</p>
          <span>{posts.length}</span>
        </div>

        <div className="sidebar-thread-list">
          {posts.map((post) => (
            <AppLink
              key={post.slug}
              href={`/posts/${post.slug}`}
              className={`thread-link ${activeSlug === post.slug ? "is-active" : ""}`}
              ariaCurrent={activeSlug === post.slug ? "page" : undefined}
            >
              <div className="thread-link-meta">
                <span>Entry</span>
                <span>{formatDate(post.date)}</span>
              </div>
              <strong>{post.title}</strong>
              <p>{post.excerpt}</p>
            </AppLink>
          ))}
        </div>
      </section>

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
  const title =
    props.route.kind === "home"
      ? "Overview"
      : props.route.kind === "post"
        ? (getPost(props.route.slug)?.title ?? "Journal entry")
        : "Not found";

  const subtitle =
    props.route.kind === "home"
      ? "Sidebar + main content"
      : props.route.kind === "post"
        ? "Journal entry"
        : "Unavailable route";

  return (
    <header className="workspace-topbar">
      <div>
        <p className="topbar-kicker">{subtitle}</p>
        <h1>{title}</h1>
      </div>
      <div className="topbar-actions" aria-label="Context">
        <span className="topbar-chip">Warm dark</span>
        <span className="topbar-chip">Editorial UI</span>
        <span className="topbar-chip">React + Vite+</span>
      </div>
    </header>
  );
}

function HomePage() {
  return (
    <main className="workspace-main">
      <section className="hero-panel hero-panel-home">
        <div className="hero-copy-block">
          <p className="eyebrow">Not radiance, a quiet glow.</p>
          <h2>ブログを、静かな IDE みたいに読む。</h2>
          <p className="hero-copy">
            左側には記事一覧と短い要約、右側には導入や本文。既存の暖かい空気感は残したまま、視線の置き場所がすぐ分かるレイアウトへ寄せています。
          </p>
        </div>
        <div className="hero-note">
          <strong>Layout note</strong>
          <p>サイドバーは記事インデックス。</p>
          <p>メインカラムは導入、本文、関連記事のための静かなキャンバスです。</p>
        </div>
      </section>

      <section className="insight-grid" aria-label="Highlights">
        <article className="insight-card">
          <span>Tone</span>
          <h3>Warm canvas</h3>
          <p>黒ではなく、少し茶色い夜の色。今のテイストをそのまま外枠へ広げています。</p>
        </article>
        <article className="insight-card">
          <span>Structure</span>
          <h3>Sidebar first</h3>
          <p>一覧と本文を同じ画面に共存させ、読む前の比較と読んでいる最中の没入を両立します。</p>
        </article>
        <article className="insight-card">
          <span>Rhythm</span>
          <h3>Editorial motion</h3>
          <p>カードは軽く、本文は重く。記事に入るほど密度が上がるように情報量を設計しています。</p>
        </article>
      </section>

      <section className="content-section">
        <div className="section-head">
          <div>
            <p className="section-label">Latest posts</p>
            <h2>メインコンテンツでは、今読むべき記事を大きく見せる。</h2>
          </div>
          <p>
            一覧は左に常設したので、右側では要約と導入を少し贅沢に使えます。ホームでは記事カードを大きめに並べ、入り口を明確にしました。
          </p>
        </div>

        <div className="post-grid">
          {posts.map((post) => (
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
    <WebsiteApp />
  </StrictMode>,
);
