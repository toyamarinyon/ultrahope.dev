# Styling Standard

## Concept

Styling in this project should optimize for maintainability more than one-off polish.

We want implementations that are easy to read, easy to revise, and hard to get lost in later. UI changes over time, so the goal is not just to make something look good once, but to make future changes feel straightforward.

That is why our default split is to express page- and component-level styling in Tailwind, while keeping only global foundations in CSS.

## Purpose

The purpose of this standard is not to enforce a rigid aesthetic doctrine. It is to give us a shared baseline for making styling decisions.

The most important goals are:

- make the location of styling easy to understand
- keep page-specific presentation close to the JSX that renders it
- allow exceptions while making those exceptions legible

If everything ends up in `app/globals.css`, the first edit may feel fast, but later it becomes difficult to tell where a change should be made. If everything is forced into utilities, even global foundations become scattered.

This standard exists to hold the middle ground.

## Default Direction

Our default direction is:

- write page- and component-local styling in Tailwind
- express local concerns such as spacing, layout, border, and typography in JSX
- keep shared backgrounds, tokens, and base styles in CSS

In other words, Tailwind is for implementation at the point of use, and CSS is for shared foundations.

## What Belongs Where

### Tailwind

The following should generally be written in Tailwind:

- layout
- gap, padding, and margin
- border, radius, and background
- hover, focus, and active states
- breakpoint-specific changes
- page-specific and component-specific presentation

When reading a page, the shape of that page should be understandable from the JSX itself.

### CSS

The following may remain in `app/globals.css`:

- design tokens such as color, font, and shadow
- base styles for `html`, `body`, `a`, `img`, and similar elements
- global effects such as `::selection` and `body::before`
- shared typography foundations for areas such as Markdown articles

Using CSS here is not a fallback. It is the right tool for managing global assumptions in one place.

## Exceptions

This standard allows exceptions.

There are cases where forcing everything into Tailwind is less clear than using CSS. For example:

- article content with many element types and shared typography rules
- pseudo-elements or more complex global effects
- places where a named CSS grouping is easier to read than a long utility list

Exceptions are not a license for anything goes. They exist for cases where the default approach becomes unnatural.

When in doubt, start by considering Tailwind first. If that feels strained, CSS is a reasonable choice.

## Workflow

You do not need to be overly careful while writing code.

Our assumption is that more of these rules will be enforced through linting, so it is more important to keep momentum than to produce a perfectly compliant first draft by instinct.

The recommended workflow is:

1. Write the code normally.
2. Clean up the structure and presentation roughly.
3. Run `bun lint`.
4. If lint reports an issue, adjust the code to match the rule.

In other words, do not feel pressure to get every styling choice right on the first pass. Move forward first, then use `bun lint` to verify whether the implementation drifted from the standard.

The point of this workflow is to keep both speed and consistency. Writing should feel lightweight, and alignment should be easy to verify mechanically.

## Practical Reading

When you are unsure, walk through the decision in this order:

1. Is this styling local to a page or component?
2. If so, can it be expressed clearly in Tailwind?
3. Is this something we want to share as a global foundation?
4. If so, should it live in CSS instead?

This standard is not a strict answer key. It is the first baseline to return to.
