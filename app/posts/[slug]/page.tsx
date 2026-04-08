import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDate, getPost, posts } from "@/lib/content";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    return {
      title: "Not Found",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    notFound();
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
        <article
          className="article"
          /* biome-ignore lint/security/noDangerouslySetInnerHtml: post content is authored in a local static module */
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
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
            <Link key={entry.slug} href={`/posts/${entry.slug}`} className="more-post-link">
              <strong>{entry.title}</strong>
              <span>{formatDate(entry.date)}</span>
            </Link>
          ))}
        </div>
      </aside>
    </main>
  );
}
