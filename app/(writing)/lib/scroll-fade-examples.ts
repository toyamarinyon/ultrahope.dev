export const scrollFadeExamples = [
	{
		id: "plain",
		title: "fadeなし",
		code: `<div className="h-52 overflow-y-auto border border-highlight-med bg-surface p-4">
  {items.map((item) => (
    <p key={item}>{item}</p>
  ))}
</div>`,
	},
	{
		id: "react-mask",
		title: "fadeあり（普通の React）",
		code: `<div className="h-52 overflow-y-auto border border-highlight-med bg-surface p-4 mask-linear-[to_bottom,transparent_0,black_1.5rem,black_calc(100%-1.5rem),transparent_100%] mask-no-repeat">
  {items.map((item) => (
    <p key={item}>{item}</p>
  ))}
</div>`,
	},
	{
		id: "base-ui",
		title: "fadeあり（Base UI ScrollArea）",
		code: `<ScrollArea.Root className="relative h-52 overflow-hidden border border-highlight-med bg-surface">
  <ScrollArea.Viewport className="h-full outline-none mask-linear-[to_bottom,transparent_0,black_min(1.5rem,var(--scroll-area-overflow-y-start)),black_calc(100%-min(1.5rem,var(--scroll-area-overflow-y-end,1.5rem))),transparent_100%] mask-no-repeat">
    <ScrollArea.Content className="p-4">
      {items.map((item) => (
        <p key={item}>{item}</p>
      ))}
    </ScrollArea.Content>
  </ScrollArea.Viewport>
  <ScrollArea.Scrollbar className="flex w-2 justify-center py-2 opacity-0 transition-opacity data-hovering:opacity-100 data-scrolling:opacity-100">
    <ScrollArea.Thumb className="w-1 rounded-full bg-highlight-high" />
  </ScrollArea.Scrollbar>
</ScrollArea.Root>`,
	},
] as const;

export function renderScrollFadeExamplesMarkdown() {
	return scrollFadeExamples
		.map(
			(example) => `### ${example.title}

\`\`\`tsx
${example.code}
\`\`\``,
		)
		.join("\n\n");
}
