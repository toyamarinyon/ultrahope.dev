import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MarkdownRenderer } from "@/components/markdown-renderer";
import {
  formatWiringDate,
  getWiringArticle,
  getWiringSlugs,
  hasWiringLocale,
  parseWiringLocale,
  type WiringLocale,
} from "@/lib/wiring";

type WiringPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lang?: string | string[] }>;
};

function stripLeadingDuplicateH1(markdown: string, title: string) {
  const match = markdown.match(/^(\s*#\s+(.+?)\s*#*\s*\n)/);
  if (!match) {
    return markdown;
  }

  const headingText = match[2]?.trim();
  if (headingText !== title.trim()) {
    return markdown;
  }

  return markdown.slice(match[1].length).replace(/^\s*\n+/, "");
}

function wiringHref(slug: string, locale: WiringLocale) {
  return locale === "en" ? `/wiring/${slug}?lang=en` : `/wiring/${slug}`;
}

export function generateStaticParams() {
  return getWiringSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
  searchParams,
}: WiringPageProps): Promise<Metadata> {
  const { slug } = await params;
  const locale = parseWiringLocale((await searchParams).lang);
  const article = getWiringArticle(slug, locale);

  if (!article) {
    notFound();
  }

  return {
    title: article.title,
    description: article.description,
  };
}

export default async function WiringArticlePage({
  params,
  searchParams,
}: WiringPageProps) {
  const { slug } = await params;
  const requestedLocale = parseWiringLocale((await searchParams).lang);
  const article = getWiringArticle(slug, requestedLocale);

  if (!article) {
    notFound();
  }

  const hasEnglish = hasWiringLocale(slug, "en");
  const hasJapanese = hasWiringLocale(slug, "ja");
  const currentLocale = article.locale;
  const bodyMarkdown = stripLeadingDuplicateH1(article.content, article.title);

  return (
    <main className="workspace-main">
      <section className="post-hero">
        <div>
          <p className="eyebrow">Wiring</p>
          <h2>{article.title}</h2>
          {article.description ? (
            <p className="post-intro">{article.description}</p>
          ) : null}
        </div>
        <dl className="post-meta">
          <dt>Language</dt>
          <dd>{currentLocale === "en" ? "English" : "日本語"}</dd>
          <dt>Published</dt>
          <dd>{formatWiringDate(article.publishedAt, currentLocale)}</dd>
        </dl>
      </section>

      <section className="article-shell">
        <div className="wiring-language-switch">
          {hasJapanese ? (
            <Link
              href={wiringHref(slug, "ja")}
              className={`topbar-chip ${currentLocale === "ja" ? "is-active" : ""}`}
            >
              日本語
            </Link>
          ) : null}
          {hasEnglish ? (
            <Link
              href={wiringHref(slug, "en")}
              className={`topbar-chip ${currentLocale === "en" ? "is-active" : ""}`}
            >
              English
            </Link>
          ) : null}
        </div>

        <article className="article">
          <MarkdownRenderer markdown={bodyMarkdown} />
        </article>
      </section>
    </main>
  );
}
