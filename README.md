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

- Bun 1.3+

## Install

```bash
bun install
```

## Development

Start the development server:

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000).

## Common Commands

```bash
bun lint
bun build
bun format
```

## Vercel

For Vercel, keep the project linked to the repository root.

Recommended Project Settings:

- Framework Preset: `Next.js`
- Root Directory: leave empty
- Install Command: `bun install`
- Build Command: `bun run build`
- Output Directory: leave empty and use the Next.js default

Deploy from the repository root:

```bash
vercel
```
