---
title: HTML for Humans, Markdown for Agents
publishedAt: "2026-05-07"
---

I want this site to be a place for my own writing, but also a place that is easy for Coding Agents to read.

For a human reader, it is enough for the page to be rendered nicely as HTML. But when an agent reads the same page, things like navigation, stylesheets, JavaScript, and footer links are unnecessary.

This site is built with Next.js and deployed to Vercel, so I looked around assuming Vercel might already have a good pattern for this. I found [Making agent-friendly pages with content negotiation](https://vercel.com/blog/making-agent-friendly-pages-with-content-negotiation) and the Knowledge Base guide [How to serve documentation for agents](https://vercel.com/kb/guide/how-to-serve-documentation-for-agents).

That was exactly what I was looking for, so I tried implementing it.

If you open a terminal and run the following command, you can see the Markdown version of this page.

```bash
curl -H "Accept: text/markdown" https://ultrahope.dev/writing/html-for-humans-markdown-for-agents
```

### Serving HTML and Markdown from the same URL

Vercel's article assumes that an agent sends an `Accept` header like this:

```http
Accept: text/markdown, text/html, */*
```

By putting `text/markdown` first, the agent is saying that it would prefer Markdown if Markdown is available.

Instead of asking the agent to remember a separate URL like `/writing/foo.md`, the agent can request the same `/writing/foo` URL as a browser. The server then returns either HTML or Markdown depending on the header. This is content negotiation.

What I like about this approach is that the agent does not need to know any site-specific URL convention. The URL a human sees and the URL an agent reads are the same, so the canonical resource can stay in one place.

### Do not read headers in page.tsx

Before reading Vercel's article, the first idea I had was to inspect the request headers in the Next.js `page.tsx` and return Markdown when `Accept: text/markdown` was present.

But as soon as I thought of it, it felt like the wrong approach.

If `page.tsx` reads `headers()`, that route depends on request-time information. The current `/writing/[slug]` route can be statically generated with `generateStaticParams()`, and I want to keep the HTML page as SSG. Making the human-facing HTML page more dynamic just to support agents feels wasteful.

The implementation in Vercel's article does not branch inside `page.tsx` either.

Instead, `next.config.ts` checks the `Accept` header in a rewrite and internally routes the request to a Markdown Route Handler.

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/writing/:slug",
          has: [
            {
              type: "header",
              key: "accept",
              value: ".*text/markdown.*",
            },
          ],
          destination: "/writing/md/:slug",
        },
        {
          source: "/ja/writing/:slug",
          has: [
            {
              type: "header",
              key: "accept",
              value: ".*text/markdown.*",
            },
          ],
          destination: "/ja/writing/md/:slug",
        },
      ],
    };
  },
};

export default nextConfig;
```

When a browser accesses the page normally, `/writing/[slug]/page.tsx` still returns HTML. Only when an agent sends `Accept: text/markdown` does the request get internally rewritten to `/writing/md/[slug]`.

It is satisfying when rewrites fit this cleanly.

With this setup, the HTML page can stay static as an HTML page, and the Markdown response can be isolated in a Route Handler. The responsibilities are clear.

### Create a Markdown Route Handler

The articles on this site are already written as Markdown files, such as `writing/<slug>/ja.md` and `en.md`.

That means there is no need to convert rich text from a CMS into Markdown. The Route Handler can read the existing Markdown body, add frontmatter that is useful for agents, and return it.

```ts
export function generateStaticParams() {
  return getWritingMarkdownStaticParams("en");
}

export async function GET(_: Request, { params }: WritingMarkdownRouteProps) {
  const { slug } = await params;
  const markdown = getWritingMarkdown(slug, "en");

  if (!markdown) {
    return new Response("# Not Found\n", {
      status: 404,
      headers,
    });
  }

  return new Response(markdown, { headers });
}
```

At minimum, the response needs a `Content-Type` header.

```ts
const markdownResponseHeaders = {
  "Content-Type": "text/markdown; charset=utf-8",
  Vary: "Accept",
};
```

`Vary: Accept` is also important.

The same URL can return either HTML or Markdown depending on the `Accept` header. If caches do not know that, a shared cache could return the Markdown version to a browser, or the HTML version to an agent.

### Add sitemap.md

Vercel's Knowledge Base guide also introduces `sitemap.md`, so agents can understand where to look next.

I added a route that returns the article list as Markdown.

```md
# Writing Sitemap

- [A linter for collaboration between Coding Agents and humans](/writing/eslint-plugin-raula-coding-agent) - 2026-05-06
- [Install the Google Cloud CLI with Python managed by mise](/writing/gcloud-cli-mise-python) - 2026-05-04
- [Getting Started with Hermes Agent Using mise](/writing/hermes-agent-mise) - 2026-05-02
```

This is less a sitemap for humans and more an entry point for agents. If the current article is not enough, an agent can continue to related writing.

The `sitemap.md` Route Handler does not depend on the request, so I explicitly made it static.

```ts
export const dynamic = "force-static";
```

Route Handlers in Next.js are a little different from regular pages. By default, they are treated as request-time handlers. But when a `GET` handler does not read request-dependent information, `force-static` can make it static.

In this case, `sitemap.md` is determined only from local Markdown metadata, so static is enough.

### Check the build output

After implementing this, I checked it with `bun --filter web build`.

The article HTML pages remain SSG:

```text
● /writing/[slug]
● /ja/writing/[slug]
```

The Markdown Route Handlers are also SSG through `generateStaticParams()`:

```text
● /writing/md/[slug]
● /ja/writing/md/[slug]
```

And `sitemap.md` is static because of `force-static`:

```text
○ /writing/sitemap.md
○ /ja/writing/sitemap.md
```

I also checked it with `curl`.

```bash
curl -H "Accept: text/markdown" https://ultrahope.dev/writing/hermes-agent-mise
```

That request returns Markdown. A normal browser request returns HTML.

It is nice that making the site agent-friendly does not require sacrificing the human-facing page.

### Agent-friendly web pages do not have to be special

The implementation itself is not large.

Add a rewrite that looks at the `Accept` header, create a Route Handler that returns Markdown, and add a `sitemap.md` discovery point. That is all.

But the idea is interesting.

Humans get HTML. Agents get Markdown. Both are looking at the same resource, but the representation changes to match what each reader can use more easily. That difference is handled by HTTP content negotiation, a mechanism that has been part of the web for a long time.

We do not necessarily need to create a special API for new agents. There is still a lot of room in the existing shape of the web.

If your site or documentation is already written in Markdown, this is a small place to start.

First, make one article return a clean body for `curl -H "Accept: text/markdown"`. Even that small change can make the outline of the site a little easier for agents to read.
