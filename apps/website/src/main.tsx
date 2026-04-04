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
    month: "long",
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

function AppLink(props: { href: string; className?: string; children: ReactNode }) {
  return (
    <a
      href={props.href}
      className={props.className}
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

function Header() {
  return (
    <header className="site-header">
      <AppLink href="/" className="brand">
        <span className="brand-mark">Ultrahope Journal</span>
        <span className="brand-name">Quiet glow for builders.</span>
      </AppLink>
      <nav className="header-nav" aria-label="Primary">
        <AppLink href="/" className="nav-link">
          Home
        </AppLink>
        <a href="https://ultrahope.dev" className="nav-link" target="_blank" rel="noreferrer">
          Ultrahope
        </a>
        <AppLink href="/posts/quiet-glow" className="nav-pill">
          Read the journal
        </AppLink>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <p className="footer-copy">静かな余白と、読み心地の良い文章でつくるプロダクトノート。</p>
      <div className="footer-links">
        <AppLink href="/">Journal</AppLink>
        <a href="https://github.com/toyamarinyon/ultrahope" target="_blank" rel="noreferrer">
          GitHub
        </a>
      </div>
    </footer>
  );
}

function HomePage() {
  return (
    <main className="home-main">
      <section className="hero">
        <div className="hero-grid">
          <div>
            <p className="eyebrow">Not radiance - a quiet glow.</p>
            <h1>Journal for calm, opinionated software work.</h1>
            <p className="hero-copy">
              <code>../ultrahope/packages/web</code>{" "}
              の暖かいダークトーンと抑制した空気感を引き継ぎつつ、こちらではブログとして読ませる余白と長文向けのリズムを前面に出しました。
            </p>
          </div>
          <aside className="hero-note">
            <strong>Editorial Note</strong>
            <p>クラシックなセリフ体、ウォームなキャンバス、少しだけ光るアクセント。</p>
            <p>派手に見せるより、長く眺めて気持ちいいページを目指しています。</p>
          </aside>
        </div>

        <dl className="hero-panel">
          <div>
            <dt>Tone</dt>
            <dd>Warm dark, quiet contrast, generous spacing.</dd>
          </div>
          <div>
            <dt>Reading</dt>
            <dd>一覧から詳細まで、視線が流れるような記事導線。</dd>
          </div>
          <div>
            <dt>Format</dt>
            <dd>シンプルなクライアントサイド遷移で、静的サイトとして扱いやすい構成。</dd>
          </div>
        </dl>
      </section>

      <section className="feature-grid" aria-label="Highlights">
        <article className="feature-card">
          <h2>Quiet hierarchy</h2>
          <p>見出しだけが強く、本文は静かに支える。情報の階層を色よりタイポで作ります。</p>
        </article>
        <article className="feature-card">
          <h2>Editorial rhythm</h2>
          <p>カード一覧は軽く、詳細ページは紙面のように。読む場所ごとにテンポを切り替えます。</p>
        </article>
        <article className="feature-card">
          <h2>Warm canvas</h2>
          <p>
            黒ではなく、少し茶色い夜の色。<code>Ultrahope</code>{" "}
            側のトーンをブログ向けに少し柔らかくしました。
          </p>
        </article>
      </section>

      <section aria-labelledby="latest-posts">
        <div className="section-head">
          <h2 id="latest-posts">Latest posts</h2>
          <p>今ある記事データをそのまま使って、一覧と詳細を一続きの体験として見せます。</p>
        </div>
        <div className="post-grid">
          {posts.map((post) => (
            <AppLink key={post.slug} href={`/posts/${post.slug}`} className="post-card">
              <div className="post-card-meta">
                <span>Journal entry</span>
                <span>{formatDate(post.date)}</span>
              </div>
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
              <div className="post-card-footer">Read article</div>
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
    <main className="post-main">
      <AppLink href="/" className="back-link">
        ← Back to journal
      </AppLink>

      <section className="post-hero">
        <div>
          <p className="eyebrow">Journal entry</p>
          <h1>{post.title}</h1>
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
        <h2>Continue reading</h2>
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
    <main className="post-main">
      <section className="post-hero">
        <div>
          <p className="eyebrow">Not found</p>
          <h1>そのページはまだ静かに準備中です。</h1>
          <p className="post-intro">
            <code>/{props.slug}</code>{" "}
            に対応する記事は見つかりませんでした。ジャーナル一覧から別の記事へ移動できます。
          </p>
          <AppLink href="/" className="back-link">
            ← Return home
          </AppLink>
        </div>
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
    <div className="page-shell">
      <Header />
      {route.kind === "home" && <HomePage />}
      {route.kind === "post" && <PostPage slug={route.slug} />}
      {route.kind === "not-found" && <NotFoundPage slug={route.slug} />}
      <Footer />
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
