---
title: Coding Agentと人間のコラボレーションを支えるlinter
publishedAt: "2026-05-06"
---

Coding AgentにFrontendやApplicationのUIを実装してもらうことは、もう特別なことではなくなってきました。

少し前なら、AIにUIを作らせること自体が実験でした。今はNext.jsやTailwind CSSを使った画面実装をCodexに任せることも自然になっています。モデルは強くなり、Harnessも整い、`DESIGN.md`のように設計意図を伝えるプラクティスも少しずつ広がっています。

しかしながら、実際に使っていると小さな困りごともありますよね。

たとえば、CodexにNext.jsとTailwind CSSでUIを作ってもらうと、`globals.css`にglobalなスタイルが増えたり、Tailwindのarbitrary valuesが多用されることは少なくありません。

```css
/* globals.css */
body {
  background: #f7f4ef;
  color: #171614;
}

.portfolio-hero {
  min-height: 100vh;
  padding: 80px 48px;
}

.portfolio-card {
  border-radius: 32px;
  box-shadow: 0 24px 80px rgb(23 22 20 / 16%);
}
```

```tsx
export default function PortfolioHero() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#F7F4EF] px-[48px] py-[80px] text-[#171614]">
      <section className="mx-auto grid max-w-[1680px] gap-[3.75rem] lg:grid-cols-[0.88fr_1.12fr]">
        <div className="flex flex-col justify-center">
          <p className="mb-[2.125rem] text-[0.7rem] font-bold uppercase tracking-[0.36em] text-[#6F6A64]">
            Creative Developer & Designer
          </p>
          <h1 className="max-w-[780px] font-serif text-[clamp(4rem,8vw,8.9rem)] leading-[0.92]">
            Designing digital experiences that feel effortless.
          </h1>
        </div>
        <div className="min-h-[650px] rounded-[32px] bg-[#D7CEC1] shadow-[0_24px_80px_rgba(111,106,100,0.16)]" />
      </section>
    </main>
  );
}
```

もちろん、これは動きます。見た目もそれなりに近づきます。ただ、そのあと人間が調整しようとすると、色や余白や文字間が局所的な値として散らばっていて、まず一度リファクタリングしたくなります。

データ取得でも似たことがあります。`page.tsx`や`layout.tsx`を気軽に`async`にして、ページ全体のローディングが重くなるコードを書きがちです。毎回「ここはこう書いてください」と指示すれば直せますが、毎回同じ注意をするのは少しもったいない。

`frontend.md`のようなガイドを書くこともできます。けれど、もう少し決定論的にしたいと思いました。人間にとってのガイドであり、Agentにとっての実行可能な制約でもあるものが欲しかったのです。

### そういえば、私たちはlinterを持っている

この悩みをCodexへ相談すると、check scriptを作り始めました。

それは確かに動きます。`check-styling.ts`や`check-layout.ts`を書いて、`package.json`に並べれば検証できます。Coding Agentはこういう小さな検証コードを書くのがとても得意です。

ただ、直感的には少し筋が悪い気がしました。

我々はすでにlintという慣れ親しんだワークフローがあります。CIでもローカルでも実行され、エディタにも統合され、問題の場所を指摘するための作法もあります。であれば、独立したcheck scriptを増やすより、ESLintのcustom ruleとして自分の意図をまとめた方が自然ではないかと考えました。

そこで、[eslint-plugin-raula](/projects/eslint-plugin-raula)を作りました。

やりたいことは素朴です。自分がFrontend実装で守ってほしいことをESLint ruleにして、Codexにも人間にも同じ制約を見せます。細かい指示を毎回Promptに書くのではなく、`npm run lint`で決定論的に直すべき場所がわかるようにします。

### ruleを実装ガイドとしても使う

`eslint-plugin-raula`は、Tailwind CSS、global CSS、Next.jsのlayoutに関するruleをまとめており、たとえば、次のようなruleがあります。

