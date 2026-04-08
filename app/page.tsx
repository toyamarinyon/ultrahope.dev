import Link from "next/link";
import { formatDate, posts } from "@/lib/content";

export default function Home() {
  const [latestPost, ...otherPosts] = posts;
  const featuredPosts = otherPosts.slice(0, 3);

  return (
    <main className="workspace-main">
      <section className="hero-panel hero-panel-home">
        <div className="hero-copy-block">
          <Link href={`/posts/${latestPost.slug}`} className="latest-post-link">
            <div className="post-card-meta">
              <span>{formatDate(latestPost.date)}</span>
            </div>
            <h2>{latestPost.title}</h2>
            <p className="hero-copy">{latestPost.excerpt}</p>
            <div className="post-card-footer">Read article</div>
          </Link>
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
            <Link key={post.slug} href={`/posts/${post.slug}`} className="post-card">
              <div className="post-card-meta">
                <span>Journal entry</span>
                <span>{formatDate(post.date)}</span>
              </div>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <div className="post-card-footer">Open article</div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
