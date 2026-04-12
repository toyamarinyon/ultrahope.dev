import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MarkdownRenderer } from "@/components/markdown-renderer";
import {
  formatWritingDate,
  getWritingArticle,
  getWritingSlugs,
  hasWritingLocale,
  parseWritingLocale,
  type WritingLocale,
} from "@/lib/writing";

type WritingPageProps = {
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

function writingHref(slug: string, locale: WritingLocale) {
  return locale === "en" ? `/writing/${slug}?lang=en` : `/writing/${slug}`;
}

export function generateStaticParams() {
  return getWritingSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
  searchParams,
}: WritingPageProps): Promise<Metadata> {
  const { slug } = await params;
  const locale = parseWritingLocale((await searchParams).lang);
  const article = getWritingArticle(slug, locale);

  if (!article) {
    notFound();
  }

  return {
    title: article.title,
    description: article.description,
  };
}

export default async function WritingArticlePage({
  params,
  searchParams,
}: WritingPageProps) {
  const { slug } = await params;
  const requestedLocale = parseWritingLocale((await searchParams).lang);
  const article = getWritingArticle(slug, requestedLocale);

  if (!article) {
    notFound();
  }

  const hasEnglish = hasWritingLocale(slug, "en");
  const hasJapanese = hasWritingLocale(slug, "ja");
  const currentLocale = article.locale;
  const bodyMarkdown = stripLeadingDuplicateH1(article.content, article.title);

  return (
    <main className="workspace-main">
      <section className="post-hero">
        <div>
          <p className="eyebrow">Writing</p>
          <h2>{article.title}</h2>
          {article.description ? (
            <p className="post-intro">{article.description}</p>
          ) : null}
        </div>
        <dl className="post-meta">
          <dt>Language</dt>
          <dd>{currentLocale === "en" ? "English" : "日本語"}</dd>
          <dt>Published</dt>
          <dd>{formatWritingDate(article.publishedAt, currentLocale)}</dd>
        </dl>
      </section>

      <section className="article-shell">
        <div className="writing-language-switch">
          {hasJapanese ? (
            <Link
              href={writingHref(slug, "ja")}
              className={`topbar-chip ${currentLocale === "ja" ? "is-active" : ""}`}
            >
              日本語
            </Link>
          ) : null}
          {hasEnglish ? (
            <Link
              href={writingHref(slug, "en")}
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