- `raula/exhaustive-tailwind-classes`: classNameでarbitrary valuesを避け、canonicalなTailwind utilitiesを使う
- `raula/exhaustive-tailwind-theme-tokens`: CSS custom propertiesを`@theme`内のsupportされたnamespaceに宣言する
- `raula/no-await-in-layout`: `app/**/layout.*`内で`await`しない
- `raula/no-disallowed-global-class-selectors`: allowlistされていないglobal class selectorを増やさない
- `raula/no-document-element-styles-in-css`: `html`や`body`へ直接styleを書かない
- `raula/no-inline-style-prop`: JSXのinline style propを避ける

少しこだわったのは、ruleごとにドキュメントを併記しているところです。

build時にruleのドキュメントから`REFERENCE.md`を生成し、npm packageに含めています。そのため、`npm install -D eslint-plugin-raula`すると、`node_modules`の中に実行用のpluginだけでなく、Agentが読むためのreferenceも入ります。以下のような感じです。

```bash
node_modules/eslint-plugin-raula
├── README.md
├── REFERENCE.md
├── bin
│   └── eslint-plugin-raula.js
├── dist
│   ├── chunk-QBQ2VH72.js
│   ├── css.d.ts
│   ├── css.js
│   ├── index.d.ts
│   ├── index.js
│   ├── next-layout.d.ts
│   ├── next-layout.js
│   ├── tailwind.d.ts
│   └── tailwind.js
├── package.json
└── references
    ├── exhaustive-tailwind-classes.md
    ├── exhaustive-tailwind-theme-tokens.md
    ├── no-await-in-layout.md
    ├── no-disallowed-global-class-selectors.md
    ├── no-document-element-styles-in-css.md
    └── no-inline-style-prop.md
```

ただ、これだけでは、Coding Agentがそのreferenceを読みに行くとは限りません。そこで、次のコマンドを用意しました。

```bash
npx eslint-plugin-raula instruct
```

このコマンドを実行すると、`AGENTS.md`に次のようなブロックを挿入します。

```md
<!-- eslint-plugin-raula-instruct-start -->
<!-- Managed by `eslint-plugin-raula instruct` -->
Before editing files that touch styling, JSX className usage, global CSS selectors, or Next.js layout files, read:
`./node_modules/eslint-plugin-raula/REFERENCE.md`
This block is supplemental and should complement, not override, local project instructions.
<!-- eslint-plugin-raula-instruct-end -->
```

`postinstall`で自動的に入れることもできますし、その方が便利な場面もあると思います。ただ、個人的にはinstall時に勝手にファイルを書き換える振る舞いがあまり好きではないので、今回は明示的に一手間かける形にしました。

### 「あるとき」と「ないとき」で何が変わるか

このpluginが本当にAgentの出力に影響するのかを見るために、小さな検証をしました。

サンプルアプリケーションを2つ用意し、片方には`eslint-plugin-raula`と`AGENTS.md`の参照を入れ、もう片方には入れません。そのうえで、同じ画像と同じPromptをCodexに渡しました。

参照画像には、ChatGPT Images 2.0で`the firstview of aesthetic portfolio website`というPromptから生成した画像を使いました。

![aesthetic portfolio websiteの参照画像](/eslint-plugin-raula-coding-agent/reference.png)

Codexに渡したPromptは次のものです。参照画像に寄せてfirst viewを作ってもらいつつ、テーマトークンとして`background`、`foreground`、`primary`、`muted`、`border`などの色を渡しています。

