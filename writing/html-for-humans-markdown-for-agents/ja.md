---
title: 人間にHTML、エージェントにMarkdown
publishedAt: "2026-05-07"
---

このサイトは、自分のための文章置き場でありつつ、Coding Agentにも読みやすい場所にしておきたいと思っています。

人間が読むページとしては、HTMLで読み心地よく表示されていれば十分です。しかし、Agentが同じページを読むときには、navigation、stylesheet、JavaScript、footerなどは不要です。

このサイトはNext.jsで構築しVercelにdeployしているので、Vercelが何かいい方法を考えているだろうと調べたところ、[Making agent-friendly pages with content negotiation](https://vercel.com/blog/making-agent-friendly-pages-with-content-negotiation)と、Knowledge Baseの[How to serve documentation for agents](https://vercel.com/kb/guide/how-to-serve-documentation-for-agents)を見つけました。

これがまさしくだったのでやってみました。

試しに、ターミナルを開いて次のように入力すると、このページのMarkdownが表示されます。

```bash
curl -H "Accept: text/markdown" https://ultrahope.dev/ja/writing/html-for-humans-markdown-for-agents
```

### 同じURLで、HTMLとMarkdownを出し分ける

Vercelの記事では、Agentが次のような`Accept` headerを送る前提で説明されています。

```http
Accept: text/markdown, text/html, */*
```

`text/markdown`を先に書くことで、Markdownがあればそれを優先してほしい、という意思表示になります。

このとき、`/writing/foo.md`のような別URLをAgentに覚えてもらうのではなく、ブラウザと同じ`/writing/foo`にrequestしてもらい、headerに応じてHTMLかMarkdownを返します。これがcontent negotiationです。

この考え方がよいのは、Agentがサイト固有のURL規則を知らなくてもよいところです。人間が見るURLと、Agentが読むURLが同じなので、canonicalなresourceは一つのままにできます。

### page.tsxでheadersを読まない

Vercelの記事を読む前に自分で最初に考えたのは、Next.jsの`page.tsx`でrequest headerを見て、`Accept: text/markdown`ならMarkdownを返す方法でした。

ただ、思いついたと同時にこれは良くないアプローチだと思いました。

`page.tsx`で`headers()`を読むと、そのrouteはrequest-timeの情報に依存します。今回の`/writing/[slug]`は`generateStaticParams()`で静的に生成できているので、HTMLページはそのままSSGにしておきたいです。Agent向け対応のために、人間向けのHTML配信をdynamic寄りにするのは少しもったいない。

Vercelの記事で紹介されていた実装も、`page.tsx`で分岐するものではありませんでした。

`next.config.ts`のrewriteで`Accept` headerを見て、Markdown用のRoute Handlerへ内部的に流します。

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

ブラウザから普通にアクセスした場合は、これまで通り`/writing/[slug]/page.tsx`がHTMLを返します。Agentが`Accept: text/markdown`を送ってきた場合だけ、内部的に`/writing/md/[slug]`へrewriteされます。

rewriteを上手に使えている気がして嬉しいですね。

これでHTML pageはHTML pageとして静的に保ち、Markdown responseはMarkdown responseとしてRoute Handlerに閉じ込める。実装の責務がはっきりします。

### Markdown用のRoute Handlerを作る

このサイトの記事は、もともと`apps/web/writing/<slug>/ja.md`や`en.md`としてMarkdownで書いています。

そのため、CMSのrich textをMarkdownへ変換する必要はありません。既存のMarkdown本文を読み、Agentが扱いやすいようにfrontmatterを付け直して返すだけです。

```ts
export function generateStaticParams() {
  return getWritingMarkdownStaticParams("ja");
}

export async function GET(_: Request, { params }: WritingMarkdownRouteProps) {
  const { slug } = await params;
  const markdown = getWritingMarkdown(slug, "ja");

  if (!markdown) {
    return new Response("# Not Found\n", {
      status: 404,
      headers,
    });
  }

  return new Response(markdown, { headers });
}
```

response headerには、少なくとも`Content-Type`を付けます。

```ts
const markdownResponseHeaders = {
  "Content-Type": "text/markdown; charset=utf-8",
  Vary: "Accept",
};
```

`Vary: Accept`も大事です。

同じURLでも、`Accept` headerによってHTMLとMarkdownのどちらが返るかが変わります。そのことをcacheに伝えないと、共有cacheがMarkdown版をブラウザに返したり、逆にHTML版をAgentに返したりする可能性があります。

### sitemap.mdを置く

VercelのKnowledge Baseでは、Agentが次にどこを読めばよいか分かるように`sitemap.md`を用意することも紹介されています。

このサイトでも、記事一覧をMarkdownで返すrouteを追加しました。

```md
# Writing Sitemap

- [A linter for collaboration between Coding Agents and humans](/writing/eslint-plugin-raula-coding-agent) - 2026-05-06
- [Install the Google Cloud CLI with Python managed by mise](/writing/gcloud-cli-mise-python) - 2026-05-04
- [Getting Started with Hermes Agent Using mise](/writing/hermes-agent-mise) - 2026-05-02
```

これは人間向けのsitemapというより、Agent向けの探索入口です。目的の記事だけでは足りなかったときに、関連する文章へ進めます。

`sitemap.md`のRoute Handlerはrequestに依存しないので、明示的に静的化しました。

```ts
export const dynamic = "force-static";
```

Next.jsのRoute Handlerは、通常のpageとは少し違って、デフォルトではrequest時に実行されるものとして扱われます。ただし、`GET`でrequest依存の情報を読まない場合は、`force-static`によって静的にできます。

今回の`sitemap.md`はローカルのMarkdown metadataから決まるだけなので、静的で十分です。

### build結果で確認する

実装後、`bun --filter web build`で確認しました。

記事のHTML pageはこれまで通りSSGです。

```text
● /writing/[slug]
● /ja/writing/[slug]
```

Markdown用のRoute Handlerも`generateStaticParams()`によってSSGになりました。

```text
● /writing/md/[slug]
● /ja/writing/md/[slug]
```

`sitemap.md`も、`force-static`を付けたことで静的になっています。

```text
○ /writing/sitemap.md
○ /ja/writing/sitemap.md
```

また、実際に`curl`でも確認しました。

```bash
curl -H "Accept: text/markdown" https://ultrahope.dev/writing/hermes-agent-mise
```

このrequestではMarkdownが返ります。一方で、通常のブラウザアクセスではHTMLが返ります。

Agent-friendlyにするために、人間向けのpageを犠牲にしなくてよい。この形にできたのは、かなりよかったと思います。

### AgentにやさしいWebは、特別なWebではない

今回やったことは、それほど大きな実装ではありません。

`Accept` headerを見るrewriteを足し、Markdownを返すRoute Handlerを用意し、探索用の`sitemap.md`を置く。それだけです。

ただ、考え方としては面白いです。

人間にはHTMLを返す。AgentにはMarkdownを返す。どちらも同じresourceを見ているけれど、受け取りやすい表現は違う。その違いをHTTPのcontent negotiationという昔からある仕組みに載せる。

新しいAgentのために、必ずしも特別なAPIを増やす必要はありません。既存のWebの作法の中にも、まだ使える余地があります。

自分のサイトやドキュメントがすでにMarkdownで書かれているなら、これはかなり小さく始められる対応だと思います。

まずは一つの記事で、`curl -H "Accept: text/markdown"`にきれいな本文が返るようにしてみる。それだけでも、Agentから見たサイトの輪郭は少し読みやすくなるはずです。
