export const scrollFadeExamples = [
	{
		id: "plain",
		previewPath: "/plain-overflow",
		title: "No fade",
		code: `<div className="flex h-64 flex-col border border-highlight-med bg-surface">
  <SidebarHeader />
  <div className="min-h-0 flex-1 overflow-y-auto px-3 py-3">
    <SidebarLinks />
  </div>
  <SidebarFooter />
</div>`,
	},
	{
		id: "react-mask",
		previewPath: "/always-on-mask",
		title: "CSS mask",
		code: `<div className="flex h-64 flex-col border border-highlight-med bg-surface">
  <SidebarHeader />
  <div className="min-h-0 flex-1 overflow-y-auto px-3 py-3 mask-linear-[to_bottom,transparent_0,black_2.75rem,black_calc(100%-2.75rem),transparent_100%] mask-no-repeat">
    <SidebarLinks />
  </div>
  <SidebarFooter />
</div>`,
	},
	{
		id: "base-ui",
		previewPath: "/state-aware-scroll-area",
		title: "Base UI",
		code: `<div className="flex h-64 flex-col border border-highlight-med bg-surface">
  <SidebarHeader />
  <ScrollArea.Root className="relative min-h-0 flex-1 overflow-hidden">
    <ScrollArea.Viewport className="h-full outline-none mask-linear-[to_bottom,transparent_0,black_min(2.75rem,var(--scroll-area-overflow-y-start)),black_calc(100%-min(2.75rem,var(--scroll-area-overflow-y-end,2.75rem))),transparent_100%] mask-no-repeat">
      <ScrollArea.Content className="px-3 py-3">
        <SidebarLinks />
      </ScrollArea.Content>
    </ScrollArea.Viewport>
    <ScrollArea.Scrollbar className="flex w-2 justify-center py-2 opacity-0 transition-opacity data-hovering:opacity-100 data-scrolling:opacity-100">
      <ScrollArea.Thumb className="w-1 rounded-full bg-highlight-high" />
    </ScrollArea.Scrollbar>
  </ScrollArea.Root>
  <SidebarFooter />
</div>`,
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
