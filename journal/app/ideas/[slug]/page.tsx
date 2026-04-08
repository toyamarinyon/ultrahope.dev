import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getHomeVariant, homeVariants } from "@/lib/content";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return homeVariants.map((variant) => ({ slug: variant.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const variant = getHomeVariant(slug);

  if (!variant) {
    return {
      title: "Not Found",
    };
  }

  return {
    title: variant.name,
    description: variant.intro,
  };
}

export default async function HomeVariantPage({ params }: Props) {
  const { slug } = await params;
  const variant = getHomeVariant(slug);

  if (!variant) {
    notFound();
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
              <Link key={entry.slug} href={`/ideas/${entry.slug}`} className="idea-index-card">
                <span>{entry.eyebrow}</span>
                <h3>{entry.name}</h3>
                <p>{entry.noteBody}</p>
                <div className="post-card-footer">{entry.ctaLabel}</div>
              </Link>
            ))}
        </div>
      </aside>
    </main>
  );
}
