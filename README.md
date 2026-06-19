# ultrahope.dev

This repository contains the Next.js app for ultrahope.dev.

## Structure

```text
app/                       Next.js App Router routes
public/                    Static assets
writing/                   Markdown articles
lib/                       Shared app utilities
```

## Requirements

- pnpm 11.1.2+

## Install

```bash
pnpm install
```

## Development

Start the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Common Commands

```bash
pnpm lint
pnpm build
pnpm format
```

## Vercel

For Vercel, keep the project linked to the repository root.

Recommended Project Settings:

- Framework Preset: `Next.js`
- Root Directory: leave empty
- Install Command: `pnpm install`
- Build Command: `pnpm run build`
- Output Directory: leave empty and use the Next.js default

Deploy from the repository root:

```bash
vercel
```