```prompt
Update [page.tsx](app/page.tsx) to the welcome page of aesthetic portfolio website like attached one.
Use following theme tokens:
| Token                    |       Hex |
| ------------------------ | --------: |
| `background`             | `#F7F4EF` |
| `foreground`             | `#171614` |
| `card`                   | `#EEE9E1` |
| `card-foreground`        | `#171614` |
| `popover`                | `#F7F4EF` |
| `popover-foreground`     | `#171614` |
| `primary`                | `#171614` |
| `primary-foreground`     | `#FFFFFF` |
| `secondary`              | `#EEE9E1` |
| `secondary-foreground`   | `#2B2926` |
| `muted`                  | `#DEDAD3` |
| `muted-foreground`       | `#6F6A64` |
| `accent`                 | `#B79A83` |
| `accent-foreground`      | `#171614` |
| `destructive`            | `#8F3A2F` |
| `destructive-foreground` | `#FFFFFF` |
| `border`                 | `#DEDAD3` |
| `input`                  | `#DEDAD3` |
| `ring`                   | `#A89F96` |
| `chart-1`                | `#171614` |
| `chart-2`                | `#B79A83` |
| `chart-3`                | `#D7CEC1` |
| `chart-4`                | `#A89F96` |
| `chart-5`                | `#6F6A64` |
```

pluginがない方では、色や文字間にarbitrary valuesが多く出ました。

```tsx
function HeroHeader() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#F7F4EF] text-[#171614]">
      <header className="border-b border-[#DEDAD3]">
        <nav className="mx-auto flex max-w-[1680px] items-center justify-between px-5 py-5">
          <span className="hidden text-xs font-semibold uppercase tracking-[0.42em] text-[#2B2926] sm:block">
            Avery Wilde
          </span>
          <a className="rounded-lg bg-[#171614] px-6 py-4 text-sm font-medium text-[#FFFFFF]">
            Let&apos;s work together
          </a>
        </nav>
      </header>
    </main>
  );
}
```

これはPromptで渡した色に忠実ではあります。しかし、`#F7F4EF`や`#2B2926`がUIのあちこちに直接埋め込まれるので、あとからテーマとして扱いにくくなります。

pluginがある方では、同じような箇所がtheme tokenを使う形になりました。

```tsx
function HeroHeader() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
          <span className="hidden text-xs font-semibold uppercase tracking-widest text-secondary-foreground sm:block">
            Avery Wilde
          </span>
          <a className="rounded-lg bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground">
            Let&apos;s work together
          </a>
        </nav>
      </header>
    </main>
  );
}
```

また、`globals.css`には渡したtheme tokenが`@theme`としてまとまっていました。

```css
@theme {
  --color-background: #f7f4ef;
  --color-foreground: #171614;
  --color-card: #eee9e1;
  --color-card-foreground: #171614;
  --color-primary: #171614;
  --color-primary-foreground: #ffffff;
  --color-border: #dedad3;
  --color-ring: #a89f96;
}
```

面白いのは、pluginが「完成したデザインの良し悪し」を直接保証しているわけではないことです。画像にどれくらい似ているか、余白が気持ちよいか、情報設計がよいかは、別の観点として残ります。

ただ、少なくとも「あとから人間が触りやすい形に寄せる」ことはできていました。色はtheme tokenに寄り、arbitrary valuesは減り、global CSSへの責務も見えやすくなります。Agentの出力が、最初からプロジェクトの型に少し近づく感覚があります。

### Agent向けの制約を、いつもの開発体験に置く

`eslint-plugin-raula`が万人に必要なpluginだとは思っていません。

どの程度arbitrary valuesを許すか、`globals.css`に何を書くか、`layout.tsx`でどこまで処理するかは、チームやプロダクトによって違います。私の好みをそのまま全員に使ってほしいという話ではありません。

ただ、このアプローチはなかなかよいと思っています。

Coding Agentは、すぐに実装できます。さらに、決定論的に検証するコードもすぐに書けます。その結果、気づくと`package.json`に`check1.ts`、`check2.ts`、`check-styling.ts`のようなscriptが増えていくことがあります。

もちろん、それで救われる場面もあります。けれど、すでにlintという枯れた技術があるなら、そこにAgent向けの制約を載せる方が、開発体験として自然に続けやすいのではないでしょうか。

任天堂の技術者である横井軍平さんの「枯れた技術の水平思考」という言葉があります。新しい問題を、必ずしも新しい仕組みだけで解く必要はありません。Coding Agent時代のコード生成という新しい問題に対して、ESLint custom ruleという慣れ親しんだ仕組みを横に使う。そう考えると、かなり手触りがよいです。

ruleからドキュメントを生成することで、ruleをSSOTにできます。`AGENTS.md`にはそのreferenceへの導線だけを書きます。Agentは実装前に読むことができ、人間はlint結果として確認でき、CIでは決定論的に落とせます。

指示だけではなく、実行できる制約にする。

Coding Agentと一緒にFrontendを書いていて、毎回同じ直しをしている感覚があるなら、その違和感はeslint-pluginにできるかもしれません。

みなさんも、自分やチームのためのeslint-pluginを作ってみると面白いと思います。
