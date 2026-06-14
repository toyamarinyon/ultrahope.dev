---
title: A linter for collaboration between Coding Agents and humans
publishedAt: "2026-05-06"
---

Asking a Coding Agent to implement frontend and application UI no longer feels unusual.

Not long ago, having AI build UI was itself an experiment. Now it feels natural to ask Codex to build screens with Next.js and Tailwind CSS. Models have improved, harnesses have become better, and practices like `DESIGN.md` are starting to spread as a way to communicate design intent.

Still, when I use these tools in real projects, I keep running into small frictions.

For example, when I ask Codex to build UI with Next.js and Tailwind CSS, it often adds global styling to `globals.css` or uses Tailwind arbitrary values heavily.

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

Of course, this works. It can even look reasonably close to what I asked for. But when a human comes back later to adjust it, colors, spacing, letter spacing, and shadows are scattered as local values. Before making the actual change, I often want to refactor the output first.

I see a similar problem around data fetching. A Coding Agent may casually make `page.tsx` or `layout.tsx` async, and the page can become slower to load as a result. I can keep saying “please write this part this way,” but repeating the same instructions every time feels wasteful.

I could write a guide like `frontend.md`. But I wanted something a bit more deterministic: a guide for humans that is also an executable constraint for Agents.

### We Already Have Linters

When I discussed this with Codex, it started writing check scripts.

That approach works. You can write `check-styling.ts` or `check-layout.ts`, add them to `package.json`, and validate the code. Coding Agents are very good at writing small verification scripts like that.

But intuitively, it felt slightly off.

We already have a familiar workflow called linting. It runs in CI and locally, integrates with editors, and has established conventions for pointing to problematic code. Instead of adding more standalone check scripts, it felt more natural to express my intent as ESLint custom rules.

So I built [eslint-plugin-raula](/projects/eslint-plugin-raula).

The idea is simple. I encode the frontend implementation rules I care about as ESLint rules, and expose the same constraints to both Codex and humans. Instead of writing detailed instructions into every prompt, I want `npm run lint` to deterministically show what needs to be fixed.

### Rules as Implementation Guidance

`eslint-plugin-raula` collects rules around Tailwind CSS, global CSS, and Next.js layouts. For example:

- `raula/exhaustive-tailwind-classes`: avoid arbitrary values in `className` and use canonical Tailwind utilities
- `raula/exhaustive-tailwind-theme-tokens`: declare CSS custom properties inside `@theme` blocks under supported namespaces
- `raula/no-await-in-layout`: disallow `await` in `app/**/layout.*`
- `raula/no-disallowed-global-class-selectors`: disallow new global class selectors unless they are allowlisted
- `raula/no-document-element-styles-in-css`: avoid styling `html` and `body` directly
- `raula/no-inline-style-prop`: avoid inline `style` props in JSX

One thing I cared about was keeping documentation next to each rule.

During build, the package generates `REFERENCE.md` from the rule documentation and includes it in the npm package. That means when you run `npm install -D eslint-plugin-raula`, the package in `node_modules` contains not only the executable plugin, but also references that an Agent can read. It looks like this:

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

Still, just installing the package does not guarantee that a Coding Agent will read the reference. So I added this command:

```bash
npx eslint-plugin-raula instruct
```

It inserts a block like this into `AGENTS.md`:

```md
<!-- eslint-plugin-raula-instruct-start -->
<!-- Managed by `eslint-plugin-raula instruct` -->
Before editing files that touch styling, JSX className usage, global CSS selectors, or Next.js layout files, read:
`./node_modules/eslint-plugin-raula/REFERENCE.md`
This block is supplemental and should complement, not override, local project instructions.
<!-- eslint-plugin-raula-instruct-end -->
```

This could also be done with `postinstall`, and that may be convenient in some cases. Personally, I do not really like packages that rewrite project files during install, so I made it an explicit step.

### What Changes With and Without the Plugin

To see whether the plugin actually changes Agent output, I ran a small experiment.

I prepared two sample applications. One had `eslint-plugin-raula` installed and referenced from `AGENTS.md`; the other did not. Then I gave Codex the same image and the same prompt.

For the reference image, I used an image generated by ChatGPT Images 2.0 with the prompt `the firstview of aesthetic portfolio website`.

![Reference image for an aesthetic portfolio website](/eslint-plugin-raula-coding-agent/reference.png)

This is the prompt I gave Codex. I asked it to build a first view similar to the reference image, while also providing theme tokens such as `background`, `foreground`, `primary`, `muted`, and `border`.

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

Without the plugin, the output contained many arbitrary values for colors and letter spacing.

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

This is faithful to the colors I gave in the prompt. But values like `#F7F4EF` and `#2B2926` are now embedded directly throughout the UI, which makes them harder to treat as a theme later.

With the plugin, similar parts of the component used theme tokens instead.

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

The `globals.css` file also collected the theme tokens inside `@theme`.

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

The interesting part is that the plugin does not directly guarantee whether the finished design is good. How closely it matches the image, whether the spacing feels right, and whether the information architecture works are still separate questions.

But it did make the output easier for a human to work with later. Colors moved toward theme tokens, arbitrary values decreased, and ownership of global CSS became easier to see. The Agent output started a little closer to the project’s shape.

### Put Agent Constraints Into the Existing Workflow

I do not think everyone needs `eslint-plugin-raula`.

How much you allow arbitrary values, what belongs in `globals.css`, and how much work `layout.tsx` should do all depend on the team and product. This is not a claim that everyone should adopt my exact preferences.

But I do think the approach itself is useful.

Coding Agents can implement quickly. They can also write deterministic verification code quickly. Because of that, it is easy to end up with a `package.json` full of scripts like `check1.ts`, `check2.ts`, and `check-styling.ts`.

Those scripts can absolutely help. But if we already have the well-worn technology of linting, placing Agent-facing constraints there feels easier to keep as part of the normal development workflow.

Gunpei Yokoi, an engineer at Nintendo, used the phrase “lateral thinking with withered technology.” New problems do not always need entirely new mechanisms. For the new problem of code generation in the Coding Agent era, we can reuse the familiar mechanism of ESLint custom rules in a slightly different direction. That feels surprisingly practical.

By generating documentation from rules, the rules can become the SSOT. `AGENTS.md` only needs to point to that reference. Agents can read it before implementation, humans can see the lint results, and CI can fail deterministically.

Turn instructions into executable constraints.

If you are writing frontend code with Coding Agents and feel like you keep fixing the same things, that discomfort might be something you can turn into an ESLint plugin.

I think it is worth trying to build an eslint-plugin for yourself or your team.
