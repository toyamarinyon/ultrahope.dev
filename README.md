# ultrahope.dev

This repository is a minimal Bun workspace monorepo with Turborepo.

## Structure

```text
apps/
  web/                     Next.js app
packages/
  eslint-plugin-raula/     Local ESLint plugin, dogfooded by apps/web
```

## Requirements

- Bun 1.3+

## Install

```bash
bun install
```

## Development

Start the monorepo dev task:

```bash
bun dev
```

Run the web app directly:

```bash
bun --cwd apps/web dev
```

Open [http://localhost:3000](http://localhost:3000).

## Common Commands

```bash
bun lint
bun build
bun fmt
```

## ESLint Plugin

`packages/eslint-plugin-raula` is a standalone package named `eslint-plugin-raula`.

`apps/web` consumes it through the Bun workspace, so local ESLint rule changes are immediately dogfooded in the app.

## Vercel

For Vercel, keep the project linked to the repository root and set the Root Directory to `apps/web`.

Recommended Project Settings:

- Framework Preset: `Next.js`
- Root Directory: `apps/web`
- Install Command: `bun install`
- Build Command: `turbo build`
- Output Directory: leave empty and use the Next.js default

Why this shape:

- `apps/web` as Root Directory lets Vercel infer the correct package for the deployment.
- `turbo build` matches Vercel's Turborepo guidance and lets Vercel infer the right filter from the root directory.
- You do not need a custom `outputDirectory` for a standard Next.js deployment.

For local CLI deploys before the Root Directory is configured, you can also target the app explicitly:

```bash
vercel apps/web
```

After Root Directory is configured in Project Settings:

```bash
vercel
```
